FROM node:18.18-alpine

WORKDIR /app
COPY . . 
RUN npm i
RUN npm rebuild bcrypt 
RUN apk --update add openjdk11 g++ python3 gcc
EXPOSE 5000
CMD ["npm","run","dev"]