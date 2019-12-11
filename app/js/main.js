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
var five = require("johnny-five");		
var board = new five.Board({
	repl: false		
});

var valueDiv = document.querySelector("#plantValue");

board.on("ready", function(){		
	var sensor = new five.Sensor({
		pin: "A0",
		freq: 250,
		threshold: 2
	});

	sensor.on("change", function(){
		var sensorInfo = this.value
		valueDiv.innerHTML = sensorInfo;
	});

});

// vue
var vm = new Vue({ 
    el: "#app", 
    data: {
        unit: "C",
        isCelcius: true, 
        temperature: 20 // placeholder temp
    }, 
    filters: {
        temperatureUnit(value) {
            return `${value}°`;
        }
    },
    methods: {
        toggleTemperature: function() {
            // toggle unit
            this.isCelcius =! this.isCelcius;
            this.unit = this.isCelcius ? "C" : "F";

            // change temperature
            this.temperature = this.isCelcius ? (this.temperature - 32) * 5/9 : (this.temperature * 9/5) + 32;
            return this.temperature;
        }
    }
});