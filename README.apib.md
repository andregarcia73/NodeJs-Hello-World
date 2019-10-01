FORMAT: 1A
HOST: https://pure-depths-91789.herokuapp.com

# NodeJs-Hello-World

This is a Node JS Hello World application with HTTP Server.

You can get more information on:

[https://github.com/andregarcia73/NodeJs-Hello-World](https://github.com/andregarcia73/NodeJs-Hello-World)


## GET endpoint [/MyEndPoint]

### Endpoint with HelloWorld response [GET]

+ Response 200 (application/json)

        {
            "ResponseMessage": "Hello World"
        }

## POST endpoint [/MyEndPoint]

### Endpoint with number times 2 [POST]

+ Request

        quantidade=2

+ Response 200 (application/json)

        {
            "ResponseMessage": "4"
        }
