#!/bin/bash

# 1. Använd `wc` för att räkna ut hur många rader ircloggen består av? Lägg svaret i filen `a.txt`. (1p)
wc --lines ircLog.txt > a.txt

# 2. Hitta raden med "pansars" åsikt om "notepad". (`b.txt`, 1p)
grep pansar ircLog.txt | grep notepad > b.txt

# 3. Använd `wc` för att räkna ut hur många ord, *words*, ircloggen består av? Lägg svaret i filen `c.txt`. (1p)
wc --words ircLog.txt > c.txt

# 4. Hitta de fyra sista raderna i filen. Lägg svaret i filen `d.txt`. (1p).
tail -4 ircLog.txt > d.txt

# 5. När öppnades ircloggen för första gången? Ledtråd "Log opened". Svara med raden som säger när loggen öppnades för första gången. (`e.txt`, 1p)
grep "Log opened" ircLog.txt | head -1 > e.txt

# 6. Vad innehåller den tredje raden där "wasa" säger något? (`f.txt`, 1p)
grep wasa ircLog.txt | head -3 | tail -1 > f.txt

# 7. Hur många rader är det som är loggade enligt tiden 11:15? (`g.txt`, 1p)
grep 11:15 ircLog.txt | wc -l > g.txt

# 8. Hitta de första 10 raderna från dagen "Wed Jun 17 2015". (`h.txt`, 3p)
grep -A 10 "Wed Jun 17 2015" ircLog.txt | tail -10 > h.txt

# 9. Hittade raderna som är inlagda angående "forum" och innehåller detaljer om "projektet" och "htmlphp". (`i.txt`, 3p)
grep -i forum ircLog.txt | grep projektet | grep htmlphp > i.txt

# 10. Vad sa "Bobbzorzen" två rader innan han sa "cewl"? (`j.txt`, 3p)
grep Bobbzorzen ircLog.txt | grep -B 2 cewl | head -1 > j.txt

# 11. Hur många ord är det i den fjärde till nionde raden, under dagen "Mon Jun 08 2015"? (`k.txt`, 3p)
grep -A 9 "Mon Jun 08 2015" ircLog.txt | tail -6 | wc -w > k.txt

# 12. Hitta den första raden "pansar" säger när klockan är 07:48. (`l.txt`, 3p)
grep pansar ircLog.txt | grep 07:48 | head -1 > l.txt
