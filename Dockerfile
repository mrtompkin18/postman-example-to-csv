FROM nginx
WORKDIR /usr/share/nginx/html/
COPY /build .
COPY nginx.conf /etc/nginx
EXPOSE 80

CMD [ "nginx", "-g", "daemon off;"]