#!/bin/bash

echo "Updating System"
sudo apt-get --yes update

echo "Reinitialising Virtual Box Guest Additions"
/etc/init.d/vboxadd setup

sudo apt-get --yes install curl

echo "Installing Node"
sudo apt-get install --yes git-core build-essential openssl libssl-dev pkg-config 
cd /usr/local/src
sudo git clone git://github.com/joyent/node.git
cd node
git checkout v0.10.26
sudo ./configure
sudo make
sudo make install

echo "Installing NPM"
curl http://npmjs.org/install.sh | sh


cd /home/vagrant
ln -s /vagrant

echo "Initialisation complete ... please run \"vagrant reload\" to restart box"


