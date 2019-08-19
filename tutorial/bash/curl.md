Curl
==============================
Examples in Bash

```sh

#!/bin/bash

# Example of a simple curl. It will not save the result, just print it in the console.
curl dbwebb.se


# Example where the output is saved to myFile.html

curl -o myFile.html dbwebb.se

# Example where the page's <title> is saved to myFile.txt

curl dbwebb.se | grep "<title>" > myFile.txt

# Example where the response is JSON

curl http://echo.jsontest.com/key/value/one/two

```

Reference and read more
------------------------------

[curl](http://www.slashroot.in/curl-command-tutorial-linux-example-usage)



Revision history
------------------------------

2015-06-24 (lew) PA1 First try.
