# See http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/configuring-https.html

openssl genrsa 2048 > privatekey.pem
openssl req -new -key privatekey.pem -out csr.pem
openssl x509 -req -days 365 -in csr.pem -signkey privatekey.pem -out server.crt

aws iam upload-server-certificate --server-certificate-name projectaussie-cert --certificate-body file://server.crt --private-key file://privatekey.pem
