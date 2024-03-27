FROM node:20-alpine

CMD []
ENTRYPOINT ["node", "index.js"]
WORKDIR /app

COPY ./forms/package* /app
RUN npm install
COPY ./forms /app
