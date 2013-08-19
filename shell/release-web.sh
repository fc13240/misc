#!/bin/bash

NEWLINE='<br/>';
CURRENT_TIME=$(date '+%Y-%m-%d %H:%M:%S');

# must be absolute path
CURRENT_DIR=`dirname $0`
WORK_DIR=`cd $CURRENT_DIR;cd ..;pwd`

# change work directory first
cd $WORK_DIR;
echo "cd $WORK_DIR;$NEWLINE";

# remove modify
git add .
git stash
git stash drop

# pull source
git pull origin master
echo "git pull origin master;$NEWLINE";

# tag
git tag $CURRENT_TIME;
echo 'release finished,taged as:$CURRENT_TIME;';