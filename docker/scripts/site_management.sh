#!/usr/bin/env bash

#CRON ENTRY
#@daily /var/docker/docker/containers/websites/chain.zz50.co.uk/scripts/site_management.sh

PATH=/sbin:/bin:/usr/sbin:/usr/bin
SHELL=/bin/bash

/usr/bin/docker exec -i chain.zz50.co.uk \
bash -c "cd /var/www/chain.zz50.co.uk && php artisan chains:outstanding"
