#!/usr/bin/env sh
if [ "$ENVIRONMENT" = "development" ] ; then
  npm run dev
else
  cd /opt/treadmilltracker_frontend_public/ && cp -r ../treadmilltracker.zz50.co.uk/dist .
  sleep infinity
fi