#!/bin/env bash

#
# Set environment and use defaults if defined
#
LINUX_HOST=${LINUX_HOST:-127.0.0.1}
LINUX_PORT=${LINUX_PORT:-1338}

# Execute something
curl -I "http://$LINUX_HOST:$LINUX_PORT/"
