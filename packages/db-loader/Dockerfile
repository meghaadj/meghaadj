FROM mongo:latest

# Copies all .sh files and .js files up to 3 levels deep in db-loader to /docker-entrypoint-initdb.d/ in the container.
# All .sh and .js files will be run when database is first initialized.
# Any changes to db-loader will require the iws-platform-db image to be rebuilt to see changes.

COPY *.sh /docker-entrypoint-initdb.d/
COPY *.js /docker-entrypoint-initdb.d/
COPY */*.js /docker-entrypoint-initdb.d/
COPY */*/*.js /docker-entrypoint-initdb.d/

# grants permission so 0_replaceUrls.sh can execute all its actions
RUN chmod -R 777 /docker-entrypoint-initdb.d/
