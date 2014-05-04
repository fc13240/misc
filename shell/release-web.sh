#!/bin/bash

# must be absolute path
CURRENT_DIR=`dirname $0`
WORK_DIR=`cd $CURRENT_DIR;cd ..;pwd`

# rsync
echo "<b>==============1. Rsync MIN to 4 online server==============</b><br/>";

echo "<b>(1) Server 1 61.4.185.223</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/min/ sam@61.4.185.223:/home/sam/www/misc/min/
echo '=======================================================';
echo '</pre>';

echo "<b>(2) Server 2 61.4.184.131</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/min/ wcc@61.4.184.131:/home/wcc/www/misc/min/
echo '=======================================================';
echo '</pre>';

echo "<b>(3) Server 2 61.4.184.136</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/min/ wcc@61.4.184.136:/home/wcc/www/misc/min/
echo '=======================================================';
echo '</pre>';

echo "<b>(4) Server 2 61.4.184.137</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/min/ wcc@61.4.184.137:/home/wcc/www/misc/min/
echo '</pre>';

echo "<b>==============2. Rsync SOURCE to 4 online server=============</b><br/>";
echo "<b>(1) Server 1 61.4.185.223</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/source/ sam@61.4.185.223:/home/sam/www/misc/source/
echo '========================================================';
echo '</pre>';
echo "<b>(2) Server2 61.4.184.131</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/source/ wcc@61.4.184.131:/home/wcc/www/misc/source/
echo '========================================================';
echo '</pre>';

echo "<b>(3) Server2 61.4.184.136</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/source/ wcc@61.4.184.136:/home/wcc/www/misc/source/
echo '========================================================';
echo '</pre>';

echo "<b>(4) Server2 61.4.184.137</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/source/ wcc@61.4.184.137:/home/wcc/www/misc/source/
echo '</pre>';

echo "<b>==============3. Rsync to backup server=============</b><br/>";
echo "<b>(1) Rsync min to 61.4.185.212</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/min/ sam@61.4.185.212:/home/sam/www/misc/min/
echo '========================================================';
echo '</pre>';
echo "<b>(2) Rsync source to 61.4.185.212</b>";
echo '<pre>';
rsync -vaz '-e ssh -p 2222'  $WORK_DIR/source/ sam@61.4.185.212:/home/sam/www/misc/source/
echo '</pre>';
echo '<br/>';