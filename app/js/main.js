//Johnny-Five uses process.stdin, which is not available for Electron's use. 
//This causes Electron's render process to crash! 
//We can reroute process.stdin to a compatible replacement stream though

//process.stdin is Node's way of getting data that's passed into it from outside. 
//stdin , short for “standard in”, is the path by which we can pass data into an application. 
//This is usually text data that the user has typed, but it can also come from another application.

var Readable = require("stream").Readable;  
var util = require("util");  
util.inherits(MyStream, Readable);  
function MyStream(opt) {  
  Readable.call(this, opt);
}
MyStream.prototype._read = function() {};  
// hook in our stream
process.__defineGetter__("stdin", function() {  
  if (process.__stdin) return process.__stdin;
  process.__stdin = new MyStream();
  return process.__stdin;
});

// johnny-five
var johnnyFive = require("johnny-five");		
var breadboard = new johnnyFive.Board({
	repl: false		
});

var displayCon = document.querySelector("#johnnyFiveData");

breadboard.on("ready", function(){		
        console.log("change")
        var sensor = new johnnyFive.Sensor({
		pin: "A0",
		freq: 250,
		threshold: 2
	});

	sensor.on("change", function(){
        console.log("change")
		var hydrometerData = this.value
		displayCon.innerHTML = hydrometerData;
	});
});

// vue
// var vm = new Vue({ 
//     el: "#app", 
//     data: {
//         unit: "C",
//         isCelcius: true, 
//         temperature: 20 // placeholder temp
//     }, 
//     filters: {
//         temperatureUnit(value) {
//             return `${value}°`;
//         }
//     },
//     methods: {
//         toggleTemperature: function() {
//             // toggle unit
//             this.isCelcius =! this.isCelcius;
//             this.unit = this.isCelcius ? "C" : "F";

//             // change temperature
//             this.temperature = this.isCelcius ? (this.temperature - 32) * 5/9 : (this.temperature * 9/5) + 32;
//             return this.temperature;
//         }
//     }
// });

(function () {
	"use strict";

var bmIcon = document.querySelector("#bmIcon");
var burgerMenuList = document.querySelector("#burgerMenu");
var mblNavLinks = document.querySelectorAll("#burgerMenuList li a");


function burgerMenu(e) {
	burgerMenuList.classList.toggle("hidden");
	bmIcon.classList.toggle("menuExpanded");
}

bmIcon.addEventListener("click", burgerMenu, false);

for (var i = 0; i < mblNavLinks.length; i++) {
	mblNavLinks[i].addEventListener("click", smoothScroll, false);
	dsktpNavLinks[i].addEventListener("click", smoothScroll, false);
}
})();