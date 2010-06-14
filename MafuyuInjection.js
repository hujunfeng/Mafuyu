var searchResults;
var navigationPrevious;
var navigationNext;

function setUpKeyEvents() {
	searchResults = document.querySelectorAll(".g .r .l");
	for(var i = 0; i < searchResults.length; i++) {
		var numberLabel = document.createElement("span");
		numberLabel.className = "Mafuyu_numberLabel";
		var num = i + 1;
		if(num == 10) num = 0;
		numberLabel.appendChild(document.createTextNode(num));
		searchResults[i].parentNode.appendChild(numberLabel);
	}
	var navs = document.querySelectorAll(".b .pn");
	if(navs.length == 2) {
		navigationPrevious = navs[0];
		navigationNext = navs[1];
	}
	else {
		var nav = navs[0];
		if(nav.style.textAlign == "left") {
			navigationNext = nav;
		}
		else {
			navigationPrevious = nav;
		}
	}
}

function didKeyPress(keyEvent) {
	if(keyEvent.altKey || keyEvent.metaKey || keyEvent.ctrlKey) {
		return false;
	}
	var eventTarget = null;
	if(keyEvent.keyCode == 105) { // 105 == 'i'
		document.querySelectorAll('.lst[name="q"]')[0].focus();
		keyEvent.preventDefault();
	}
	else if(keyEvent.keyCode == 110) { // 110 == 'n'
		eventTarget = navigationNext;
	}
	else if(keyEvent.keyCode == 112) { // 112 == 'p'
		eventTarget = navigationPrevious;
	}
	else {
		var i = keyEvent.keyCode - 48 - 1; // 48 == '0'
		if(i == -1) i = 9;
		eventTarget = searchResults[i];
	}
	if(eventTarget) {
		var mouseEvent = document.createEvent("MouseEvent");
		mouseEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		eventTarget.dispatchEvent(mouseEvent);
	}
}

function disable() {
	document.removeEventListener("keypress", didKeyPress, false);
}

function enable() {
	document.addEventListener("keypress", didKeyPress, false);
}

setUpKeyEvents();
enable();
var inputs = document.getElementsByTagName("input");
for(var i = 0; i < inputs.length; i++) {
	inputs[i].addEventListener("focus", disable);
	inputs[i].addEventListener("blur", enable);
}