FROM node:16 as base

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . . 

# COPY ./node_modules /app/node_modules

RUN chown -R $user:$user /app

USER $user

CMD npm run dev

EXPOSE 8000