FROM debian:wheezy

#------------------  BASE SETTINGS -------------------#

#Maintainer
MAINTAINER Felix Imobersteg <felix.imobersteg@me.com>

#Base settings
ENV DEBIAN_FRONTEND noninteractive
ENV HOME /root

#Update
RUN apt-get update
RUN apt-get upgrade

#Create upstart script
RUN echo "#\0041/bin/bash" > /bin/upstart
RUN chmod 755 /bin/upstart


#----------------------- NGINX -----------------------#

#Install nginx
RUN apt-get install -y nginx libpcre3-dev libssl-dev zlib1g-dev

#Create required directories and files
RUN touch /var/log/nginx/access.log
RUN touch /var/log/nginx/error.log
RUN mkdir /etc/nginx/ssl
RUN mkdir /etc/nginx/auth
RUN chown -R www-data:www-data /var/lib/nginx

#Add ssl keys
ADD config/ssl /etc/nginx/ssl

#Copy auth
ADD config/auth /etc/nginx/auth

#Edit config
RUN mkdir /var/www
RUN chown -R www-data:www-data /var/www/
RUN chmod -R 2755 /var/www/
RUN rm -rf /etc/nginx/sites-available/
RUN rm -rf /etc/nginx/sites-enabled/
RUN rm -rf /etc/nginx/conf.d/
RUN rm /etc/nginx/nginx.conf
ADD config/nginx /etc/nginx

#Alter upstart script
RUN echo -n "nginx" >> /bin/upstart


#---------------------- GOLANG -----------------------#

#Install deps
RUN apt-get update && apt-get install --no-install-recommends -y \
    ca-certificates \
    curl \
    mercurial \
    git-core

#Install go
RUN curl -s https://storage.googleapis.com/golang/go1.3.linux-amd64.tar.gz | tar -v -C /usr/local -xz
ENV GOPATH /go
ENV GOROOT /usr/local/go
ENV PATH $PATH:/usr/local/go/bin:/go/bin


#---------------------- ADD APP ----------------------#

#Alter upstart script
RUN rm -rf /app
ADD build /app/
WORKDIR /app/
RUN go build docuro.go

#Add app
RUN echo -n " & ./docuro" >> /bin/upstart


#---------------- CONTAINER SETTINGS -----------------#

#Slimming down Docker containers
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

#Set upstart script
CMD /bin/upstart

#Expose Ports
EXPOSE 10443