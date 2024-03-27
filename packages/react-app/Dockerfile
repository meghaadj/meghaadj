# This is the react-app Dockerfile for production build.
# Docker image must be built from packages directory as we are copying form-components.
# Run docker build command in packages directory and use -f flag to specify this file.
# e.g docker build -f react-app/Dockerfile -t react-app:1.0.0 .

# Build environment
FROM node:20-alpine as build

WORKDIR /app

COPY ./react-app/package*.json /app
RUN npm install

COPY ./react-app /app
COPY ./form-components /app/src/form-components

RUN npm run build

# Production environment
FROM node:20-alpine

COPY --from=build /app/build /app
COPY ./react-app/bs-config.json /app/bs-config.json

RUN npm install -g lite-server

EXPOSE 3000

CMD ["lite-server", "--config=bs-config.json"]
