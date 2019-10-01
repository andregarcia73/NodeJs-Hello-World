//###########################################################################
//###########################################################################
//##
//## Hello World Application
//## 01/10/19
//##
//###########################################################################
//###########################################################################
	//##
	//##	Instructions
	//##		Run this NodeJS application in your computer:
	//##			$ node HelloWorld.js		(on Windows double-click on _Console_Node.bat)
	//##		You should see in your console:
	//##			Server listening on Port: 9000
	//##		GET
	//##			Open a browser in your computer then type (double-click on _AppTest.html and experience)
	//##				http://localhost:9000/MyEndPoint
	//##			You should see:
	//##				{"ResponseMessage":"Hello World"}
	//##		POST
	//##			Post a message in
	//##				http://localhost:9000/MyEndPoint (double-click on _AppTest.html and experience)
	//##				with desired "quantidade" parameter (accepts only positive integer values)
	//##			You should see:
	//##				{"ResponseMessage":"2 * quantidade"}
	//##
	//###########################################################################
	//###########################################################################

    //---------------------------------------------------------------------------
    // Global "Public" Variables
    //---------------------------------------------------------------------------

        // Global Variables into a single global object (one single global variable)
        var G                       = {};

        // DesiredEndPoint (single Endpoint)
        G.DesiredEndPoint           = "/MyEndPoint";

        // Error Codes
        G.E_200_OK                  = 200;                          // OK
        G.E_400_Bad_Request         = 400;                          // Bad Request
        G.E_500_IntServError        = 500;                          // Internal Server Error

    //---------------------------------------------------------------------------
    // Main program
    //---------------------------------------------------------------------------

        // Runs protected against errors
        try
            {
            //  var B               = C;                            // try-catch error simulation
            Main                    ();
            }
        catch (e)
            {
            // Here the server will go down, but, at least, will show the error on system console
            console.log             ("Main try-catch error: " + e);
            }

    //---------------------------------------------------------------------------
    // Main function
    //---------------------------------------------------------------------------

    function Main()
        {
        // Creates Node http object
        var Http                    = require('http');

        // Defines the HTTP Server Port to be listened
        // process.env.PORT will mean only on Heroku
        // (on development environment, this application will listen Port 9000)
        var Port                    = process.env.PORT || 9000;

        // Creates HTTP Server
        var Server                  = Http.createServer(function(Req, Res)
            {
            // On each client browser request this method will be called (only after starts listening port below)

            // For debug purpose
            Req.TotalData           = "";

            // Runs protected against errors
            try
                {
                OnClientRequest     (Req, Res);
                }
            catch (e)
                {
                // You can try this situation uncomenting the line:
                //      var B                   = D;
                //      on OnClientRequest(Req, Res) method below
                // Sends only HTTP Error Code 500 "Internal Server Error"
                // Will be handled according browser implementation
                SendStringResponse  (Req, Res, G.E_500_IntServError, "");
                }

            });

        // Starts Listening Server Port
        Server.listen               (Port, function()
            {
            console.log             ("Server listening on Port: " + Port);
            });
        };

    //---------------------------------------------------------------------------
    // OnClientRequest (On each client browser request this method will be called)
    //---------------------------------------------------------------------------

    function OnClientRequest(Req, Res)
        {
        // try-catch error simulation inside the Server event
        //  var B                   = D;

        // Desired EndPoint ?
        if (Req.url != G.DesiredEndPoint)
            {
            // Responses an Error
            SendStringResponse      (Req, Res, G.E_400_Bad_Request, "");
            return;
            }

        // IsHelloWorld ?
        if (IsHelloWorld(Req, Res))
            return;

        // IsPostQuantidade ?
        if (IsPostQuantidade(Req, Res))
            return;

        // Responses an Error
        SendStringResponse          (Req, Res, G.E_400_Bad_Request, "");
        };

    //---------------------------------------------------------------------------
    // SendStringResponse
    //---------------------------------------------------------------------------

    function SendStringResponse(Req, Res, Status, Message)
        {

        // Starts Response
        Res.writeHead               (Status, {'Content-Type': 'text/html; charset=utf-8'});

        if (Message != "")
            Res.write               ("{\"ResponseMessage\":\"" + Message + "\"}");
        // Optional Responses
        //  Res.write               ("{\"RequestEndPoint\":\"" + Req.url + "\", \"RequestMethod\":\"" + Req.method + "\", \"RequestServerDateTime\":\"" + (new Date()) + "\", \"ResponseStatus\":\"" + Status + "\", \"ResponseMessage\":\"" + Message + "\"}");
        //  Res.write               ("{\"RequestEndPoint\":\"" + Req.url + "\", \"RequestMethod\":\"" + Req.method + "\", \"RequestServerDateTime\":\"" + (new Date()) + "\", \"ResponseStatus\":\"" + Status + "\", \"ResponseMessage\":\"" + Message + "\", \"Req.TotalData\":\"" + Req.TotalData + "\"}");

        // Ends Response
        Res.end                     ();
        };

    //---------------------------------------------------------------------------
    // IsHelloWorld
    //---------------------------------------------------------------------------

    function IsHelloWorld(Req, Res)
        {
        // Is GET ?
        if (Req.method != "GET")
            return false;

        // Response Write a JSON Hello World message
        SendStringResponse          (Req, Res, G.E_200_OK, "Hello World");

        // OK !
        return ! false;
        };

    //---------------------------------------------------------------------------
    // IsPostQuantidade
    //---------------------------------------------------------------------------

    function IsPostQuantidade(Req, Res)
        {
        // Is POST ?
        if (Req.method != "POST")
            return false;

        // OnData
        Req.TotalData               = "";
        Req.on("data", function(ChunkData)
            {
            // For debug purpose
            //  Res.write           ("<p>ChunkData.length:" + ChunkData.length);
            Req.TotalData          += ChunkData;
            });

        // OnEnd
        Req.on("end", function()
            {
            // Extracts quantidade
            var RE                  = new RegExp("quantidade=([0-9]+)&", "g");  // Try as first or middle parameter
            var ArrResult           = RE.exec(Req.TotalData);
            if (ArrResult == null)
                {
                RE                  = new RegExp("quantidade=([0-9]+)$", "g");  // Try as last parameter
                ArrResult           = RE.exec(Req.TotalData);
                }

            // Not Found ?
            if (ArrResult == null)
                {
                SendStringResponse  (Req, Res, G.E_400_Bad_Request, "");
                // Alternative to see the error reason
                //SendStringResponse(Req, Res, G.E_200_OK,          "Invalid input positive number OR POST does not have [quantidade] parameter.");
                }
            else
                {
                var InputNumber     = Number(RegExp.$1);    // Casts no Number
                var ResultNumber    = 2 * InputNumber;      // Times 2 as an example
                SendStringResponse  (Req, Res, G.E_200_OK, ResultNumber);
                }
            });

        // OK !
        return ! false;
        };

//###########################################################################
//###########################################################################
