
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    cover_pic TEXT,
    profile_pic TEXT,
    city TEXT,
    website TEXT
);


CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    description TEXT,
    img TEXT,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    likes INTEGER DEFAULT 0 NOT NULL
);


CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    user_id INTEGER REFERENCES users(id),
    post_id INTEGER REFERENCES posts(id)
);


CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    post_id INTEGER REFERENCES posts(id)
);


CREATE TABLE relationships (
    id SERIAL PRIMARY KEY,
    follower_user_id INTEGER NOT NULL REFERENCES users(id),
    followed_user_id INTEGER NOT NULL REFERENCES users(id)
);

CREATE TABLE stories (
    id SERIAL PRIMARY KEY,
    img VARCHAR(200) NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id)
);