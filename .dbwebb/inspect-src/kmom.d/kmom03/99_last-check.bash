#!/usr/bin/env bash
#
# Script run for specific kmom (within docker).
#
# Available (and usable) data:
#   $KMOM
#   $ACRONYM
#   $COURSE_REPO
#

cd me || exit

e() { exit; }; export -f e

echo "Do manual stuff, if needed (write e/exit to exit)?"
ls
bash
