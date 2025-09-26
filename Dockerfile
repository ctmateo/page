FROM nginx:alpine

# Limpio la carpeta por defecto
RUN rm -rf /usr/share/nginx/html/*

# Copio el index.html al directorio raíz de Nginx
COPY ./index.html /usr/share/nginx/html/index.html
