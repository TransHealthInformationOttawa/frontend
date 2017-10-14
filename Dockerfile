FROM nginx

EXPOSE 80

COPY src/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]