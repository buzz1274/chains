#!/usr/bin/env sh
if [ "$ENVIRONMENT" = "development" ] ; then
  npm run dev
else
  cd /opt/chains_frontend_public/ && cp -r ../chains.zz50.co.uk/dist .
  sleep infinity
fi
