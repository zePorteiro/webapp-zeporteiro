# Usar a imagem oficial do NGINX como base
FROM nginx:alpine

# Copiar os arquivos da build para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar a configuração customizada do Nginx
COPY ./data/nginx/app.conf /etc/nginx/conf.d/default.conf

# Expor a porta 80
EXPOSE 80

# Comando para iniciar o NGINX
CMD ["nginx", "-g", "daemon off;"]
