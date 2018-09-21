FROM node:8.7.0-alpine

# Create app directory and use it as working directory
RUN mkdir -p /src/app/client /src/app/server 
WORKDIR /src/app/server

# Specifying env variables
ARG REACT_APP_SERVER_URL=https://chrisongg-server.appspot.com/api
ARG NODE_PATH=./src/
ARG NODE_ENV=production

ENV REACT_APP_SERVER_URL=${REACT_APP_SERVER_URL}
ENV NODE_PATH=${NODE_PATH}
ENV PATH=/usr/app/chrisongg-client/node_modules/.bin:$PATH

# Build react app
COPY /frontend/package.json /src/app/client
COPY /frontend/package-lock.json /src/app/client

RUN cd ../client && npm install --silent
COPY frontend /src/app/client
RUN cd ../client && npm run build

# Build server
COPY /backend/package.json /src/app/server
COPY /backend/package-lock.json /src/app/server

RUN npm install --silent
COPY backend /src/app/server

CMD ["npm", "start"]