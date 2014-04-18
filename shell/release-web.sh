#!/bin/bash

# must be absolute path
CURRENT_DIR=`dirname $0`
WORK_DIR=`cd $CURRENT_DIR;cd ..;pwd`

# rsync
echo "<b>==============1. Rsync MIN to online server==============</b><br/>";

echo "<b>(1) Server 1 61.4.185.223</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/min/ sam@61.4.185.223:/home/sam/www/misc/min/
echo '===============================================================';
echo '</pre>';

echo "<b>(2) Server 2 61.4.184.131</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/min/ wcc@61.4.184.131:/home/wcc/www/misc/min/
echo '================================================================';
echo '</pre>';
echo '<br/>';
echo "<b>==============2. Rsync SOURCE to online server=============</b><br/>";
echo "<b>(1) Server 1 61.4.185.223</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/source/ sam@61.4.185.223:/home/sam/www/misc/source/
echo '===============================================================';
echo '</pre>';

echo "<b>(2) Server2 61.4.184.131</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/source/ wcc@61.4.184.131:/home/wcc/www/misc/source/
echo '===============================================================';
echo '</pre>';

echo '<br/>';
echo "<b>==============3. Rsync to backup server=============</b><br/>";

echo "<b>(1) Rsync min to 61.4.185.212</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/min/ sam@61.4.185.212:/home/sam/www/misc/min/
echo '===============================================================';
echo '</pre>';

echo "<b>(2) Rsync source to 61.4.185.212</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/source/ sam@61.4.185.212:/home/sam/www/misc/source/
echo '===============================================================';
echo '</pre>';
echo '<br/>';