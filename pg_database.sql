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
