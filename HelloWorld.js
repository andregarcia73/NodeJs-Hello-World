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
                //	var B			= D;
                //	on OnClientRequest(Req, Res) method below
                // Sends only HTTP Error Code 500 "Internal Server Error"
                // Will be handled according browser implementation
                SendStringResponse  (Req, Res, G.E_500_IntServError, null);
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
            SendStringResponse      (Req, Res, G.E_400_Bad_Request, null);
            return;
            }

        // IsHelloWorld ?
        if (IsHelloWorld(Req, Res))
            return;

        // IsPostQuantidade ?
        if (IsPostQuantidade(Req, Res))
            return;

        // Responses an Error
        SendStringResponse          (Req, Res, G.E_400_Bad_Request, null);
        };

    //---------------------------------------------------------------------------
    // SendStringResponse
    //---------------------------------------------------------------------------

    function SendStringResponse(Req, Res, Status, RespObj)
        {

        // Starts Response
        Res.writeHead               (Status, {'Content-Type': 'application/json'});

        if (RespObj != null)
            Res.write               (JSON.stringify(RespObj));

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

		// Creates RespObj
		var RespObj					= {
			"ResponseMessage"		: "Hello World"
			};

        // Response Write a JSON Hello World message
		SendStringResponse          (Req, Res, G.E_200_OK, RespObj);

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
			//	Req.TotalData		= '{"quantidade":"33"}';		// For debug purposes

			// Runs protected against parse error
			try
				{
				// Parse
				var ReqObj			= JSON.parse(Req.TotalData);

				// Creates RespObj
				var RespObj				= {
					"ResponseMessage"	: "" + (ReqObj.quantidade * 2)
					};
				SendStringResponse  (Req, Res, G.E_200_OK, RespObj);
				}
			catch (e)
				{
				SendStringResponse  (Req, Res, G.E_400_Bad_Request, null);
				}

            });

        // OK !
        return ! false;
        };

//###########################################################################
//###########################################################################
