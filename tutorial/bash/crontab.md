Crontab
==============================
Examples in Bash

* `crontab -e` creates a new cron job
* At the bottom, add a line like this:  

`1 2 3 4 5 /path/to/command arg1 arg2`  

OR  

`1 2 3 4 5 /path/to/script.sh`

1: Minute (0-59)  
2: Hours (0-23)  
3: Day (0-31)  
4: Month (0-12, 12 == December)  
5: Day of the week (0-7, 7 or 0 == Sunday)  
/path/to/command - script or command to schedule  

Ex: `* * * * * /path/to/script.sh` (only stars will execute every minute)

By default, a cron job will send email to the user account. Disable it by entering the following code at the end of the line: `>/dev/null 2>&1`  


Example of script.sh
```sh

#!/bin/bash

echo "Testing" >> "cron_test.txt"  # appending "Testing" to the file "cron_test.txt" located in ~/


```

Reference and read more
------------------------------

[crontab](http://www.computerhope.com/unix/ucrontab.htm)



Revision history
------------------------------

2015-06-23 (lew) PA1 First try.
