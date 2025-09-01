FROM node:20.11.0-alpine

WORKDIR /app

COPY ./package*.json ./

# RUN npm install
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 8090

CMD ["npm", "start"]

# comando
# docker run -p host:container -d nome_imagem --name nome_container