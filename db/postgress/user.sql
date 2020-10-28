CREATE TABLE  IF NOT EXISTS wp_user (
    ID serial PRIMARY KEY,
    user_login VARCHAR(128) NOT NULL,
    user_pass VARCHAR(128) NOT NULL,
    user_nicename VARCHAR(128) NOT NULL,
    user_email VARCHAR(128) NOT NULL,
    display_name VARCHAR(256) NOT NULL,
    user_status INTEGER NOT NULL,
    user_registered VARCHAR(64) ,
    user_url VARCHAR(256) ,
    user_activation_key VARCHAR(128) ,
    spam SMALLINT,
    deleted SMALLINT,
    site_id INTEGER NOT NULL
);