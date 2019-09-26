//###########################################################################
//###########################################################################
//##
//## Hello World Application
//## 24/09/19
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
	//##				http://localhost:9000/MyGetEndPoint
	//##			You should see:
	//##				{"RequestEndPoint":"/MyGetEndPoint", "RequestMethod":"GET", "RequestServerDateTime":"...", "ResponseStatus":"OK", "ResponseMessage":"Hello World"}
	//##		POST
	//##			Post a message in
	//##				http://localhost:9000/MyPostEndPoint (double-click on _AppTest.html and experience)
	//##				with desired "quantidade" parameter (accepts only positive integer values)
	//##			You should see:
	//##				{"RequestEndPoint":"/MyPostEndPoint", "RequestMethod":"POST", "RequestServerDateTime":"...", "ResponseStatus":"OK", "ResponseMessage":"InputNumber = NNN, ResultNumber = 2 * NNN"}
	//##
	//###########################################################################
	//###########################################################################

	//---------------------------------------------------------------------------
	// Global "Public" Variables
	//---------------------------------------------------------------------------

		var G_DesiredGetEndPoint	= "/MyGetEndPoint";
		var G_DesiredPostEndPoint	= "/MyPostEndPoint";

	//---------------------------------------------------------------------------
	// Main program
	//---------------------------------------------------------------------------

		// Runs protected against errors
		try
			{
			//	var B				= C;							// try-catch error simulation
			Main					();
			}
		catch (e)
			{
			// Here the server will go down, but, at least, will show the error on system console
			console.log				("Main try-catch error: " + e);
			}

	//---------------------------------------------------------------------------
	// Main function
	//---------------------------------------------------------------------------

	function Main()
		{
		// Creates Node http object
		var Http					= require('http');

		// Defines the HTTP Server Port to be listened
		// process.env.PORT will mean only on Heroku
		// (on development environment, this application will listen Port 9000)
		var Port					= process.env.PORT || 9000;

		// Creates HTTP Server
		var Server					= Http.createServer(function(Req, Res)
			{
			// On each client browser request this method will be called (only after starts listening port below)

			// Attaches App_DoResEnd property on Res object (to be changeable in IsPostQuantidade function)
			Res.App_DoResEnd		= ! false;

			// For debug purpose
			Req.TotalData			= "";

			// Starts Response
			Res.writeHead			(200, {'Content-Type': 'text/html; charset=utf-8'});

			// Runs protected against errors
			try
				{
				OnClientRequest		(Req, Res);
				}
			catch (e)
				{
				// Response Write the error instead of console.log
				// Here the server will NOT go down
				Res.write			("<hr><h1>OnClientRequest error !</h1><br><b>" + e + "</b><hr>" + new Date() + "<hr>");
				}

			// Ends Response here ! (only if Res.App_DoResEnd allow)
			if (Res.App_DoResEnd)
				Res.end				();
			});

		// Starts Listening Server Port
		Server.listen				(Port, function()
			{
			console.log				("Server listening on Port: " + Port);
			});
		};

	//---------------------------------------------------------------------------
	// OnClientRequest (On each client browser request this method will be called)
	//---------------------------------------------------------------------------

	function OnClientRequest(Req, Res)
		{
		// try-catch error simulation inside the Server event
		//	var B					= D;

		// IsHelloWorld ?
		if (IsHelloWorld(Req, Res))
			return;

		// IsPostQuantidade ?
		if (IsPostQuantidade(Req, Res))
			return;

		// Responses an Error
		SendStringResponse			(Req, Res, "Error", "Unknown request");
		};

	//---------------------------------------------------------------------------
	// SendStringResponse
	//---------------------------------------------------------------------------

	function SendStringResponse(Req, Res, Status, Message)
		{
		Res.write					("{\"RequestEndPoint\":\"" + Req.url + "\", \"RequestMethod\":\"" + Req.method + "\", \"RequestServerDateTime\":\"" + (new Date()) + "\", \"ResponseStatus\":\"" + Status + "\", \"ResponseMessage\":\"" + Message + "\"}");
		// Optional Response
		//	Res.write				("{\"RequestEndPoint\":\"" + Req.url + "\", \"RequestMethod\":\"" + Req.method + "\", \"RequestServerDateTime\":\"" + (new Date()) + "\", \"ResponseStatus\":\"" + Status + "\", \"ResponseMessage\":\"" + Message + "\", \"Req.TotalData\":\"" + Req.TotalData + "\"}");
		};

	//---------------------------------------------------------------------------
	// IsHelloWorld
	//---------------------------------------------------------------------------

	function IsHelloWorld(Req, Res)
		{
		// Desired EndPoint ?
		if (Req.url != G_DesiredGetEndPoint)
			return false;

		// Is GET ?
		if (Req.method != "GET")
			return false;

		// Response Write a JSON Hello World message
		SendStringResponse			(Req, Res, "OK", "Hello World");

		// OK !
		return ! false;
		};

	//---------------------------------------------------------------------------
	// IsPostQuantidade
	//---------------------------------------------------------------------------

	function IsPostQuantidade(Req, Res)
		{
		// Desired EndPoint ?
		if (Req.url != G_DesiredPostEndPoint)
			return false;

		// Is POST ?
		if (Req.method != "POST")
			return false;

		// Response Write a JSON POST QUANTIDADE (for debug purpose only)
		//	SendStringResponse		(Req, Res, "OK", "POST QUANTIDADE");
		//	return ! false;

		// The below statement avoids Res.end to be called on the Main function
		// Res.end will be called on OnEnd Event (below)
		Res.App_DoResEnd			=   false;

		// OnData
		Req.TotalData				= "";
		Req.on("data", function(ChunkData)
			{
			// For debug purpose
			//	Res.write			("<p>ChunkData.length:" + ChunkData.length);
			Req.TotalData		   += ChunkData;
			});

		// OnEnd
		Req.on("end", function()
			{
			// For debug purpose
			//	SendStringResponse	(Req, Res, "OK", "Req.TotalData = " + Req.TotalData);

			// Extracts quantidade
			var RE					= new RegExp("quantidade=([0-9]+)&", "g");	// Try as first or middle parameter
			var ArrResult			= RE.exec(Req.TotalData);
			if (ArrResult == null)
				{
				RE					= new RegExp("quantidade=([0-9]+)$", "g");	// Try as last parameter
				ArrResult			= RE.exec(Req.TotalData);
				}

			// Not Found ?
			if (ArrResult == null)
				{
				SendStringResponse	(Req, Res, "Error", "Invalid input positive number OR POST does not have [quantidade] parameter.");
				}
			else
				{
				var InputNumber		= Number(RegExp.$1);	// Casts no Number
				var ResultNumber	= 2 * InputNumber;		// Times 2 as an example
				SendStringResponse	(Req, Res, "OK", "InputNumber = " + InputNumber + ", ResultNumber = " + ResultNumber);
				}

			// end !
			Res.end					();
			});

		// OK !
		return ! false;
		};

//###########################################################################
//###########################################################################
