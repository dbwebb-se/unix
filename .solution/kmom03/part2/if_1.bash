#!/bin/bash

if [ "$1" -gt "5" ]; then
	echo "$1 is greater than 5"
elif [ "$1" -lt "5" ]; then
	echo "$1 is NOT greater than 5"
fi
