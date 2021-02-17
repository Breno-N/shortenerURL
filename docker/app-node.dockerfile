FROM node:latest
ENV PORT=8081
COPY . /var/www
WORKDIR /var/www
RUN npm install
ENTRYPOINT ["npm", "start"]
EXPOSE $PORT