FROM nginx
RUN apt update && apt install nodejs npm -y

EXPOSE 80

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . .

RUN npm i dotenv pg axios
RUN npm rebuild

COPY static /usr/share/nginx/html

CMD service nginx start && \
  npm run setup && \
  npm start
