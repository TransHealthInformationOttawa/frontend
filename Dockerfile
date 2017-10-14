FROM nginx

EXPOSE 80

COPY src/ /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]