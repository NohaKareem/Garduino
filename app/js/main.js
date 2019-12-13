
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

var humidityDoughnut = document.querySelector("#humidityDoughnut"),  
        lightDoughnut = document.querySelector("#lightDoughnut");

var hydrometerLineChart = document.querySelector("#lineChart");

var hydrometerCurrReadingCon = document.querySelector("#humidityCurrReading"),
        temperatureCurrReadingCon = document.querySelector("#temperatureCurrReading"), 
        lightCurrReadingCon = document.querySelector("#lightCurrReading"); 

var hydrometerCurrReading = 0, temperatureCurrReading = 0, lightCurrReading = 0;

// placeholder line chart data ~
var data = [1,2,3,2,4,1,2], labels = ["1","2","3","2","4","1","2"];
var backgroundColor = ["#24343b", "#f8f8f8"];

// start line chart at zero and remove legend 
Chart.defaults.scale.ticks.beginAtZero = true
Chart.defaults.global.legend.display = false;

// generate line/doughnut chart and return chart object
function generateChart(chartType, dataVal, labels, chartDOM, backgroundColor, borderColor, title){
    return new Chart(chartDOM, {
        type: chartType, 
            data: {
                labels: labels,
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
                        text: title
                    }
        }, 
        centerText: {
            display: true,
            text: dataVal
        }, 
        // line chart settings
        scales: {
            xAxes: [{
                gridLines: {
                    display: true
                },
                display: false,
            }],
            yAxes: [{
                gridLines: {
                    display: true
                },
                display: false,
            }]
        }
    });
}

// update chart data 
function updateChartData(chart, updatedVals) {
        chart.data.datasets[0].data = updatedVals;
        chart.update();
}

function returnPercentage(sensorData) {
        return (1023 /(sensorData * 100 /1023)).toFixed(2);
}

var humidityDoughnutChart = generateChart('pie', [0, 100], labels, humidityDoughnut, backgroundColor, backgroundColor, "Moisture");
var lightDoughnutChart = generateChart('pie', [0, 100], labels, lightDoughnut, backgroundColor, backgroundColor, "Light");

var lineChartArea = generateChart('line', data, labels, hydrometerLineChart, "rgba(255, 255, 255, 0)", backgroundColor[0], "Moisture");

breadboard.on("ready", function(){                
    
    var hydrometer = new johnnyFive.Sensor({
                pin: "A0",
                freq: 250,
                threshold: 2
        }), 
        photoresistor = new johnnyFive.Sensor({
        pin: "A4", 
        freq: 250
    }), 
        temperatureSensor = new johnnyFive.Thermometer({
        controller: "LM35", 
        pin: "A2"
    });         

    // update html data reading display and chart  
        hydrometer.on("change", function(){
                // mapping values to 100% using johnny-five API 
                hydrometerCurrReading = this.scaleTo(100, 0);
                hydrometerCurrReadingCon.innerHTML = hydrometerCurrReading + "%";
                updateChartData(humidityDoughnutChart, [hydrometerCurrReading, 100 - hydrometerCurrReading]); //~
        });

        photoresistor.on("data", function(){
                lightCurrReading = this.scaleTo(100, 0);
                lightCurrReadingCon.innerHTML = lightCurrReading + "%";
                updateChartData(lightDoughnutChart, [lightCurrReading, 100 - lightCurrReading]); //~
        });

        temperatureSensor.on("change", function(){
        // console.log(this.celsius + "C", this.fahrenheit + "F"); //~
        temperatureCurrReadingCon.innerHTML = this.celsius + "°C";
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