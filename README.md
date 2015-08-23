# aussie-1

## Get the source

`git checkout ...`

## Vagrant

We are using Vagrant to provide a consistent development environment for all team members that has all the necessary tools packaged with it, and is similar to the production environment (if necessary in future, we could use the Vagrant box to spin up the prod instances on EC2, so that dev and prod would be identical).

In the root folder of the repo, there is a Vagrantfile. `cd` to this folder and `vagrant up` to launch the vagrant machine, then `vagrant ssh` to run commands on the vagrant machine.


### How we created the Vagrant box
People generally recommend using the standard Amazon Linux AMI on EC2, which is based on RHEL/CentOS. So we'll use CentOS for the Vagrant box, and version 6.5 still since version 7 is not yet stable, ie chef/centos-6.5

```
mkdir ourbox
cd ourbox
vagrant init chef/centos-6.5
vagrant up
vagrant ssh
sudo yum install git
sudo yum update
sudo yum install epel-release                   # for CentOS, packaged node is in the non-standard EPEL package store
sudo yum install nodejs npm --enablerepo=epel   # gets an old version of node (which we'll update later with 'n') and npm
sudo npm update -g npm                          # update npm
sudo npm install -g bower                       # needs to be installed globally
sudo npm install -g grunt-cli                   # a wrapper around the local grunt installed in the project dir
sudo npm install -g n                           # for switching between versions of node https://github.com/tj/n
sudo n 0.12.6                                   # Install the same version as on the latest Amazon AMI 2015.03, can be run with n use 0.12.6
# get and build newer python versions, needed by new tools like eb-cli. Can't erase Python 2.4, since on CentOS the yum command needs 2.4
sudo yum groupinstall development
sudo yum install yum-utils bzip2 bzip2-devel wget curl tar   # https://www.rosehosting.com/blog/how-to-install-nodejs-bower-and-gulp-on-a-centos-7-vps/
sudo yum install zlib-dev openssl-devel sqlite-devel         # https://www.digitalocean.com/community/tutorials/how-to-set-up-python-2-7-6-and-3-3-3-on-centos-6-4
cd /opt
sudo wget https://www.python.org/ftp/python/2.7.10/Python-2.7.10.tar.xz
sudo xz -d Python-2.7.10.tar.xz
sudo tar -xvf Python-2.7.10.tar
cd Python-2.7.10
sudo ./configure
sudo make
sudo make altinstall
...more to come

```
