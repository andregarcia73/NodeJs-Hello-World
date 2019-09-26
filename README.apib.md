FORMAT: 1A
HOST: https://pure-depths-91789.herokuapp.com

# NodeJs-Hello-World

This is a Node JS Hello World application with HTTP Server.

You can get more information on:

[https://github.com/andregarcia73/NodeJs-Hello-World](https://github.com/andregarcia73/NodeJs-Hello-World)


## GET endpoint [/MyGetEndPoint]

### Endpoint with HelloWorld response [GET]

+ Response 200 (application/json)

        {
            "RequestEndPoint": "/MyGetEndPoint",
            "RequestMethod": "GET",
            "RequestServerDateTime": "Thu Sep 26 2019 20:15:26 GMT+0000 (Coordinated Universal Time)",
            "ResponseStatus": "OK",
            "ResponseMessage": "Hello World"
        }

## POST endpoint [/MyPostEndPoint]

### Endpoint with number times 2 [POST]

+ Request

        quantidade=2

+ Response 200 (application/json)

        {
            "RequestEndPoint": "/MyPostEndPoint",
            "RequestMethod": "POST",
            "RequestServerDateTime": "Thu Sep 26 2019 20:33:35 GMT+0000 (Coordinated Universal Time)",
            "ResponseStatus": "OK",
            "ResponseMessage": "InputNumber = 2, ResultNumber = 4"
        }
