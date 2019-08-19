Split string with delimiter
==============================
Examples in Bash

```sh

#!/bin/bash
str="banana,apple,potato"

str1="$(echo $str | cut -d ',' -f1)" # pipes the string, cut using delimiter "," field 1 (-f1)
str2="$(echo $str | cut -d ',' -f2)" # pipes the string, cut using delimiter "," field 2 (-f2)
str3="$(echo $str | cut -d ',' -f3)" # pipes the string, cut using delimiter "," field 3 (-f3)


echo "First part: $str1"
echo "Second part: $str2"
echo "Third part: $str3"

```
The above will result in:  
```
First part: banana
Second part: apple
Third part: potato
```  

Reference and read more
------------------------------

[Cut, man page](http://unixhelp.ed.ac.uk/CGI/man-cgi?cut)  


Revision history
------------------------------

2015-07-08 (lew) PA1 First try.
