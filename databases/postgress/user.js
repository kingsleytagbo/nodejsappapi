CREATE TABLE wp_user (
    ID bigint,
    user_login NVARCHAR(120),
    user_pass nvarchar(128),
    user_nicename nvarchar(100),
    user_email nvarchar(200),
    user_url nvarchar(200),
    user_registered nvarchar(64),
    user_activation_key nvarchar(120),
    user_status integer,
    display_name nvarchar(500),
    spam tinyint,
    deleted tinyint,
    site_id bigint

    code        char(5) CONSTRAINT firstkey PRIMARY KEY,
    title       varchar(40) NOT NULL,
    did         integer NOT NULL,
    date_prod   date,
    kind        varchar(10),
    len         interval hour to minute
);