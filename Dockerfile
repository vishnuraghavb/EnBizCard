FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run generate

FROM nginx:alpine
COPY --from=build /app/public /usr/share/nginx/html
EXPOSE 80