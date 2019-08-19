#!/bin/bash

function hello() {
	curl "localhost:1337"
	echo ""
}

function html() {
	curl "localhost:1337/index.html"
	echo ""
}

function status() {
	curl "localhost:1337/status"
	echo ""
}

function sum() {
#        curl "localhost:1337/sum?a=$1&b=$2&c=$3"
	for val in "$@"
    	do
        	S+="$val&"
    	done
	curl "localhost:1337/sum?${S::-1}"
        echo ""
}

function filter() {
	shift
	for val in "$@"
	do
		addOn="$addOn$val=$val&"
	done
	local req="localhost:1337/filter?$addOn"
	curl "${req::-1}"
	echo ""
}


while (($#))
do
	case "$1" in
		
		hello)
			hello
			shift
			exit 0
		;;

		html)
			html
			shift
			exit 0
		;;

		status)
			status
			shift
			exit 0
		;;

		sum)
                        sum $2 $3 $4
                        shift
                        exit 0
                ;;

		filter)
			#shift
                        filter "$@"
                        shift
                        exit 0
                ;;

		*)
		;;
	esac

done
