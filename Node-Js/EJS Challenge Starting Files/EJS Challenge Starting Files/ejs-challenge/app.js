const express = require("express");
const app = express();
const ejs = require("ejs");
const _ = require('lodash');
const { truncate } = require("lodash");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser: true, useUnifiedTopology: true});

//Schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String, 
    required:  [true, "No item name has been specified please try again."]
  },
  content: {
      type: String,
      required:  [true, "No item name has been specified please try again."]
  }
});

const Blog = mongoose.model('Blog', blogSchema);

//body-parser
app.use(express.json());
app.use(express.urlencoded({  
  extended: true
}));

//ejs important app.set
app.set('view engine', 'ejs');

//static usages
app.use(express.static("public"));


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

app.get("/", (req,res) => {
  Blog.find({}, (err, posts) => {
    err ? console.log(err) :
    res.render('home', {
      content: homeStartingContent,
      posts: posts
    });

    // console.log(posts)
    
  })
 //variable for left side = the html side; right side = the ones right here in the app.js
 
});

app.get("/about", (req,res) => {
  res.render('about', {
    content: aboutContent     //variable for left side = the html side; right side = the ones right here in the app.js
  });                    
});

app.get("/contact", (req,res) => {
  res.render('contact', {
    content: contactContent     //variable for left side = the html side; right side = the ones right here in the app.js
  });                    
});

app.get("/compose", (req,res) => {
  res.render('compose');    //variable for left side = the html side; right side = the ones right here in the app.js                
});


app.get('/posts/:postId', (req,res) => {
  // console.log(req.params.postId)
  let requestedTitle = req.params.postId;
  console.log(requestedTitle)

  Blog.findOne({_id: requestedTitle}, (err, post) => {
      err ? console.log(err) :

      res.render('post', {

      title: post.title,

      content: post.content

      });
  });
});



//composition POST
app.post("/compose", (req,res) => {
  const post = new Blog ({
    title: req.body.title, 
    content: req.body.composition
  })

  post.save( (err) => {
    err ? console.log(err) :
    res.redirect("/")
  })

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
