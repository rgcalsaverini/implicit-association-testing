#!/usr/bin/env sh

until ping -c1 mongo &>/dev/null; do :; done
sleep 2
uwsgi --ini ${APP_DIR}/uwsgi.ini --lazy-apps