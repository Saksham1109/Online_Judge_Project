FROM node:18.18-alpine

WORKDIR /app
COPY . . 
RUN npm i
RUN npm rebuild bcrypt 
EXPOSE 5000
CMD ["node","index.js"]