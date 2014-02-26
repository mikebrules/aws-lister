#!/bin/bash
    
echo "Linking helper scripts from build"
ln -s ./aws-resource-lister/development_environment/vagrant_sandbox/host_init.sh
ln -s ./aws-resource-lister/development_environment/vagrant_sandbox/git_init.sh
ln -s ./aws-resource-lister/development_environment/vagrant_sandbox/Vagrantfile
echo "You should be done. You can now Vagrant up a sandbox"