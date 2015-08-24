# aussie-1

Order of priority for non-functional requirements:

1. Security. See http://www.infoworld.com/article/2608076/data-center/murder-in-the-amazon-cloud.html
2. Reliability. The site should be up 99.99%
3. Performance. The site should load as fast as possible.
3. Scalability. The site should automatically scale to account for usage peaks, eg Black Friday or DDOS attacks.

Development principles:

* Automation, automation, automation will allow a (very) small team to deliver, improve, operate and maintain the site.

## Notes on architecture

Consider this best-practice but rather complicated AWS web app architecture: http://media.amazonwebservices.com/architecturecenter/AWS_ac_ra_web_01.pdf

We are planning to use AWS Elastic Beanstalk to minimize the initial DevOps workload. Our initial architecture will be based more closely on the conventions associated with the Elastic Beanstalk - see http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/concepts.concepts.architecture.html and it's sibling pages.

e.g. for now, we will *not* use S3 and Cloudfront for serving static resources. Instead the web servers will serve up all content, dynamic and static. This is a speed-to-market and development cost/time simplification, and can we undone when we need to benefit from the better performance / lower cost of Cloudfront / S3

We will have a single web app tier (running node.js), instead of separate web tier and worker tier (see here for why we might want to split them in future: http://www.codingthearchitecture.com/2012/07/20/when_do_you_need_a_3_tier_architecture.html )


## Local setup

* Install Git. Configure git as usual (user.name, user.email, credential.helper)
* Install Vagrant
* Clone the repo: `git clone https://github.com/mattbarton/aussie-1.git`
* `cd` to the root of the repo, where the Vagrantfile is. Run `vagrant up` to (download and) launch the vagrant machine, then `vagrant ssh` to open a shell on the vagrant machine and run commands on the vagrant machine.

## web-public

web-static uses hugo from http://gohugo.io . To run the dev hugo server, use
`hugo server --buildDrafts --bind="0.0.0.0"`. You should then be able to view the website
from a browser on your host machine at http://localhost:1313/ (in this case, it is necessary to use 0.0.0.0 instead of 127.0.0.1 or localhost for the binding, for it to be accessible from outside the VM)

Note that `hugo watch` does not work, due to running it in the vagrant environment. This is a known bug in hugo.

TODO After the static pages get built by hugo, they are deployed into the 'public' folder of the node server by the build job

## web-api

This will hold the web API back-end, run by node.js, which will provide data to the web-static and web-dynamic pages via AJAX calls as required.

## web-private

This will hold the members-only pages that require an authenticated user

## Vagrant box details

We are using Vagrant to provide a consistent development environment for all team members that has all the necessary tools packaged with it, and is similar to the production environment (if necessary in future, we could use the Vagrant box to spin up the prod instances on EC2, so that dev and prod would be identical).

People generally recommend using the standard Amazon Linux AMI on EC2, which is based on RHEL/CentOS. So we'll use CentOS for the Vagrant box, and version 6.5 still since version 7 is not yet stable, ie chef/centos-6.5
See also: http://thejackalofjavascript.com/vagrant-mean-box/
The box is stored on Atlas as named box `mbarton-at-embarkvet/aussie-box-1`, see https://atlas.hashicorp.com/mbarton-at-embarkvet/boxes/aussie-box-1 for the commands used to create the box from chef/centos-6.5.
