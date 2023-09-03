FROM node as build
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.25.1-alpine

EXPOSE 80

COPY --from=build /app/dist /usr/share/nginx/html