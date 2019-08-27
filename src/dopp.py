import requests
import re
import sys
import random
import ssl
import os
from urlparse import urlparse
import argparse
import urllib

def dopp(outp,urls):
    try:
	    a = list(set(urls))
            print("Websites: ")
            if outp != None:
                try:
                    os.remove(outp)
                    for sites in a:
                        u = sites.replace('&amp;','&')
                        with open(outp, "a") as siti:
                            siti.write(u)
                            print(u)
                except:
                    for sites in a:
                        u = sites.replace('&amp;','&')
                        with open(outp, "a") as siti:
                            siti.write(u)
                            print(u)
            else:
                for sites in a:
                    u = sites.replace('&amp;','&')
                    print(u)
    except:
        print("No Result Found! :(")
