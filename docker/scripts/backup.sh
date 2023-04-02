#!/usr/bin/env bash

#CRON ENTRY
#backup chain
#@daily /usr/local/docker/docker/containers/websites/chain.zz50.co.uk/backup.sh

PATH=/sbin:/bin:/usr/sbin:/usr/bin
SHELL=/bin/bash
BACKUP_FOLDER=/var/docker/backups/chain.zz50.co.uk/
BACKUPS_TO_KEEP=7

/usr/bin/docker exec -i chain.zz50.co.uk php /var/www/chain.zz50.co.uk/artisan db:dump > /dev/null

FILE_COUNT=`ls $BACKUP_FOLDER/*.sql | wc -l`

if [ $FILE_COUNT -ge $BACKUPS_TO_KEEP ]; then
    find $BACKUP_FOLDER/*.sql -mtime +$BACKUPS_TO_KEEP -type f -delete
fi

chown -R dave:dave $BACKUP_FOLDER
