#!/bin/bash

if [ "$1" = "d" ];then
	date
elif [ "$1" = "n" ];then
	echo {1..20}
elif [ "$1" = "a" ];then
	echo "$2"
fi
