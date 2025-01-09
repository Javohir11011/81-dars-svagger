FROM node:18-alpine

WORKDIR /auth-app

RUN npm install -g pnpm

COPY package*.json ./
COPY pnpm-lock*.yaml ./

RUN pnpm install

COPY . .

EXPOSE 3000

CMD [ "pnpm", "dev" ]
