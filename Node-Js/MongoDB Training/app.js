const { DBRef } = require('bson');
const { Db } = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitDB', {useNewUrlParser: true, useUnifiedTopology: true});


//Schemas
const fruitSchema = new mongoose.Schema ({
    name: {
        type: String, 
        required: [true, "No fruit name has been specified please try again."]
    }, 
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const personSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
    name: "Peaches",
    rating: 7,
    review: "Pretty gay fruit"
});

const Durian = new Fruit ({
    name: "Durian",
    rating: 10,
    review: "Best ever fruit!"
});

const person = new Person ({
    name: "John",
    age: 37
});

Person.updateOne({name: "John"}, {favouriteFruit: Durian} , (err) => {
    (err) ? console.log(err) :
    console.log("Successfully Updated Person's details");
});

// fruit.save();
// const kiwi = new Fruit ({
//     name: "Kiwi",
//     score: 10,
//     review: "The best fruit"
// });

// const orange = new Fruit ({
//     name: "Orange",
//     score: 4,
//     review: "Too sour for me"
// });

// const banana = new Fruit ({
//     name: "Banana",
//     score: 3,
//     review: "Weird texture"
// });

// Fruit.insertMany([kiwi, banana, orange], err => {
//     err ? console.log(err) 
//     : console.log('Successfully saved all the fruits to fruitDB');
// });

// Fruit.find( (err, fruits) => {
//     err ? console.log(err) :
//     mongoose.connection.close();
//     fruits.forEach((fruit) => {
//         console.log(fruit.name);
//     });
// });


//log name of the fruits 