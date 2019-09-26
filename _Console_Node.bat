:LOOP
cls
node HelloWorld.js
if %ERRORLEVEL% == 1 pause
goto LOOP
