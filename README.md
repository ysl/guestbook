# Guestbook

## Environment
 * Ubuntu 14.04
 * Node.js
 * MySQL
 * S3

## Install necessary package
 * Node.js

        $ sudo apt-get -y install nodejs npm
        $ sudo ln -s /usr/bin/nodejs /usr/bin/node

 * MySQL client

        $ sudo apt-get -y install mysql-client

## Setup database
 * Create database

        $ mysql -h localhost -u root -p -e "CREATE DATABASE demo"

 * Create schema

        $ mysql -h localhost -u root -p demo < database/schema_init.sql

## Run
 * Build

        $ npm install

 * Configure

        $ cp conf/guestbook.json.default conf/guestbook.json
        # Edit conf/guestbook.json, set the database connection and AWS key

 * Run

        $ bin/www
        # Then open URL http://localhost:3000
