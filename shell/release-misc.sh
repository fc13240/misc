#!/bin/bash

NEWLINE='<br/>';
CURRENT_TIME=$(date +%Y%m%d_%H%M%S);

# must be absolute path
CURRENT_DIR=`dirname $0`
WORK_DIR=`cd $CURRENT_DIR;cd ..;pwd`

# change work directory first
echo "<b>1. cd $WORK_DIR;</b>";
echo '<pre>';
cd $WORK_DIR;
echo '</pre>';
echo $NEWLINE;

# remove modify
echo "<b>2. git stash;</b>";
echo '<pre>';
git add .
git stash
git stash drop
echo '</pre>';
echo $NEWLINE;

# pull source
echo "<b>3. git pull origin master;</b>";
echo '<pre>';
git pull origin master
echo '</pre>';
echo $NEWLINE;

# tag
echo "<b>4. git tag $CURRENT_TIME;</b>";
echo '<pre>';
git tag $CURRENT_TIME;
echo '</pre>';
echo $NEWLINE;

# replace @VERSION
echo "<b>5. replace @VERSION -> $CURRENT_TIME</b>";
echo '<pre>';
sed -i "s/@VERSION[^'\"]*/$CURRENT_TIME/" $WORK_DIR/source/j/version.js
echo '</pre>';
echo $NEWLINE;

# compress source/* -> min/*
echo "<b>6. compress</b>";
echo '<pre>';
/usr/bin/node /home/sam/nodejs/compresser/index.js $WORK_DIR/source $WORK_DIR/min --colors=false
echo '</pre>';
echo $NEWLINE;

echo "<b>7. release finished</b>";