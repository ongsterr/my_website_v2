FROM node:8.7.0-alpine

# Create app directory and use it as working directory
RUN mkdir -p /srv/app/chrisongg-server
WORKDIR /srv/app/chrisongg-server

COPY package.json /srv/app/chrisongg-server
COPY package-lock.json /srv/app/chrisongg-server

RUN npm install

ADD . /srv/app/chrisongg-server

CMD ["npm", "start"]