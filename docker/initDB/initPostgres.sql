CREATE TABLE public.encurtador (
    id SERIAL PRIMARY KEY,
    url varchar(500),
    newUrl varchar(50),
    createdAt TIMESTAMP
);