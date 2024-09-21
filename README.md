# GRPC Client and Server test

Testing `Server` and `Client` communication using `GRPC`.

For testing `CRUD` was performed for Product.

## Required

- yarn [Install using]: `npm install -g yarn`
- protobuf [Install using]: `brew install protobuf`

```bash
# Install
$ yarn

# Build the protobuf file
$ yarn build:proto

# Run server [dev mode]
$ yarn devLserver

# Run client [dev mode]
$ yan dev:client

# Build the project
$ yarn build

# Run server [as js]
$ yarn start:server

# Run client [as js]
$ yarn start:client
```
