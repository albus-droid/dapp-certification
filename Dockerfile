FROM node:10.16.3

ENV NODE_ENV=production

RUN apt-get update || : && apt-get install python2.7 -y

RUN npm install -g node-gyp@3.6.2

RUN npm install -g truffle@5.1.39

COPY package*.json ./

RUN npm install --production

COPY . .

ENV PORT=7545

EXPOSE 7545

EXPOSE 3000

CMD ["npm","start"]