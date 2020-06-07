APP_NAME='ball'
sudo service nginx stop
sudo certbot certonly --standalone -d $APP_NAME.xom9ik.com --staple-ocsp -m xom9ik.code@gmail.com --agree-tos
echo "server {
        server_name ball.xom9ik.com;
        client_max_body_size 10M;

        #add_header Last-Modified \$date_gmt;
        #add_header Cache-Control 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0';
        #if_modified_since off;
        #expires off;
        #etag off;
        gzip_static on;
        gunzip on;

        location / {
            proxy_pass http://172.50.10.1:8080;
            proxy_http_version 1.1;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host \$host;
            proxy_cache_bypass \$http_upgrade;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Real-IP \$remote_addr;
        }

        listen 443 ssl http2; # managed by Certbot
        ssl_certificate /etc/letsencrypt/live/$APP_NAME.xom9ik.com/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/$APP_NAME.xom9ik.com/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
  server_name $APP_NAME.xom9ik.com;
  listen 80;
  listen [::]:80;
  return 301 https://\$host\$request_uri;
}" >> /etc/nginx/sites-enabled/$APP_NAME.conf
sudo service nginx start
sh ./rebuild.sh
