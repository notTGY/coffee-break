DROP TABLE IF EXISTS coffee_breaks;
DROP TABLE IF EXISTS users;

CREATE TABLE coffee_breaks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_time TIMESTAMP,
  location TEXT,
  purpose TEXT
);

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token TEXT NOT NULL,
  last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
