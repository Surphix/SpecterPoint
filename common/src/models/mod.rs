pub mod endpoint;
pub mod listener;
pub mod server;
pub mod user;

#[derive(sqlx::FromRow)]
pub struct Id {
    pub id: i64,
}
