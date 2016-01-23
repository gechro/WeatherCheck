var forecast = require("./forecast");
var weather = process.argv.slice(2);
weather.forEach(forecast.report);