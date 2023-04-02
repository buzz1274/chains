#!/usr/bin/env bash
set -e

if [ "$EUID" -ne 0 ]
  then echo "Please run using sudo ./deploy.sh"
  exit 1
fi

cd ../../ && git pull
cd ../mounts/chain.zz50.co.uk && git pull

sudo docker exec -i chain.zz50.co.uk bash -c "cd /var/www/chain.zz50.co.uk && composer install"
sudo docker exec -i chain.zz50.co.uk bash -c "cd /var/www/chain.zz50.co.uk && php artisan migrate --force"
sudo docker exec -i chain.zz50.co.uk bash -c "cd /var/www/chain.zz50.co.uk && npm install"
sudo docker exec -i chain.zz50.co.uk bash -c "cd /var/www/chain.zz50.co.uk && npm run live"
sudo docker exec -i chain.zz50.co.uk bash -c "chown -R apache /var/www/chain.zz50.co.uk"
