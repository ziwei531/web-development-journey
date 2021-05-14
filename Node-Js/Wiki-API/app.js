const express = require('express');
const app = express();
const { MongoClient } = require("mongodb");
const ejs = require("ejs");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'ejs');

//body-parser
app.use(express.json());
app.use(express.urlencoded({  
  extended: true
}));

//static usages
app.use(express.static("public"));

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

//Schema 
const wikiSchema = new mongoose.Schema({
    title: String,
    content: String
});

//Model  -- rmb. Singular uwu
const Article = mongoose.model('Article', wikiSchema);

////Request targeting all articles
app.route("/articles")
.get( (req, res) => {
    Article.find({}, (err, foundArticles) => {
        err ? res.send(err) :
        res.send(foundArticles)
    });
})
.post( (req, res) => {

    const newArticle = new Article( {
        title: req.body.title,
        content: req.body.content
    });

    newArticle.save( (err) => {
        err ? res.send(err) :
        res.send("Article saved successfully");
    });
})
.delete( (req, res) => {
    Article.deleteMany( (err) => {
        if (!err) {
            res.send("All articles are deleted successfully");
        }
        else {
            res.send(err);
        }
    });
})

//Request targeting a specific article
app.route("/articles/:articleTitle")
.get( (req,res) => {

    Article.findOne({title: req.params.articleTitle}, (err, foundArticle) => {
        (err) ? res.send(err) :
            (foundArticle) ? res.send(foundArticle) :
            res.send("No articles matching that title was found.");
    });
    //find specific article through this get method
})
.put( (req, res) => {
    Article.replaceOne(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content}, //postman must match req.body.***title*** that is set right here
        (err) => {
            if(!err) {
                res.send("Successfully updated");
            }
            else {
                res.send(err);
            }
        }
    )
})
.patch( (req,res) => {

    Article.updateOne(

        {title: req.params.articleTitle},
        {$set: req.body},
        err => {
            if (!err) {
                res.send("Sucessfully updated article");
            }
            else {
                res.send(err);
            }
        }
    )
})
.delete((req, res) => {
    Article.deleteOne(
        {title: req.params.articleTitle},
        err => {
            if (!err) {
                res.send("Sucessfully deleted one article");
            }
            else {
                res.send(err);
            }
        }
    )
})