use axum::{
    routing::{delete, get, post},
    Router,
};

use crate::app::App;

pub mod delete;
pub mod get;
pub mod post;

pub fn routes() -> Router<App> {
    Router::new()
        .route("/", get(get::get_listeners).post(post::add_listener))
        .route("/:id/start", post(post::start_listener))
        .route("/:id/stop", post(post::stop_listener))
        .route("/:id", delete(delete::delete_listener))
}
