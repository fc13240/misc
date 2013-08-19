#!/bin/bash

NEWLINE='<br/>';
CURRENT_TIME=$(date +%Y%m%d_%H%M%S);

# must be absolute path
CURRENT_DIR=`dirname $0`
WORK_DIR=`cd $CURRENT_DIR;cd ..;pwd`

# change work directory first
cd $WORK_DIR;
echo "<b>1. cd $WORK_DIR;</b>";
echo $NEWLINE;

# remove modify
git add .
git stash
git stash drop
echo "<b>2. git stash;</b>";
echo $NEWLINE;

# pull source
git pull origin master
echo "<b>3. git pull origin master;</b>";
echo $NEWLINE;

# tag
git tag $CURRENT_TIME;
echo "<b>4. git tag $CURRENT_TIME;</b>";
echo $NEWLINE;

# compress source/* -> min/*
/usr/local/bin/node /home/sam/nodejs/compresser/index.js $WORK_DIR/source $WORK_DIR/min
echo "<b>5. compress finished;</b>";
echo $NEWLINE;

# rsync
# rsync -vaz '-e ssh -p 2222'  $WORK_DIR/min/ sam@61.4.185.220:/home/sam/www/htdocs/n/
echo "<b>6. rsync finished;</b>";
echo $NEWLINE;

echo "<b>7. release finished</b>";