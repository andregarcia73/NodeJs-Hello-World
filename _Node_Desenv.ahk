;===========================================================================
;===========================================================================
;==
;== Node Desenv - Para agilizar o desenvolvimento do Hello World Test
;== 25/09/19 - Aparentemente só funciona no IE
;==
;===========================================================================
;===========================================================================

#NoEnv ; Recommended for performance and compatibility with future AutoHotkey releases.
SendMode Input ; Recommended for new scripts due to its superior speed and reliability.

	;---------------------------------------------------------------------------
	; Globals vars
	;---------------------------------------------------------------------------

		G_WinName_Node				:= "C:\WINDOWS\system32\cmd.exe"
		G_WinName_AppTest			:= "Hello World Test"
		G_WinName_AppTest_GET_POST	:= "http://localhost:9000/MyEndPoint"

	;---------------------------------------------------------------------------
	; Show Error Msg
	;---------------------------------------------------------------------------

	ShowError(MsgToShow)
		{
		global
		; 4112 (abaixo) = 4096 (MODAL) + 16 (Icon Hand (stop/error))
		MsgBox, 4112, %ProgramCaption%, %MsgToShow%, 0
		}

	;---------------------------------------------------------------------------
	; WindowFocus
	;---------------------------------------------------------------------------

	WindowFocus(WinName)
		{
		global

		if ! WinExist(WinName)
			{
			; ShowError("Não existe a janela: " WinName)
		    return false
			}

		WinActivate, %WinName%

		;	WinWaitActive, Untitled - Notepad, , 2
		WinWaitActive, %WinName%, , 2
		if ErrorLevel
			{
			ShowError("A janela não foi ativada: " WinName)
			return false
			}
		return true
		}

	;---------------------------------------------------------------------------
	; Go !
	;---------------------------------------------------------------------------

	Go()
		{
		global
		;	ShowError("Go !")

		if WindowFocus(G_WinName_Node)
			{
			Send, {CTRLDOWN}C{CTRLUP}
			Sleep, 1000
			Send, N{ENTER}
			}

		if WindowFocus(G_WinName_AppTest)
			{
			Send, {F5}
			}

		if WindowFocus(G_WinName_AppTest_GET_POST)
			{
			Send, {ALTDOWN}{LEFT}{ALTUP}
			Send, {F5}
			}
		}

	;---------------------------------------------------------------------------
	; Main Method
	;---------------------------------------------------------------------------

	Main()
		{
		global
		Go()
		}

	;---------------------------------------------------------------------------
	; Main Program
	;---------------------------------------------------------------------------

	#z::Reload
	#a::Main()

;===========================================================================
;===========================================================================
