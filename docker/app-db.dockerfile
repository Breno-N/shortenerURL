FROM postgres:latest
ENV PORT=5432
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB app_db
COPY ./docker/initDB/initPostgres.sql /docker-entrypoint-initdb.d/
EXPOSE $PORT