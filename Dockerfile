FROM node:lts-alpine3.13 AS build
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run generate

FROM nginx:alpine
COPY --from=build /app/public /usr/share/nginx/html
EXPOSE 80
