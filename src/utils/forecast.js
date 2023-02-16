//const url ="http://api.weatherstack.com/current?acces_key=74ecd174a225a814a8506d8fc7ee557d&query=37.8267,-122.4233";
//const url3 ="http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=ed3156a245bfd5e058370356b2a1ebe7";
//const url2 ="http://api.openweathermap.org/data/2.5/weather?lat=37.8267&lon=-122.4233&appid=ed3156a245bfd5e058370356b2a1ebe7&units=imperial";
// const location = "london";
//const url4 = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=ed3156a245bfd5e058370356b2a1ebe7&units=imperial`;
//////////////////////////////////////////////////////////
// const location = "egypt,cairo";
const request = require("request");

const forecast = (location, callback) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    location
  )}&appid=ed3156a245bfd5e058370356b2a1ebe7&units=imperial`;
  // the request
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to weather service!", undefined, undefined);
    } else if (body.message) {
      callback(`unable to find location`, undefined, undefined);
    } else {
      callback(
        undefined,
        `the weather in ${location} is ${body.weather[0].description}. It is currently ${body.main.temp} degressout. It feels like ${body.main.feels_like} degress out`,
        location
      );
    }
  });
};

module.exports = forecast;
