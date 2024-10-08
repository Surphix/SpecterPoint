use super::Listen;
use crate::handlers::http;
use crate::managers::tasks::TaskManager;
use axum::extract::{Request, State};
use axum::http::{Method, StatusCode};
use axum::middleware::{self, Next};
use axum::response::Response;
use axum::{async_trait, Router};
use axum_server::Handle;
use base64::prelude::*;
use common::crypt::aes;
use common::models::endpoint::Endpoint;
use common::models::metadata::Metadata;
use rsa::{Pkcs1v15Encrypt, RsaPrivateKey};
use std::net::SocketAddr;

pub struct HttpListener {
    addr: SocketAddr,
    endpoints: Vec<Endpoint>,
    headers: Vec<Metadata>,
    key: RsaPrivateKey,
    task_manager: TaskManager,
    handle: Handle,
}

impl HttpListener {
    pub async fn new(
        server: String,
        endpoints: Vec<Endpoint>,
        headers: Vec<Metadata>,
        key: RsaPrivateKey,
        task_manager: TaskManager,
    ) -> Self {
        let addr: SocketAddr = server.parse().unwrap();
        Self {
            addr,
            endpoints,
            headers,
            key,
            task_manager,
            handle: Handle::new(),
        }
    }
}

#[async_trait]
impl Listen for HttpListener {
    async fn start(&mut self) {
        let mut app = Router::new();
        let addr = self.addr;
        let handle = self.handle.clone();

        for e in self.endpoints.iter() {
            app = app.merge(http::routes(&e.endpoint).with_state(self.task_manager.clone()));
        }

        app = app.route_layer(middleware::from_fn_with_state(
            (self.key.clone(), self.headers.clone()),
            header_validate_and_extract,
        ));

        tokio::spawn(async move {
            axum_server::bind(addr)
                .handle(handle)
                .serve(app.into_make_service())
                .await
                .unwrap();
        });
    }

    async fn stop(&mut self) {
        self.handle.shutdown();
    }
}

async fn header_validate_and_extract(
    State((key, headers)): State<(RsaPrivateKey, Vec<Metadata>)>,
    mut req: Request,
    next: Next,
) -> Result<Response, StatusCode> {
    for header in headers {
        if let Some(value) = req.headers().get(header.base.name) {
            if !value
                .to_str()
                .unwrap_or("")
                .eq_ignore_ascii_case(&header.base.data)
            {
                return Err(StatusCode::NOT_FOUND);
            }
        } else {
            return Err(StatusCode::NOT_FOUND);
        }
    }

    let encoded_data = req
        .headers()
        .get(axum::http::header::AUTHORIZATION)
        .and_then(|header| header.to_str().ok())
        .and_then(|s| s.strip_prefix("Bearer "))
        .unwrap_or("");

    if encoded_data.is_empty() {
        return Err(StatusCode::NOT_FOUND);
    }

    let encrypted_data = BASE64_STANDARD
        .decode(encoded_data)
        .map_err(|_| StatusCode::NOT_FOUND)?;

    let raw = key
        .decrypt(Pkcs1v15Encrypt, &encrypted_data)
        .map_err(|_| StatusCode::NOT_FOUND)?
        .to_vec();

    match *req.method() {
        Method::GET => {
            let id =
                aes::decrypt_bytes(&raw[..32], &raw[32..]).map_err(|_| StatusCode::NOT_FOUND)?;
            req.extensions_mut().insert(id);
        }
        Method::POST => {
            req.extensions_mut().insert(raw[..32].to_vec());
        }
        _ => return Err(StatusCode::NOT_FOUND),
    }

    Ok(next.run(req).await)
}
