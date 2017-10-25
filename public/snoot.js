/*  Chapter 6

*	Snoot Flowers - Alternate Version
*	Author:
*	Date:
*	Purpose: To add functions for the Snoot's flowers order form.

*	Filename:  snoot.js
*/

"use strict";  //interprets JavaScript commands as a strictly typed language




//createEventListeners is used to drive the various validation functions
function createEventListeners() {
	
}


/* call the event listeners as part of the page set up Ref:  pg. 380  step 11*/
function setUpPage() {
	//removeSelectDefaults();
	createEventListeners();
}

/* run the setup tasks when the page finishes loading Ref:  pp 374, step 8  */
if (window.addEventListener) {
	window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", setUpPage);
}

