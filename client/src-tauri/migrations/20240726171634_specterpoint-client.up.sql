-- Add up migration script here
CREATE TABLE IF NOT EXISTS user (
    username TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "data" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS listeners (
    id INTEGER PRIMARY KEY,
    "name" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    port INTEGER NOT NULL,
    "type" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS endpoints (
    id INTEGER PRIMARY KEY,
    listener_id INTEGER NOT NULL,
    endpoint TEXT NOT NULL,
    FOREIGN KEY (listener_id) REFERENCES listeners (id)
);
