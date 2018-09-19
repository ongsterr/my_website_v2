FROM node:8.7.0-alpine

# Create app directory and use it as working directory
RUN mkdir -p /srv/app/chrisongg-client
WORKDIR /srv/app/chrisongg-client

COPY package.json /srv/app/chrisongg-client
COPY package-lock.json /srv/app/chrisongg-client

RUN npm install

COPY . /srv/app/chrisongg-client

CMD ["npm", "start"]