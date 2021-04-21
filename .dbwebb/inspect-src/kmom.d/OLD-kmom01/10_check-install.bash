#!/usr/bin/env bash
cd me/kmom01/install || exit 1

echo ""
tput setaf 6
echo "----- Check for ssh-png and log.txt -----"
tput sgr0
ls

echo ""
tput setaf 6
echo "----- Dumping log.txt -----"
tput sgr0
more log.txt
echo ""
