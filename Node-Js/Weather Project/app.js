const express = require("express");
const app = express();
const https = require("https");

//body parser equivalent
app.use(express.json());
app.use(express.urlencoded({  
    extended: true
  }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=4927cd46e5b455632de9046a387989fa&units=metric";
    
    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on("data", function (data) {

            const weatherData = JSON.parse(data);
            const icon = weatherData.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            
            res.write("<h1>The weather is currently " + weatherDescription + "</h1>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
            res.write("<img src=" + iconUrl + ">");
            res.send();
        });
    });
});

app.listen(3000, function () {
    console.log("running");
});