FROM nginx:latest
RUN sed -i 's|index.htm;|;\n try_files $uri $uri/ /index.html;|' /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html