#!/bin/bash
rm -rf scramble
rsync -a ../mySite/ scramble/
cd scramble

mv genie.html mupp 
mkdir .hidden
mv space.html .hidden
chmod 600 img/genie.jpg
mkdir dummy
mv img/space.jpg dummy/space22.jpg
cd js
mkdir js
cd js
mv ../main.js main2.js
cd ../../
mv style/style.css .hidden
mv style styleFolderWithTheWrongName
mkdir whatsinhere
mv img/genie.jpg whatsinhere/geenie.jppg
mv index.html INDEX.HTML
chmod 666 INDEX.HTML
mv mupp .mupp
mv img image

tree -pa ../scramble
