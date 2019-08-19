#!/bin/bash

if [ "$1" -gt "5" ]; then
	echo "Higher!"
elif [ "$1" -eq "5" ];then
	echo "Same!"
else
	echo "Lower!"
fi
