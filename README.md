# Storefront Backend Project

Udacity 2d project

### Install db-migrate globally

`npm install -g db-migrate`

### Create the dev database

`db-migrate db:create storefront`

### Run migration

`db-migrate up`

### To install project dependensies

`npm i`

### To run the server

`npm run start`

### The test script create the test database before doing the test

### Created test and dev databases are without a password

### Env variables

NODE_ENV=test
PORT=4000 //This is the port the server is running on
POSTGRES_PORT:5432 //this is the port the database is running on
POSTGRES_HOST = "localhost"
POSTGRES_DB ="storefront"
POSTGRES_TEST_DB= "test"
POSTGRES_USER ="postgres"
POSTGRES_PASSWORD = ""
BCRYPT_PASS = "axon"
SALT_ROUNDS =10
TOKEN = XXXX
