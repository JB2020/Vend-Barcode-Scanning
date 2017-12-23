/*
 *  Injects the Campus Trading barcode reader into Vend's webregister UI.  This file loads and saves the settings.
 *  Copyright Campus Trading, 2017
*/


'use strict';

var j = document.createElement('script'),
	s = document.createElement('script'),
	b = document.createElement('script'),
    l = document.createElement('link');

j.src = chrome.extension.getURL('jquery.min.js');
(document.head || document.documentElement).appendChild(s);

s.src = chrome.extension.getURL('script.js');
(document.head || document.documentElement).appendChild(s);

b.src = chrome.extension.getURL('barcode_detection.js');
(document.head || document.documentElement).appendChild(s);

j.onload = function () {
    j.parentNode.removeChild(s);
};

s.onload = function () {
    s.parentNode.removeChild(s);
};

b.onload = function () {
    b.parentNode.removeChild(s);
};