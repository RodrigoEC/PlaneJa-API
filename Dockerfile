FROM node:16 as base

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . . 

RUN chown -R $user:$user /app

USER $user

CMD npm run dev

EXPOSE 8000