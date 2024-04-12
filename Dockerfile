FROM node:slim
COPY . /server
COPY package*.json ./server
RUN npm install
WORKDIR /server
CMD [ "node", "server.js" ]
EXPOSE 5002
VOLUME [ "/uploads" ]