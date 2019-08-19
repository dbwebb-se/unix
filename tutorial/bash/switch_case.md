Switch case
==============================
Examples in Bash

```sh

#!/bin/bash

# Example on switch/case on a string

WORD="banana"

case "$WORD" in
    "apple")
            echo "An apple can be green. Or red."
    ;;
    "pear")
            echo "A pear rhymes with a bear"
    ;;
    "banana")
            echo "bananananaa!"
    ;;
esac

# Example on switch/case on an argument

function menu() {
    echo "Welcome!"
    echo "This is the menu"
}

while (($#))
do
    case "$1" in

        menu)
            menu
            shift
            exit 0
        ;;

        -u|user)
            echo $USER
            shift
            exit 0
        ;;

        *)
            menu
            exit 0
    esac
done


```

Reference and read more
------------------------------

[Switch/case](http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_07_03.html)



Revision history
------------------------------

2015-06-22 (lew) PA1 First try.
