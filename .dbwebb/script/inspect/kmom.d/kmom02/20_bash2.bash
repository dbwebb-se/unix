#!/usr/bin/env bash
cd me/kmom02/bash2 || exit 1

./answer.bash || exit 1

tput setaf 6
read -p "Done viewing the lab?"
tput sgr0
