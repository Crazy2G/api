#!/bin/sh
pm2 start npm --no-automation --name "api.c2g.space" -- run "start-dev" --watch
