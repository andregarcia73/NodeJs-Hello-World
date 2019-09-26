# NodeJs-Hello-World

This is a NodeJS Hello World application using HTTP Server.

## Files description

### `README.md`

Is this file.

---
 
### `HelloWorld.js`

Is the main application.

For development purposes, run in your computer:

`$ node HelloWorld.js`

You should see in your console:

`Server listening on Port: 9000`

GET

	Open a browser in your computer then type (double-click on _AppTest.html and experience)

		http://localhost:9000/MyGetEndPoint

	You should see:

		{"RequestEndPoint":"/MyGetEndPoint", "RequestMethod":"GET", "RequestServerDateTime":"...", "ResponseStatus":"OK", "ResponseMessage":"Hello World"}

POST

	Post a message in

		http://localhost:9000/MyPostEndPoint (double-click on _AppTest.html and experience)

		with desired "quantidade" parameter (accepts only positive integer values)

	You should see:
		{"RequestEndPoint":"/MyPostEndPoint", "RequestMethod":"POST", "RequestServerDateTime":"...", "ResponseStatus":"OK", "ResponseMessage":"InputNumber = NNN, ResultNumber = 2 * NNN"}

You can try those requests in:

[https://nodejshelloworld.docs.apiary.io/#](https://nodejshelloworld.docs.apiary.io/#)

---

### `README.apib.md`

Is the file published in https://apiary.io/ that allows you to
simulate the above requests.

[https://nodejshelloworld.docs.apiary.io/#](https://nodejshelloworld.docs.apiary.io/#)

---

### `_AppTest.html`

Is a html page that you can simulate GET and POST requests by yourself.

You can simple double-click on it and experience.

---

### `package.json`

### `gitingore`

### `_Push_Heroku.bat`

Are files used to publish the application on:

[https://www.heroku.com/](https://www.heroku.com/)

This application is published on the URL:

[https://pure-depths-91789.herokuapp.com](https://pure-depths-91789.herokuapp.com)

---

### `_Console_Cmd.bat`

### `_Console_Node.bat`

### `_Node_Desenv.ahk`

Are files for development purposes only.




