## homework_2
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

CREATE TABLE IF NOT EXISTS public.people
(
    second_name character varying COLLATE pg_catalog."default",
    first_name character varying COLLATE pg_catalog."default",
    age character varying COLLATE pg_catalog."default",
    city character varying COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

5. Clone homework_2 repoditory from: https://github.com/ve131061/homework_2.git branch master

6.  cd cd <homework_2 dir>
    npm init -y
    npm install express pg dotenv
    npm install express-validator
    npm install cryptr
    npm install jsonwebtoken
    npm i body-parser
    install K6 https://k6.io/docs/getting-started/installation
    npm install -D @apideck/postman-to-k6

## import 999931 records to people table from https://github.com/OtusTeam/highload/blob/master/homework/people.v2.csv

7. Run server

    node ./src/server.js

8. Run K6 test tool (no index)

k6 run -i 1 --vus 1 k6-script.js —summary-export=summary.json

i - iterations 1,10,100,100
vus - virtual users 1,10,100,100 (i=vus)


9. Review test Summaries

see Test Summaries in ./k6_run_summaries

10. Create Index

ALTER TABLE IF EXISTS public.people
    OWNER to myuser;
-- Index: idx_last_first

-- DROP INDEX IF EXISTS public.idx_last_first;

CREATE INDEX IF NOT EXISTS idx_last_first
    ON public.people USING btree
    (second_name COLLATE pg_catalog."default" ASC NULLS LAST, first_name COLLATE pg_catalog."default" ASC NULLS LAST)
    WITH (deduplicate_items=True)
    TABLESPACE pg_default;

11. Re-run 8-9
