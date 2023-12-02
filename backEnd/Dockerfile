FROM node:18.18-alpine

WORKDIR /app
COPY . . 
RUN npm i
RUN apk --update add openjdk11 g++ python3 gcc
RUN npm rebuild bcrypt 
EXPOSE 5000
CMD ["npm","run","dev"]