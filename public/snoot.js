/*  Chapter 6

*	Snoot Flowers - Alternate Version
*	Author:
*	Date:
*	Purpose: To add functions for the Snoot's flowers order form.

*	Filename:  snoot.js
*/

"use strict";  //interprets JavaScript commands as a strictly typed language

/* Code to set the dropdown selection boxes (states & date fields) to -1, effectively closing them  Ref:  pp 373-374  */
function removeSelectDefaults() {
  /* global variables */
var formValidity = true;   //this is a BOOLEAN FLAG used to control custom validation on the form 
  
  var emptyBoxes = document.getElementsByTagName("select");  //creates an array of all the selection box elements (step 5)
   for (var i = 0; i < emptyBoxes.length; i++) {  //loop through the selection box collection (step 6)
      emptyBoxes[i].selectedIndex = -1;  //whatever the current box is; set it to -1 (step 7)
   }
}



/* automatically check the Custom message check box if user makes an entry in the customText box note use of && logic operators:  the whole statement must be true (rather than individual parts) */

  function autocheckCustom() {
    var messageBox = document.getElementById("customText");
    if (messageBox.value !== "" && messageBox.value !== messageBox.placeholder) {
      //if the user has made an entry in the custom text box, check the corresponding checkbox
      document.getElementById("custom").checked = "checked";
    }
  }

  function createEventListeners() {
     var messageBox = document.getElementById("customText");
     if (messageBox.addEventListener) {
       messageBox.addEventListener("blur", autocheckCustom, false); 
     } else if (messageBox.attachEvent)  {
       messageBox.attachEvent("onblur", autocheckCustom); 
     }
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

/* run the setup tasks when the page finishes loading Ref:  pp 374, step 8  */
if (window.addEventListener) {
  window.addEventListener("load", removeSelectDefaults, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", removeSelectDefaults);
}

 /* copy Billing Address values to Delivery Address fields when the user checks the duplicate checkbox */
      function copyBillingAddress() {
        var billingInputElements = document.querySelectorAll("#billingAddress input");
        var deliveryInputElements = document.querySelectorAll("#deliveryAddress input");
        //check to make sure the "sameAddr" checkbox is checked
        if (document.getElementById("sameAddr").checked) {
          for (var i = 0; i < billingInputElements.length; i++) {
            //write the billingInputElement value to the corresponding field in the deliveryInputElements
            //note that the counter is incremented by 1 b/c the sameAddr checkbox adds a field at the
            //beginning of the fieldset.
            deliveryInputElements[i + 1].value = billingInputElements[i].value;
          }
          //makes sure the state value is set properly!
          document.querySelector("#deliveryAddress select").value = document.querySelector("#billingAddress select").value;
        } else {
          for (var i = 0; i < billingInputElements.length; i++) {
            //the user must have deselected the option for the same address, so set all the
            //delivery fields back to null values
            deliveryInputElements[i + 1].value = "";
          }
          //don't forget to set the state selection box back to zero!
          document.querySelector("#deliveryAddress select").selectedIndex = -1;
        }
      }

    /* validate form */
function validateForm(evt) {     //pg. 405 step 3-->receives the parameter "evt"--the submit event
  if (evt.preventDefault) {
    evt.preventDefault(); //prevent form from submitting and returning the results form
  }
  formValidity = true; //reset the value for revalidation

//_____________________________________________________________________
/* In this section, we create calls to validation functions
    --these are added one by one to illustrate different validation use cases (step 5) */
//______________________________________________________________________	
if (formValidity===true) {
    //reset the error messages so they are invisible to the user and submit the form
    document.getElementById("errorText").innerHTML = "";
    document.getElementById("errorText").style.display = "none";
    document.getElementsByTagName("form")[0].submit();
  } else {
    //if there is one or more errors, scroll up to the top where there is a generic error message displayed (errorText)
  document.getElementById("errorText").innerHTML = "Please fix the indicated problems and resubmit your order.";
  document.getElementById("errorText").style.display = "block";
  scroll(0,0);
  }

