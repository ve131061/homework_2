## homework_1 
Course: Highload Architect
Ершов Виктор Анатольевич
21.05.2025

## Prerequisites

1. OS: Windows 10
2. install node.js: https://nodejs.org/en
3. install postgresql: https://www.postgresql.org/
4.  CREATE DATABASE mydatabase;
    CREATE USER myuser WITH ENCRYPTED PASSWORD 'qwerty';
    GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser;

    CREATE TABLE IF NOT EXISTS public.users
(
    first_name character varying COLLATE pg_catalog."default" NOT NULL,
    second_name character varying COLLATE pg_catalog."default" NOT NULL,
    sex character varying COLLATE pg_catalog."default",
    city character varying COLLATE pg_catalog."default",
    interests character varying COLLATE pg_catalog."default",
    password character varying COLLATE pg_catalog."default" NOT NULL,
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    age character varying COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to myuser;

5. Clone homework_1 repoditory from: https://github.com/ve131061/homework_1.git branch master

6.  cd cd <homework_1 dir>
    npm init -y
    npm install express pg dotenv
    npm install express-validator
    npm install cryptr
    npm install jsonwebtoken

## Run

    node ./src/server.js

## Postman Collection

use file homework_1.postman_collection.json

