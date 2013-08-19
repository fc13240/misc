#!/bin/bash

NEWLINE='<br/>';
CURRENT_TIME=$(date +%Y%m%d_%H%M%S);

# must be absolute path
CURRENT_DIR=`dirname $0`
WORK_DIR=`cd $CURRENT_DIR;cd ..;pwd`

# change work directory first
cd $WORK_DIR;
echo "1. cd $WORK_DIR;$NEWLINE";

# remove modify
git add .
git stash
git stash drop
echo "2. git stash;$NEWLINE";

# pull source
git pull origin master
echo "3. git pull origin master;$NEWLINE";

# tag
git tag $CURRENT_TIME;
echo "4. git tag $CURRENT_TIME;$NEWLINE";

# compress source/* -> min/*
/usr/local/bin/node /home/sam/nodejs/compresser/index.js $WORK_DIR/source $WORK_DIR/min
echo "5. compress finished;$NEWLINE";

# rsync
# rsync -vaz '-e ssh -p 2222'  $WORK_DIR/min/ sam@61.4.185.220:/home/sam/www/htdocs/n/
echo "6. rsync finished;$NEWLINE";

echo "7. release finished";