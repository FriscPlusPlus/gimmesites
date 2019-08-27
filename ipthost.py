import requests
import re
import sys
import random
import ssl
import os
from urlparse import urlparse
import argparse
import urllib
import socket
from src import *

filename = sys.argv[0]
sys.tracebacklimit = 0
logo = """
##################################################
#Simple Script to find all websites              #
#hosted on the same server.                      #
#Script by Firas Jelassi, James Park-Watt,r518   #
#Github: @ChronosOG @jimmypw @r518               #
#Type %s --help to see the flags        #
#################################################
"""
parser = argparse.ArgumentParser(description='')
parser._optionals.title = "Flags for using the script"
print (logo % filename)

parser.add_argument('-t',
                    help='Use the flag -t to specify the IP address or the hostname! Without the "http(s)://".', metavar='')
parser.add_argument('-p',
                    help='Use the flag -p to use a proxy\n e.g -p http://127.0.0.1:9090\nsocks://127.0.0.1:9150', metavar='')
parser.add_argument('-o',
                    help='Use the flag -o to save the output.', metavar='')
parser.add_argument('-pg',
                    type=int,
                    help='Use the flag -pg to choose how many page should the script check! Default is: 500.', metavar='')
parser.add_argument('-sr',
                    help='Use the flag -sr to add an extra search to the IP,\n e.g python '+filename+' -t 127.0.0.1 -sr .php?id=\nso it will give you websites developed on php and gives you a file with the parameter "id"\nso you can check for common vulns such as SQLi.', metavar='')



args = parser.parse_args()

if args.t != None and args.sr == None:
    u = search.search(socket.gethostbyname(args.t), args.pg, args.p)
    dopp.dopp(args.o,u)
elif args.sr != None:
    u = search.search(socket.gethostbyname(args.t), args.pg, args.p, args.sr)
    dopp.dopp(args.o,u)
else:
    pass
