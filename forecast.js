//weather API vars
var API_KEY = "57c066df3ae1b798ef75801b24350b86";
// HTTP request
var http = require("http");

//get weather icon image
function getIcon(iconId){
 var iconURL = "http://openweathermap.org/img/w/" +iconId+ ".png";
  return iconURL;
}

//Print Forecast
function printForecast(city, mainWeather, temp){
  console.log(city);
  console.log(mainWeather);
  console.log(temp);
}

//Print Error Message(s)
function printError(error){
    console.error(error.message);
}

//Kelvin to Farenheit
function kToFar(kelvin){
  var f = Math.round(kelvin * 9/5 -459.67);
  return f;
}
//The magic lies here

  function report(zip) {
   //Connect to API URL
   var request = http.get("http://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us&APPID=" +API_KEY, function(response){
    var body = "";
    //Read the data
    response.on('data', function (chunk) {
      body += chunk;
    });
    response.on('end', function(){
      if(response.statusCode === 200) {
        try {
          //Parse the data
          var current = JSON.parse(body);
          //Print the data
          printForecast(current.name, current.weather[0].main, kToFar(current.main.temp));
        } catch(error) {
          //Parse Error
          printError(error);
        }
      } else {
        //Status Code Error
        printError({message: "There was an error getting the weather for " + zip + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
      }
    });
  });

  //Connection Error
  request.on("error", printError);

  }

module.exports.report = report;