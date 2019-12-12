
(function(){
    "use strict";
    var humidityDoughnut = document.querySelector("#humidityDoughnut");
    var lightDoughnut = document.querySelector("#lightDoughnut");
    var data = [1, 10];//, 2, 3
    var labels = ["1"];//, "2", "3"
    var backgroundColor = ["#24343b", "#f8f8f8"];//,]; "#d49b29",

    Chart.defaults.scale.ticks.beginAtZero = true;
    function generateChart(data, labels, chartDOM, backgroundColor, borderColor){
        return new Chart(chartDOM, {
            type: 'pie', 
                data: {
                    labels: labels,
                    datasets: [
                    { 
                        data: data,
                        backgroundColor: backgroundColor, 
                        borderColor: borderColor, 
                    }
                ]    
            }, options: {
                cutoutPercentage: 80, 
                animation: {
                    animateScale: true
                }
            }, 
            centerText: {
                display: true,
                text: data[0] //placeholder
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

    var humidityDoughnutChart = generateChart(data, labels, humidityDoughnut, backgroundColor, backgroundColor);
    var lightDoughnutChart = generateChart(data, labels, lightDoughnut, backgroundColor, backgroundColor);

    // placeholder
    data = [1,2,3,2,4,1,2];
    labels = ["1","2","3","2","4","1","2"];
    humidityLineChart = document.querySelector("#lineChart");
    
    // var lineChartArea = generateChart(data, labels, humidityLineChart, "rgba(255, 255, 255, 0)", backgroundColor[0]);

    // var lineChart = new Chart(lineChartArea, {
    //     type: 'line', 
    //         data: {
    //             labels: labels,
    //             datasets: [
    //             { 
    //                 data: data,
    //                 borderColor: backgroundColor[0], 
    //                 backgroundColor: "rgba(255, 255, 255, 0)"
    //             }
    //         ]
    //     }, options: {
    //         animation: {
    //             animateScale: true
    //         }, 
    //         scales: {
    //             xAxes: [{
    //                 gridLines: {
    //                     display: true
    //                 },
    //                 display: false,
    //             }],
    //             yAxes: [{
    //                 gridLines: {
    //                     display: true
    //                 },
    //                 display: false,
    //             }]
    //         }
    //     }
    // });
})();