use serde::{Deserialize, Serialize};

#[derive(sqlx::FromRow, Serialize, Deserialize, Clone, Debug)]
pub struct Agent {
    pub id: String,
    pub last_seen: String,
}

impl Agent {
    pub fn new(id: String) -> Self {
        Self {
            id,
            last_seen: chrono::Utc::now().to_rfc3339(),
        }
    }
}
