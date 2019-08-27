import requests
import re
import sys
import random
import ssl
import os
from urlparse import urlparse
import argparse
import urllib


desktop_agents = ['Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
                 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
                 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
                 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/602.2.14 (KHTML, like Gecko) Version/10.0.1 Safari/602.2.14',
                 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36',
                 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36',
                 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36',
                 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36',
                 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
                 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0',]



def search(ip,pages, prox,sr=""):
    print("Searching websites")
    urls_list = []
    a = 1
    if pages != None:
        page = int(pages)
    else:
        page = int(500)
    while a < page:
        proxies = {'http' : prox}
        requests.packages.urllib3.disable_warnings()
	if not sr:
		check = 'https://www.bing.com/search?q=ip%3a%22'+ ip + '%22&first=' + str(a) + '&FORM=PERE'

	else:
	        check = 'https://www.bing.com/search?q=ip%3a%22'+ ip +"%22+"+ urllib.quote(sr)+'&%22&first=' + str(a) + '&FORM=PERE'

        agents = { 'User-Agent' : random.choice(desktop_agents), 'Cookie' : '', 'Content-Type': 'application/x-www-form-urlencoded' }
        content = requests.get(check, headers=agents, proxies=proxies, verify=False, allow_redirects=False).text.encode('utf-8')
        urls = re.findall(r'<h2>*?<a\s+[^>]*?href="([^"]*)',str(content))
        for x in urls:
		urls_list.append(x)
        a = a + 10
    return  urls_list
