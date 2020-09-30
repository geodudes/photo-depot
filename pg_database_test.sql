DROP TABLE IF EXISTS phototags
CASCADE;
DROP TABLE IF EXISTS tags
CASCADE;
DROP TABLE IF EXISTS photos
CASCADE;
DROP TABLE IF EXISTS users
CASCADE;

CREATE TABLE users
(
  "userid" serial PRIMARY KEY,
  "name" varchar NOT NULL CHECK ( name <> '')
);

SELECT setval('users_userid_seq', 1, false);

CREATE TABLE photos
(
  "photoid" serial PRIMARY KEY,
  "url" varchar NOT NULL,
  "userid" bigint NOT NULL,
  "date" varchar NOT NULL,
  "rating" smallint,
  CONSTRAINT fk_user FOREIGN KEY ( userid ) REFERENCES users ( userid ) ON DELETE CASCADE
);

SELECT setval('photos_photoid_seq', 1, false);

CREATE TABLE tags
(
  "tagid" serial PRIMARY KEY,
  "tag" varchar NOT NULL CHECK ( tag <> ''),
  "userid" bigint NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY ( userid ) REFERENCES users ( userid ) ON DELETE CASCADE
);

SELECT setval('tags_tagid_seq', 1, false);

CREATE TABLE phototags
(
  "userid" bigint NOT NULL,
  "photoid" bigint NOT NULL,
  "tagid" bigint NOT NULL,
  CONSTRAINT fk_photo FOREIGN KEY ( photoid ) REFERENCES photos ( photoid ) ON DELETE CASCADE,
  CONSTRAINT fk_user FOREIGN KEY ( userid ) REFERENCES users ( userid ) ON DELETE CASCADE,
  CONSTRAINT fk_tag FOREIGN KEY ( tagid ) REFERENCES tags ( tagid ) ON DELETE CASCADE
);

INSERT INTO users
  (name)
VALUES('Marc');

INSERT INTO photos
  (url, userid, date, rating)
VALUES('https://s.hdnux.com/photos/01/10/02/10/18883120/8/920x920.jpg', 1, 'today', 0);

INSERT INTO tags
  (tag, userid)
VALUES('Monster Trucks', 1);

INSERT INTO phototags
  (userid, photoid, tagid)
VALUES(1, 1, 1);
