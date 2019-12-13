
//Johnny-Five uses process.stdin, which is not available for Electron's use. 
//This causes Electron's render process to crash! 
//We can reroute process.stdin to a compatible replacement stream though

//process.stdin is Node's way of getting data that's passed into it from outside. 
//stdin , short for “standard in”, is the path by which we can pass data into an application. 
//This is usually text data that the user has typed, but it can also come from another application.

        // var Readable = require("stream").Readable;  
        // var util = require("util");  
        // util.inherits(MyStream, Readable);  
        // function MyStream(opt) {  
        // Readable.call(this, opt);
        // }
        // MyStream.prototype._read = function() {};  
        // // hook in our stream
        // process.__defineGetter__("stdin", function() {  
        // if (process.__stdin) return process.__stdin;
        // process.__stdin = new MyStream();
        // return process.__stdin;
        // });

// johnny-five
        // var johnnyFive = require("johnny-five");                
        // var breadboard = new johnnyFive.Board({
        //         repl: false                
        // });

var humidityDoughnut = document.querySelector("#humidityDoughnut"),  
        lightDoughnut = document.querySelector("#lightDoughnut");

var hydrometerLineChart = document.querySelector("#hydrometerLineChart"), 
    temperatureLineChart = document.querySelector("#temperatureLineChart"),
    lightLineChart = document.querySelector("#lightLineChart");

var hydrometerCurrReadingCon = document.querySelector("#humidityCurrReading"),
        temperatureCurrReadingCon = document.querySelector("#temperatureCurrReading"), 
        lightCurrReadingCon = document.querySelector("#lightCurrReading"); 

var hydrometerCurrReading = 0, temperatureCurrReading = 0, lightCurrReading = 0;

// placeholder line chart data ~
var tempData = [20,40,10,20,5,10,23], tempLabels = ["Dec-1","Dec-2","Dec-3","Dec-4","Dec-5","Dec-6","Dec-7"];
var backgroundColor = ["#24343b", "#f8f8f8"];

// start line chart at zero and remove legend 
// Chart.defaults.scale.ticks.beginAtZero = true;
Chart.defaults.global.legend.display = false;

// generate line/doughnut chart and return chart object
function generateChart(chartType, dataVal, chartDOM, backgroundColor, borderColor, title){
    return new Chart(chartDOM, {
        type: chartType, 
            data: {
                // labels: labels, //~
                datasets: [
                { 
                    data: dataVal,
                    backgroundColor: backgroundColor, 
                    borderColor: borderColor, 
                }
            ]    
        }, options: {
            cutoutPercentage: 80, 
            animation: {
                animateScale: true
            }, 
            title: {
                display: true,
                text: title, 
                position: 'bottom'
            }
        }, 
        // line chart settings
        scales: {
            xAxes: [{
                display: false,
                gridLines: {
                    display: false
                },
            }],
            yAxes: [{
                display: false,
                gridLines: {
                    display: false
                },
            }]
        }
    });
}

// update chart data 
function updateChartData(chart, updatedVals) {
        chart.data.datasets[0].data = updatedVals;
        chart.update();
}

var humidityDoughnutChart = generateChart('pie', [50, 50], humidityDoughnut, backgroundColor, backgroundColor, "Moisture");
var lightDoughnutChart = generateChart('pie', [50, 50], lightDoughnut, backgroundColor, backgroundColor, "Light");

var hydroLineChartCon = generateChart('line', tempData, hydrometerLineChart, "rgba(255, 255, 255, 0)", backgroundColor[0], "Moisture");
var tempLineChartCon = generateChart('line', tempData, temperatureLineChart, "rgba(255, 255, 255, 0)", backgroundColor[0], "Temperature");
var lightLineChartCon = generateChart('line', tempData, lightLineChart, "rgba(255, 255, 255, 0)", backgroundColor[0], "Light");


// placeholder data ~~
temperatureCurrReadingCon.innerHTML = "21°C";
hydrometerCurrReadingCon.innerHTML = "5%";
lightCurrReadingCon.innerHTML = "55%";
// placeholder data ~~

            // breadboard.on("ready", function(){                
            //     var hydrometer = new johnnyFive.Sensor({
            //                 pin: "A0",
            //                 freq: 250,
            //                 threshold: 2
            //         }), 
            //         photoresistor = new johnnyFive.Sensor({
            //         pin: "A4", 
            //         freq: 250
            //     }), 
            //         temperatureSensor = new johnnyFive.Thermometer({
            //         controller: "LM35", 
            //         pin: "A2"
            //     });         

            //     // update html data reading display and chart  
            //     hydrometer.on("change", function(){
            //             // mapping values to 100% using johnny-five API 
            //             hydrometerCurrReading = this.scaleTo(100, 0);
            //             hydrometerCurrReadingCon.innerHTML = hydrometerCurrReading + "%";
            //             updateChartData(humidityDoughnutChart, [hydrometerCurrReading, 100 - hydrometerCurrReading]); 
            //     });

            //     photoresistor.on("data", function(){
            //             lightCurrReading = this.scaleTo(100, 0);
            //             lightCurrReadingCon.innerHTML = lightCurrReading + "%";
            //             updateChartData(lightDoughnutChart, [lightCurrReading, 100 - lightCurrReading]); 
            //     });

            //     temperatureSensor.on("change", function(){
            //         temperatureCurrReadingCon.innerHTML = this.celsius + "°C";
            //     });
            // });

// // vue
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

function burgerMenu(e) {
	burgerMenuList.classList.toggle("hidden");
	bmIcon.classList.toggle("menuExpanded");
}


function smoothScroll(e) {
	e.preventDefault();
	var href = e.currentTarget.dataset.url;
	TweenLite.to(window, 1, { scrollTo: { y: "#" + href, offsetY: 3, autoKill: false } });
}

bmIcon.addEventListener("click", burgerMenu, false);

for (var i = 0; i < mblNavLinks.length; i++) {
	mblNavLinks[i].addEventListener("click", smoothScroll, false);
}
    bmIcon.addEventListener("click", burgerMenu, false);

    for (var i = 0; i < mblNavLinks.length; i++) {
        mblNavLinks[i].addEventListener("click", smoothScroll, false);
        dsktpNavLinks[i].addEventListener("click", smoothScroll, false);
    }
})();
