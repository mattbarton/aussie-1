
Create AWS account as user projectaussie@mattbarton.info

In AWS Route 53, register projectaussie.com

In AWS IAM console, create user 'aussie' with 
access key ID: Removed
secret access key: Removed

Create Group with Admin privileges
Add user 'aussie' to admin group

Create self-signed cert (see /certs) and upload with 'aws iam upload-server-certificate', result:
arn:aws:iam::074763112859:server-certificate/projectaussie-cert

Create static hosting site on S3
aws s3 mb s3://projectaussie.com
aws s3 mb s3://logs.projectaussie.com
aws s3 mb s3://www.projectaussie.com

aws s3 website s3://projectaussie.com/ --index-document index.html --error-document error.html

Allow access to objects in S3: In https://console.aws.amazon.com/s3 , for projectaussie.com, permissions, bucket policy:
{
  "Version":"2012-10-17",
  "Statement": [{
    "Sid": "Allow Public Access to All Objects",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::projectaussie.com/*"
  }
 ]
}

S3 -> projectaussie.com -> properties -> logging:
* enabled
* Target bucket: logs.projectaussie.com
* Target prefix: root/

S3 -> www.projectaussie.com -> properties -> static web hosting -> redirect to projectaussie.com

From here: http://docs.aws.amazon.com/gettingstarted/latest/swh/getting-started-configure-route53.html
Do: Create Record Sets for Your Domain and Subdomain


While in the 'web-server' directory, run 'eb init':
us-east-1
Create new app
Name: aussie

then 'eb create' (takes about 5 mins)

Then go back to Route 53, created a record set to point web.projectaussie.com at the elastic beanstalk load balancer.
