FROM node:20.11.0-alpine

WORKDIR /app

COPY ./package*.json ./

# RUN apt-get update && apt-get install -y nano && rm -rf /var/lib/apt/lists/*
RUN apk update && apk upgrade && apk add nano && apk add --no-interactive nano

# RUN npm install
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 8090

CMD ["npm", "start"]

# comando
# docker run -p host:container -d nome_imagem --name nome_container