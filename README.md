# aussie-1

## Local setup

Install Git and Vagrant. Configure git as usual (user.name, user.email, credential.helper)

## Get the source

`git clone https://github.com/mattbarton/aussie-1.git`

## Vagrant

We are using Vagrant to provide a consistent development environment for all team members that has all the necessary tools packaged with it, and is similar to the production environment (if necessary in future, we could use the Vagrant box to spin up the prod instances on EC2, so that dev and prod would be identical).

In the root folder of the repo, there is a Vagrantfile. `cd` to this folder and `vagrant up` to launch the vagrant machine, then `vagrant ssh` to run commands on the vagrant machine.


### How we created the Vagrant box
People generally recommend using the standard Amazon Linux AMI on EC2, which is based on RHEL/CentOS. So we'll use CentOS for the Vagrant box, and version 6.5 still since version 7 is not yet stable, ie chef/centos-6.5
See also: http://thejackalofjavascript.com/vagrant-mean-box/
The box is stored on Atlas as named `mbarton-at-embarkvet/aussie-box-1`

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
sudo yum install readline-devel                 # needed to compile Python's readline module
sudo ./configure
sudo make
sudo make altinstall                            # do side-by-side install of python2.7 without overwriting old python
sudo /usr/local/bin/python2.7 -m ensurepip --upgrade
cd ~
sudo /usr/local/bin/python2.7 -m pip install --upgrade pip
sudo /usr/local/bin/python2.7 -m pip install virtualenv
# get postgres
# change /etc/yum.repos.d/CentOS-Base.repo file as per https://wiki.postgresql.org/wiki/YUM_Installation
sudo yum localinstall http://yum.postgresql.org/9.4/redhat/rhel-6-x86_64/pgdg-centos94-9.4-1.noarch.rpm
sudo yum install postgresql94-server
sudo service postgresql-9.4 initdb
sudo chkconfig postgresql-9.4 on
# get aws tools
sudo /usr/local/bin/python2.7 -m pip install awsebcli
sudo /usr/local/bin/python2.7 -m pip install awscli
sudo /usr/local/bin/python2.7 -m pip install --upgrade awscli
# mongo
sudo vi /etc/yum.repos.d/mongodb-org-3.0.repo     # contents from https://docs.mongodb.org/manual/tutorial/install-mongodb-on-red-hat/
sudo yum install mongodb-org
sudo chkconfig mongod on
```
