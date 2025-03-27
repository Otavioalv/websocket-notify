FROM node:20.11.0-alpine AS build

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

# PRODUÇÃO
FROM nginx:stable-perl AS production

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3000

CMD ["ngix", "-g", "daemon off;"]


# comando
# docker run -p host:container --name nome_container -d nome_imagem 
