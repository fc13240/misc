#!/bin/bash

CURRENT_DIR=`dirname $0`
LOG_PATH=`cd $CURRENT_DIR;cd ..;pwd`
su - sam << EOF
	git pull origin master
EOF
echo 'release down'