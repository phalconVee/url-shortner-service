FROM node:14.16.0-alpine3.13

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
COPY package*.json ./
COPY .env ./
RUN npm install
COPY . . 

EXPOSE 3001 

CMD ["npm", "start"]