CREATE SCHEMA IF NOT EXISTS todo_exercise;

CREATE TABLE IF NOT EXISTS todo_exercise.users
(
    id serial NOT NULL PRIMARY KEY,
    name text NOT NULL
);


CREATE TABLE IF NOT EXISTS todo_exercise.tasks
(
    id serial NOT NULL PRIMARY KEY,
    description text NOT NULL,
    completed boolean NOT NULL DEFAULT false,
    user_id integer NOT NULL REFERENCES todo_exercise.users (id)
);