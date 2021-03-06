var resultItems;
var navigationPrevious;
var navigationNext;
var newTabDefault;

function setUpKeyEvents() {
	setUpResultItemKeyEvents();
	setUpPageNavigationKeyEvents();
}

function setUpResultItemKeyEvents() {
	resultItems = document.querySelectorAll(".g .r .l");
	var n = resultItems.length;
	if(n > 10) {
		n = 10;
	}
	for(var i = 0; i < n; i++) {
		var numberLabel = document.createElement("span");
		numberLabel.className = "Mafuyu_numberLabel";
    var unicodeNum = 0x2488 + i; 
    numberLabel.appendChild(document.createTextNode(String.fromCharCode(unicodeNum)));
		resultItems[i].parentNode.appendChild(numberLabel);
	}
}

function setUpPageNavigationKeyEvents() {
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
	if(keyEvent.altKey || keyEvent.metaKey) {
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
		eventTarget = resultItems[i];
	}
	if(eventTarget) {
		var mouseEvent = document.createEvent("MouseEvent");
    var modifierKey = newTabDefault ? !keyEvent.ctrlKey : keyEvent.ctrlKey;
		mouseEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, modifierKey, 0, null);
		eventTarget.dispatchEvent(mouseEvent);
	}
}

function didKeyDownInField(keyEvent) {
	if(keyEvent.keyCode == 27) { // 27 == ESC
		keyEvent.target.blur();
	}
}

function disableNavigation() {
	document.removeEventListener("keypress", didKeyPress, false);
	document.querySelectorAll('.lst[name="q"]')[0].addEventListener("keydown", didKeyDownInField, false);
}

function enableNavigation() {
	document.addEventListener("keypress", didKeyPress, false);
	document.querySelectorAll('.lst[name="q"]')[0].removeEventListener("keydown", didKeyDownInField, false);
}

setUpKeyEvents();
enableNavigation();
var inputs = document.getElementsByTagName("input");
for(var i = 0; i < inputs.length; i++) {
	inputs[i].addEventListener("focus", disableNavigation);
	inputs[i].addEventListener("blur", enableNavigation);
}

function waitForSettingValue(event) {
  switch (event.name) {
    case "settingValue":
      newTabDefault = event.message;
      break;
    default:
      break;
  }
}

safari.self.addEventListener("message", waitForSettingValue, false);
safari.self.tab.dispatchMessage("getSettingValue", "newTabDefault");
