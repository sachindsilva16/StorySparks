const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const content = require(__dirname + "/content.js");
const app = express();
const port = process.env.PORT || 3000;
const _ = require('lodash');
const { homeStartingContent2 } = require('./content');




app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// ---------------------------------------------------------------------------------

//  :: GLOBAL VARIABLES ::

let posts = [];


// -----------------



app.get("/", (req, res) => {
    let homeStartingContent = content.homeStartingContent();
    let postTitle = "";
    posts.forEach(function(post){
        postTitle = _.kebabCase(post.title);
    })
    res.render("home", {
        getHomeContent: homeStartingContent,
        newPosts: posts,
        postTitleCase : postTitle
    });

});

//  :: GET REQUEST --> HOME ::

app.get("/home", (req, res) => {
    let homeStartingContentOne = content.homeStartingContentOne();
    let homeStartingContentTwo = content.homeStartingContentTwo();
    let postTitle = "";
    posts.forEach(function(post){
        postTitle = _.kebabCase(post.title);
    })
    res.render("home", {
        getHomeContentOne: homeStartingContentOne,
        newPosts: posts,
        postTitleCase : postTitle,
        getHomeContentTwo:homeStartingContentTwo
    });
});

//  :: GET REQUEST --> CONTACT ::

app.get("/contact", (req, res) => {
    let contactContent = content.contactContent();

    res.render("contact", { getContactContent: contactContent });
});


//  :: GET REQUEST --> ABOUT ::

app.get("/about", (req, res) => {
    let aboutContent = content.aboutContent();

    res.render("about", { getAboutContent: aboutContent });
});

//  :: GET REQUEST --> COMPOSE ::

app.get("/compose", (req, res) => {
    res.render("compose", { newPosts: posts });
});





//  :: POST REQUEST --> COMPOSE ::


app.post("/compose", (req, res) => {

    const post = {
        title: _.upperFirst(req.body.postTitle),
        content: req.body.postBody
    };

    posts.push(post);
    res.redirect("/");


});





// :: GET REQUEST ---> 'posts' ::

app.get("/posts/:postTopic", (req, res) => {

    let requestedTitle = _.lowerCase(req.params.postTopic);

    posts.forEach(function (post) {

        let postTitleCase = _.lowerCase(post.title);

        if (postTitleCase === requestedTitle) {
            res.render("post", {
                title: post.title,
                content: post.content,
                postLink: "/posts/" + requestedTitle
            });
        }
    });

});




//  :: SERVER LISTENING ::

app.listen(port, () => {
    console.log(`Your server is running on localhost:${port}`);
});