#!/bin/bash

CURRENT_DIR=`dirname $0`
BASE_DIR=`cd $CURRENT_DIR;cd ..;pwd`
su - sam << EOF
	cd $BASE_DIR;
	echo 'cd $BASE_DIR;git pull origin master';
	git pull origin master
EOF
echo 'release down'