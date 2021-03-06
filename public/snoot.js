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


 /* validate create account fieldset */
function validateCreateAccount() {
   var errorDiv = document.querySelector("#createAccount .errorMessage");
   var usernameElement = document.getElementById("username");
   var pass1Element = document.getElementById("pass1");
   var pass2Element = document.getElementById("pass2");
   var passwordMismatch = false;     //Boolean flag for ensuring that entered passwords match
   var invColor = "rgb(255,233,233)";
   try {
      // reset styles to valid state
      usernameElement.style.background = "";
      pass1Element.style.background = "";
      pass2Element.style.background = "";  
      errorDiv.style.display = "none";       
      // 1.  Check that all the fields are filled   
      if ((usernameElement.value !== "" && pass1Element.value !== "" && pass2Element.value !== "")) {
         // 2.  If both are filled, do the passwords match?
         if (pass1Element.value !== pass2Element.value) { 
            passwordMismatch = true;   // passwords don't match
            throw "Passwords entered do not match; please reenter.";
         } 
      }

       /*Note that if all of the fields are blank, we assume the user did not want to create an account
         thereby bypassing the error validation code */
      else if (!(usernameElement.value === "" && pass1Element.value === "" && pass2Element.value === "")) {
         // not all fields are blank
         throw "Please complete all fields to create an account.";
      } 

   }
   catch(msg) {
      errorDiv.innerHTML = msg;
      errorDiv.style.display = "block";
      if (passwordMismatch) {
         usernameElement.style.background = "";
         pass1Element.style.background = invColor;
         pass2Element.style.background = invColor;         
      } else {
         if (usernameElement.value === "") {
            usernameElement.style.background = invColor;
         }
         if (pass1Element.value === "") {
            pass1Element.style.background = invColor;
         }
         if (pass2Element.value === "") {
            pass2Element.style.background = invColor;
         }
      }
      formValidity = false;
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
  
  validateAddress("billingAddress");    //adds the two functions to the validateForm() function  (see step 4 on page 412) 
   validateAddress("deliveryAddress");   //note that both fieldsets are checked with different parameters
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

function validatePayment() {
   var fieldsetValidity = true;    //this sets up a Boolean flag to control this section
   var errorDiv = document.querySelector("#paymentInfo .errorMessage");
   var ccNumElement = document.getElementById("ccNum");
   var selectElements = document.querySelectorAll("#paymentInfo select");
   var elementCount = selectElements.length;
   var cvvElement = document.getElementById("cvv");
   var cards = document.getElementsByName("PaymentType");
   var currentElement;
   try { 
       //1.  Start by determining whether any of the option buttons have been selected (checked)
      if (!cards[0].checked && !cards[1].checked && !cards[2].checked && !cards[3].checked) { 
         // if none are selected, outline all of the card option buttons in red and set the fieldsetValidity flag to false
         for (i = 0; i < 4; i++) {
            cards[i].style.outline = "1px solid red";
         }
         fieldsetValidity = false;     //Boolean flag is false to trip the error handling code
      } else {
         for (i = 0; i < 4; i++) {
            cards[i].style.outline = "";
         }
      }

       //2. Now, verify that a number is entered--note that it does not validate the credit card number itself
      if (ccNumElement.value === "") { 
         ccNumElement.style.background = "rgb(255,233,233)";
         fieldsetValidity = false;
      } else {
         ccNumElement.style.background = "white";
      }
        // 3.  Verify that a month and year have been selected
      for (var i = 0; i < elementCount; i++) {

         currentElement = selectElements[i];
         if (currentElement.selectedIndex === -1) {
            currentElement.style.border = "1px solid red";
            fieldsetValidity = false;
         } else {
            currentElement.style.border = "";
         }
      }
       // 4.  Did the customer type in a value in the CVV field?  Note again, that the number itself is not validated
      if (cvvElement.value === "") { 
         cvvElement.style.background = "rgb(255,233,233)";
         fieldsetValidity = false;
      } else {
         cvvElement.style.background = "white";
      }

       //5.  If fieldsetValidity IS NOT TRUE for any reason--this is the error message to throw
      if (!fieldsetValidity) { 
         throw "Please complete all payment information.";
      } else {
         errorDiv.style.display = "none";
      }
   }
   catch(msg) {
      errorDiv.style.display = "block";
      errorDiv.innerHTML = msg;
      formValidity = false;
   }
}