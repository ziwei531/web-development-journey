const express = require('express');
const app = express();

app.use(express.json()); //body-parser equivalent

app.use(express.urlencoded({  
  extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

function bmiCalculator(weight, height) {
    let bmi = weight / Math.pow(height, 2);
    return Math.round(bmi);
}

app.post("/", function(req, res) {
    let weight = req.body.weight;
    let height = req.body.height;
    let result = bmiCalculator(parseFloat(weight), parseFloat(height));

    console.log(req.body);
    res.send("Your bmi result is " + result);

});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});

