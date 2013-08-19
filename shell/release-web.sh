#!/bin/bash

# must be absolute path
CURRENT_DIR=`dirname $0`
WORK_DIR=`cd $CURRENT_DIR;cd ..;pwd`

# rsync
echo "<b>rsync</b>";
echo '<pre>';
# rsync -vaz '-e ssh -p 2222'  $WORK_DIR/source/ sam@61.4.185.220:/home/sam/www/htdocs/n/
# echo '==============';
# rsync -vaz '-e ssh -p 2222'  $WORK_DIR/min/ sam@61.4.185.220:/home/sam/www/htdocs/n/
echo '</pre>';
echo '<br/>';