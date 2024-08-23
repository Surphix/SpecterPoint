use crate::app::App;
use axum::{extract::State, response::IntoResponse, Json};
use common::error::Result;
use common::models::listener::ListenerState;

pub async fn get_listeners(State(state): State<App>) -> Result<impl IntoResponse> {
    let listeners = crate::db::listener::get_listener_ids(state.pool).await?;

    let mut states = vec![];

    for listener in listeners {
        states.push(ListenerState {
            id: listener.id,
            running: state.orch.is_running(&listener.id).await,
        })
    }

    Ok(Json(states))
}
