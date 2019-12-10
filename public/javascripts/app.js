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