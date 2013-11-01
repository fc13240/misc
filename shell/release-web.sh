#!/bin/bash

# must be absolute path
CURRENT_DIR=`dirname $0`
WORK_DIR=`cd $CURRENT_DIR;cd ..;pwd`

# rsync
echo "<b>rsync min to 61.4.185.223</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/min/ sam@61.4.185.223:/home/sam/www/misc/min/
echo '==============';
echo '</pre>';
echo "<b>rsync min to 61.4.185.212</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/min/ sam@61.4.185.212:/home/sam/www/misc/min/
echo '==============';
echo '</pre>';

echo "<b>rsync source to 61.4.185.223</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/source/ sam@61.4.185.223:/home/sam/www/misc/source/
echo '==============';
echo '</pre>';
echo "<b>rsync source to 61.4.185.212</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/source/ sam@61.4.185.212:/home/sam/www/misc/source/
echo '==============';
echo '</pre>';
echo '<br/>';