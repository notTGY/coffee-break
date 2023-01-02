FROM nginx
EXPOSE 80 443

ARG EMAIL

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY static /usr/share/nginx/html
COPY . .

RUN apt update && apt install nodejs npm certbot python3-certbot-nginx -y
RUN npm i sqlite3
RUN npm rebuild
RUN npm run setup

# RUN certbot -n --agree-tos --email "$EMAIL" --nginx -d xn--90ai7ab.tech

CMD service nginx start && npm start
