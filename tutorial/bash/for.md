For loop
==============================
Examples in Bash

```sh

#!/bin/bash

#For-loop specific numbers.
for val in 1 2 3 4 5 6 7 8 9 10;
do
    echo "value: $val"
done


#For-loop with numbers in range
for val in {11..20}
do
    echo "value: $val"
done


#For-loop with numbers in range and step
for val in {0..10..2} #Go from 0 to 10 and step 2
do
    echo "value: $val"
done

#For-loop with three conditions
for (( i=1; i<=10; i++ ))
do
    echo "value: $i"
done

#For-loop with conditional exit, break statement
for val in {0..10}
do
        if [ $val -eq 5 ]
        then
                echo "breaking loop, value reached 5"
                break
        fi
        echo "value: $val"
done

#For-loop with continue statement
for val in {10..30}
do
        if [ $val -lt 20 ] #if value is less than 20, skip it
        then
                echo "skipping number"
                continue #continue with the next value
        fi
        echo "value: $val"
done


```

Reference and read more
------------------------------

[For-loops](http://www.cyberciti.biz/faq/bash-for-loop/)



Revision history
------------------------------

2015-06-10 (lew) PA1 First try.
