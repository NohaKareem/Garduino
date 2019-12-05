
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

})();