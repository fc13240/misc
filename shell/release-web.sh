#!/bin/bash

# must be absolute path
CURRENT_DIR=`dirname $0`
WORK_DIR=`cd $CURRENT_DIR;cd ..;pwd`

# rsync
echo "<b>1. rsync min to online server1 61.4.185.223</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/min/ sam@61.4.185.223:/home/sam/www/misc/min/
echo '==============';
echo '</pre>';

echo "<b>2. rsync min to online server2 61.4.184.131</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/min/ wcc@61.4.184.131:/home/wcc/www/misc/min/
echo '==============';
echo '</pre>';

echo "<b>3. rsync min to backup server1 61.4.185.212</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/min/ sam@61.4.185.212:/home/sam/www/misc/min/
echo '==============';
echo '</pre>';

echo "<b>4. rsync source to online server1 61.4.185.223</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/source/ sam@61.4.185.223:/home/sam/www/misc/source/
echo '==============';
echo '</pre>';

echo "<b>5. rsync source to online server2 61.4.184.131</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/source/ wcc@61.4.184.131:/home/wcc/www/misc/source/
echo '==============';
echo '</pre>';

echo "<b>6. rsync source to backup server1 61.4.185.212</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/source/ sam@61.4.185.212:/home/sam/www/misc/source/
echo '==============';
echo '</pre>';
echo '<br/>';