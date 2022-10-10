/*    JavaScript 6th Edition
 *    Chapter 5
 *    Chapter case

 *    Photo zoom
 *    Variables and functions
 *    Author: Kerry Creech
 *    Date:  Jan 2020

 *    Filename: zoom.js
 */

"use strict"; // interpret document contents in JavaScript strict mode

/* global variables */
var photoOrderArray = window.opener.photoOrder;
var figFilename = "images/IMG_0" + photoOrderArray[2] + ".jpg";

/* populate img element and create event listener */
function pageSetup() {
   document.getElementsByTagName("img")[0].src = figFilename; // assign filename to img element
createEventListener()
}

/* add img src value and create event listener when page finishes loading */
window.onload = pageSetup;

/* close window */

function closeWin() { window.close(); }

/* create event listener for close button */

function createEventListener() {

var closeWindowDiv = document.getElementsByTagName("p")[0];
   
   if (closeWindowDiv.addEventListener) {
      closeWindowDiv.addEventListener("click", closeWin, false);
      }

   else if ( closeWindowDiv.attachEvent) {
            closeWindowDiv.attachEvent("onclick", closeWin);
            }

}

