# Usar la imagen oficial de Nginx
FROM nginx:alpine

# Copiar tu archivo HTML al directorio por defecto de Nginx
COPY ./html /usr/share/nginx/html
