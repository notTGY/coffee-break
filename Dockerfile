FROM nginx
RUN apt update && apt install nodejs npm certbot python3-certbot-nginx -y

EXPOSE 80 443

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY static /usr/share/nginx/html
COPY . .

RUN npm i dotenv pg
RUN npm rebuild

CMD service nginx start && \
# certbot -n --agree-tos --email "$EMAIL" --nginx -d xn--90ai7ab.tech && \
  npm run setup && \
  npm start
