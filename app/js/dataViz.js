
(function(){
    "use strict";
    var chartArea = document.querySelector("#doughnutChart");
    var data = [1, 2, 3];
    var labels = ["1", "2", "3"];
    var backgroundColor = ["#d49b29", "#24343b", "#f8f8f8"];
    var doughnutChart = new Chart(chartArea, {
        type: 'pie', 
            data: {
                labels: labels,
                datasets: [
                { 
                    data: data,
                    backgroundColor: backgroundColor
                }
            ]    
        }, options: {
            cutoutPercentage: 80, 
            animation: {
                animateScale: true
            }
        }
    });

    var lineChartArea = document.querySelector("#lineChart");
    Chart.defaults.scale.ticks.beginAtZero = true;
    data = [1,2,3,2,4,1,2];
    labels = ["1","2","3","2","4","1","2"];
    var lineChart = new Chart(lineChartArea, {
        type: 'line', 
            data: {
                labels: labels,
                datasets: [
                { 
                    data: data,
                    borderColor: backgroundColor[0], 
                    backgroundColor: "rgba(255, 255, 255, 0)"
                }
            ]
        }, options: {
            animation: {
                animateScale: true
            }, 
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
        }
    });
})();