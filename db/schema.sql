DROP TABLE IF EXISTS breaks;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  gh_token TEXT NOT NULL,
  last_seen TIMESTAMP DEFAULT NOW()
);

CREATE TABLE breaks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id),
  start_time TIMESTAMP DEFAULT NOW(),
  end_time TIMESTAMP,
  is_finished BOOLEAN,
  location TEXT,
  purpose TEXT
);
