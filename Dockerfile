FROM nginx:alpine

# Borrar cualquier archivo por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar tu index.html directamente
COPY ./index.html /usr/share/nginx/html/
