FROM node:22.14.0-alpine
LABEL authors="Duude92"
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
EXPOSE 4000

ENTRYPOINT ["npm", "start"]