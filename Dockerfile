FROM node:14

WORKDIR /marketplace

COPY . /marketplace

COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /marketplace

RUN npm run build

EXPOSE 3003
# Running the app
ENTRYPOINT ["npm", "run", "start"]
