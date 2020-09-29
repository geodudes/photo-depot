CREATE TABLE users
(
    "userid" serial PRIMARY KEY,
    "name" varchar NOT NULL CHECK ( name <> ''),
    "profilephoto" varchar NOT NULL
);

SELECT setval('users_userid_seq', 1, false);

CREATE TABLE photos
(
    "photoid" serial PRIMARY KEY,
    "url" varchar NOT NULL,
    "userid" bigint NOT NULL,
    "date" varchar NOT NULL,
    "rating" smallint,
    FOREIGN KEY ( userid ) REFERENCES users ( userid )
);

SELECT setval('photos_photoid_seq', 1, false);

CREATE TABLE tags
(
    "tagid" serial PRIMARY KEY,
    "tag" varchar NOT NULL CHECK ( tag <> ''),
    "photoid" bigint NOT NULL,
    FOREIGN KEY ( photoid ) REFERENCES photos ( photoid )
);

SELECT setval('tags_tagid_seq', 1, false);

INSERT INTO users
    (name, profilephoto)
VALUES('Marc', 'somephoto.jpg')

INSERT INTO photos
    (url, userid, date, rating)
VALUES('https://s.hdnux.com/photos/01/10/02/10/18883120/8/920x920.jpg', 1, 'today', 0)

INSERT INTO tags
    (tag, photoid)
VALUES('Monster Trucks', 1)
