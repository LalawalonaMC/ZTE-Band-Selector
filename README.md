## ZTE LTE Band Locker & Diagnostic Tool

# Requirements
ZTE Router (what do u expect??)
A Brain
This github page and the code.js copied to the clipboard

# How to change the band:
Remember that i live in Poland so those bands are for me, Do your own research to find out your own bands.

In the code.js change the line with CHANGE_ME to for example:

0x1 = Band 1 (Faster than Band 20 or Band 8 but worse range.)

0x4 = Band 3 (The "Workhouse" in poland, Often more capacity than B1.)

0x40 = Band 7 (THE FASTEST, Range a little bad but worth it.)

0x80 = Band 8 (Plus / TMobile Only, Low Speed but good for deep inside buildings.)

0x80000 = Band 20 (Very low speed but the longest range of all.)

0x2000000000 = Band 38 (Play / Plus Only, Specific high-capacity TDD band.)

# How to use this Tool
Just use it on the web without installation! Here are the steps to "hack" the router interface:

Using the admin password access the router web gateway (the IP address is usually 192.168.0.1, sometimes it changes).

Opening Developer Tools can be done by pressing the F12 key (it works in Chrome, Edge, and Firefox).

Going to the Console tab should be done on the top of the side panel that appears.

Make sure to copy-paste the code "code.js" into the Console.

## AFTER USING TOOL!
Wait for 20 seconds, The band will change and the code will give you the current SINR, RSRP and RSRQ. Please make sure that the SINR is positive for the best experience and RSRP to be under -95 is recomended.

# Optimized for Poland
The locations in this code are especially tailored to fit the Polish telecom environment (Orange, T-Mobile, Play, Plus).

Default Bands: It allows bands B1(2100MHz), B3(1800MHz), B7(2600MHz), and B20(800MHz) to be used.

Stability over Speed: Lock onto Band 7 if you live in a busy city to avoid interference from neighboring towers.

Global Users: If you are not in Poland, then research on your own about the local LTE frequencies before you lock a particular band.

# Real-Time Signal Monitoring
After activation, you have live data for:

SINR: Signal-to-Interference-plus-Noise Ratio. This is very important for online gaming. Try to keep this value positive.

RSRP: The actual signal power you are getting from the tower.

RSRQ: The value of the quality of the signal received.
