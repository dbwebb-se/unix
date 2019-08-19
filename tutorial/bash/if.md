If, elif, else
==============================
Examples in Bash

```sh

#!/bin/bash

#Do something if a variable has a certain value.

VAL=5

if [ $VAL -eq 5 ]
    then
	   echo "yes!"
fi

# Above is the same as this
if [ $VAL = 5 ]
    then
        echo "yes!"
fi

# Different syntax, still working
if [ $VAL = 5 ]; then
        echo "yes!"
fi


#Add an else statement.

if [ $VAL -eq 5 ]
    then
        echo "yes!"
else
    echo "no!"
fi


#Use many if-tests.

if [ $VAL -eq 5 ]
    then
        echo "The number is 5!"
elif [ $VAL -eq 10 ]
    then
        echo "the number is 10!"
elif [ $VAL -eq 15 ]
    then
        echo "The number is 15!"
else
    echo "The number is NOT 5, 10 or 15!"
fi

```

Reference and read more
------------------------------

[if Statements](http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_07_01.html)



Revision history
------------------------------

2015-06-10 (lew) PA1 First try.
