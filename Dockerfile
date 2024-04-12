FROM node:slim
COPY . /server
COPY package*.json ./server
WORKDIR /server
RUN npm install
CMD [ "node", "server.js" ]
EXPOSE 5002
VOLUME [ "/uploads" ]