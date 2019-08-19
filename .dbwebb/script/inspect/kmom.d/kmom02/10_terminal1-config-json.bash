#!/usr/bin/env bash

# Move to directory
cd me/kmom02/terminal1 || exit
ls -l

# Check config.json
cat config.json
echo

# Modify settings in config.json
cp config.json config_.json
config=$( node -e 'let json = require("./config.json");json.host = "mysql";json.user = "user";json.password = "pass";console.log(JSON.stringify(json, null, 4));')
printf "%s\n" "$config" > config.json

cat config.json
echo
