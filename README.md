# ipThost
ipThost is a simple program that find websites hosted on the same server by searching them using the IP address on the search engine BING.

# Installation
You can compile the source code on your own or you can download the binaries that i've made! For the 3 most used OS.

## Required modules
```
pip install requests && pip install requests[socks]
```
## Use it with python
```bash
git clone https://github.com/ChronosOG/ipThost.git
cd ipThost 
python ipthost.py -h 
```
## Compile on your own
First you need to
```
pip install requests && pip install requests[socks]
```
Second you need to
```
pip install pyinstaller
```
At the end you just have to
```
pyinstaller ipthost.py --onefile
if that didn't work please visit https://www.pyinstaller.org/documentation.html for more information.
```

## MAC OS (THIS SCRIPT WAS CREATED ON MAC OS X 10.13.6)
```bash
wget -O /usr/bin/ipthost https://github.com/ChronosOG/ipThost/releases/download/0.1/ipthost.MAC-OS-x; sudo chmod 777 /usr/bin/ipthost 
```

## GNU/LINUX (TESTED ON UBUNTU 18.04)
```bash
wget -O /usr/bin/ipthost https://github.com/ChronosOG/ipThost/releases/download/0.1/ipthost.MAC-OS-x; sudo chmod 777 /usr/bin/ipthost
```
## WINDOWS
```powershell
powershell Invoke-WebRequest -Uri 'https://github.com/ChronosOG/ipThost/releases/download/0.1/ipthost-WINDOWS.exe'  -OutFile 'C:\YOUR\PATH\ipthost.exe'
```


# Usage

```
##################################################
#Simple Script to find all websites              #
#hosted on the same server.                      #
#Script by Firas Jelassi, James Park-Watt,r518   #
#Github: @ChronosOG @jimmypw @r518               #
#Type %s --help to see the flags                 #
##################################################

usage: ipthost.py [-h] [-t] [-p] [-o] [-pg] [-sr]

Flags for using the script:
  -h, --help  show this help message and exit
  -t          Use the flag -t to specify the IP address or the hostname!
              Without the "http(s)://".
  -p          Use the flag -p to use a proxy e.g -p http://127.0.0.1:9090
              socks://127.0.0.1:9150
  -o          Use the flag -o to save the output.
  -pg         Use the flag -pg to choose how many page should the script
              check! Default is: 500.
  -sr         Use the flag -sr to add an extra search to the IP, e.g python
              ipthost.py -t 127.0.0.1 -sr .php?id= so it will give you
              websites developed on php and gives you a file with the
              parameter "id" so you can check for common vulns such as SQLi.
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[LGPL](https://choosealicense.com/licenses/lgpl-3.0/)
