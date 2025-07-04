FROM postgres:17-alpine
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=passwd
ENV POSTGRES_DB=somedb
RUN mkdir -p /var/log/postgresql \
  && chown -R postgres:postgres /var/log/postgresql
EXPOSE 5432
