Read input
==============================
Examples in Bash

```sh

#!/bin/bash

function startLoop(){
        echo "Enter command ('done' to quit): "

        read command

        if [ "$command" == "say" ]
                then
                        echo "I am saying something!"
        elif [ "$command" == "north" ]
                then
                        echo "moving north..."
        elif [ "$command" == "south" ]
                then
                        echo "moving south"
        elif [ "$command" == "east" ]
                then
                        echo "moving east"
        elif [ "$command" == "west" ]
                then
                        echo "moving west"

        elif [ "$command" == "done" ]
                then
                        echo "ok, done with the game";
                        exit 0
        else
                echo "This genie dont't understand that..."
        fi
}

while (( $# ))
do
        case "$1" in

                -l|--loop)
                startLoop
                ;;
        esac
done



```

Reference and read more
------------------------------

[read](#)



Revision history
------------------------------

2015-06-22 (lew) PA1 First try.
