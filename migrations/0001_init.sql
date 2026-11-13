CREATE TABLE posts (
  id INTEGER PRIMARY KEY,
  cat INTEGER NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  tags TEXT NOT NULL,
  closed INTEGER NOT NULL DEFAULT 0,
  created INTEGER NOT NULL,
  bumped INTEGER NOT NULL,
  views INTEGER NOT NULL DEFAULT 0,
  replies INTEGER NOT NULL DEFAULT 0,
  author TEXT,
  avatar TEXT,
  plain TEXT,
  blocks TEXT,
  gone INTEGER NOT NULL DEFAULT 0,
  tab TEXT,
  hidden TEXT,
  roles TEXT,
  pay TEXT
);

CREATE INDEX posts_created ON posts (created);
CREATE INDEX posts_pending ON posts (created) WHERE plain IS NULL AND gone = 0;

CREATE TABLE meta (
  k TEXT PRIMARY KEY,
  v TEXT NOT NULL
);
