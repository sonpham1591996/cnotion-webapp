FROM node:14

WORKDIR /webapp2

COPY . /webapp2

COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /webapp2

RUN npm run build

EXPOSE 4173
# Running the app
ENTRYPOINT ["npm", "run", "start"]
