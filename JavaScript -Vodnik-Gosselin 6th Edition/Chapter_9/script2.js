
   /* JavaScript 6th Edition
      Chapter 9
      Chapter case

      Eating Well in Season order page
      Author: Creech
      Date:   3/1/20

      Filename: script2.js */

"use strict";

var queryArray = [];

function populateInfo() {
	if (location.search) {
		var queryData = location.search;
		var hiddenInputs = document.querySelectorAll("input[type=hidden]");
		queryData = queryData.substring(1, queryData.length);
		queryArray = queryData.split("&");
		
		for (var i = 0; i < queryArray.length; i++) {
			hiddenInputs[i].value = queryArray[i].substring(queryArray[i].lastIndexOf("=") + 1);
		}	
	}
}
function createCookies() {
	var formFields = document.querySelectorAll("input[type=hidden], input[type=radio], textarea");
	var expiresDate = new Date();
	expiresDate.setDate(expiresDate.getDate() + 7);
	
	for (var i = 0; i < formFields.length; i++) {
		var currentValue = decodeURIComponent(formFields[i].value);
		currentValue = currentValue.replace(/.\+/g, " ");
		document.cookie = formFields[i].name + "=" + currentValue + "; expires=" + expiresDate.toUTCString();
	}
}	
function handleSubmit (evt) {
	if (evt.preventDefault) {
		evt.preventDefault(); // prevent form from submitting
	} else {
		evt.returnValue = false; // prevent form from submitting in IE8
	}
	createCookies();
	document.getElementsByTagName("form")[0].submit();
}

function createEventListeners() {
	var form = document.getElementsByTagName("form")[0];
	if (form.addEventListener) {
		form.addEventListener("submit", handleSubmit, false);
	} else if (form.attachEvent) {
		form.attachEvent("onSubmit", handleSubmit);
	}
	
}
function setUpPage(){
	createEventListeners();
	populateInfo();
}


if (window.addEventListener) {
	window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", setUpPage);
}

