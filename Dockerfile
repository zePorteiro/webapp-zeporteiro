# Etapa 1: Construção da aplicação
FROM node:18 AS build

# Diretório de trabalho na imagem
WORKDIR /app

# Copia o package.json e o package-lock.json para a imagem
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código da aplicação para a imagem
COPY . .

# Compila a aplicação React para produção
RUN npm run build

# Etapa 2: Servir a aplicação com o Nginx
FROM nginx:alpine

# Copiar os arquivos da build para o Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar a configuração customizada do Nginx
COPY ./data/nginx/app.conf /etc/nginx/conf.d/default.conf

# Expor a porta 80
EXPOSE 80

# Comando para iniciar o NGINX
CMD ["nginx", "-g", "daemon off;"]