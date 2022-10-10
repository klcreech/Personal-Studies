/*  JavaScript 6th Edition
    Chapter 10
    Chapter case

    Oak Top House
    Author: Creech
    Date:   3/16/20

    Filename: script.js
*/

"use strict";

// declare global variables for the setup page
var zIndexCounter;
var pos = [];
var origin;


// perform setup tasks when page first loads
function setUpPage() {
   document.querySelector("nav ul li:first-of-type").addEventListener("click", loadSetup, false);
   document.querySelector("nav ul li:last-of-type").addEventListener("click", loadDirections, false);
   
	var movableItems = document.querySelectorAll("#room div");
	zIndexCounter = movableItems.length + 1;
	
	for(var i = 0; i < movableItems.length; i++) {
		
		movableItems[i].addEventListener("mspointerdown", startDrag, false);
		movableItems[i].addEventListener("pointerdown", startDrag, false);
		
		if (movableItems[i].addEventListener) {
			movableItems[i].addEventListener("mousedown", startDrag, false);
			movableItems[i].addEventListener("touchstart", startDrag, false);
		} else if (movableItems[i].attachEvent) {
			movableItems[i].attachEvent("onmousedown", startDrag);
		}
	}
	
	// disable IE10+ interface gestures
	movableItems[i].style.msTouchAction = "none";
	movableItems[i].style.touchAction = "none";
	
}

// configure page to display Setup content
function loadSetup() {
   document.querySelector("nav ul li:first-of-type").className = "current";
   document.querySelector("nav ul li:last-of-type").className = "";
   document.getElementById("setup").style.display = "block";
   document.getElementById("location").style.display = "none";
   location.search = "";
}

// configure page to display Directions content
function loadDirections(string) {
   document.querySelector("nav ul li:first-of-type").className = "";
   document.querySelector("nav ul li:last-of-type").className = "current";
   document.getElementById("setup").style.display = "none";
   document.getElementById("location").style.display = "block";
}

// run setUpPage() function when page finishes loading
window.addEventListener("load", setUpPage, false);

// add eventlistenrs and move object
// when user starts dragging
function startDrag(evt) {
	//set z-index to move selected element on top of others
	this.style.zIndex = zIndexCounter;
	// set z-index counter so next selected item ison top of others
	zIndexCounter++;
	if (evt.type !== "mousedown") {
		evt.preventDefault();
		this.addEventListener("touchmove", moveDrag, false);
		this.addEventListener("mousepointermove", moveDrag, false);
		this.addEventListener("pointermove", moveDrag, false);
		this.addEventListener("touchend", removeTouchListener, false);
		this.addEventListener("mousepointerup", removeTouchListener, false);
		this.addEventListener("pointerup", removeTouchListener, false);
	} else {
		this.addEventListener("mousemove", moveDrag, false);
		this.addEventListener("mouseup", removeDragListener, false);
	}
	pos = [this.offsetLeft, this.offsetTop];
	origin = getCoords(evt);
}

// calcualtes nerw location of dragged object

function moveDrag(evt) {
	var currentPos = getCoords(evt);
	var deltaX = currentPos[0] - origin[0];
	var deltaY = currentPos[1] - origin[1];
	this.style.left = (pos[0]+ deltaX) + "px";
	this.style.top = (pos[1] + deltaY) + "px";
}

// identify location of object

function getCoords(evt) {
	var coords = [];
	if (evt.targetTouches && evt.targetTouches.length) {
		var thisTouch = evt.targetTouches[0];
		coords[0] = thisTouch.clientX;
		coords[1] = thisTouch.clientY;
	} else{
		coords[0] = evt.clientX;
		coords[1] = evt.clientY;
	}
	return coords;
}

// remove mouse event listeners when dragging ends

function removeDragListener() {
	this.removeEventListener("mousemove", moveDrag, false);
	this.removeEventListener("mouseup", removeDragListener, false);
}

// remove touch event listeners when dragging ends
function removeTouchListener() {
	this.removeEventListener("touchmove", moveDrag, false);
	this.removeEventListener("mousepointermove", moveDrag, false);
	this.removeEventListener("pointermove", moveDrag, false);
	this.removeEventListener("touchend", removeTouchListener, false);
	this.removeEventListener("mousepointerup", removeTouchListener, false);
	this.removeEventListener("pointerup", removeTouchListener, false);
}
	

	