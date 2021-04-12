"use strict";

var courses = [ //later will be in the DB
    {
        title: "Raspberry Cake",
        cost: 50,
    },
    {
        title: "Artichoke",
        cost: 20,
    },
    {
        title: "Burger",
        cost: 100,
    },
]

module.exports = {
    index: (req, res) => {
        res.render("home"); //main page this is the index.ejs but renamed cause I hate my life 
    },
    contact: (req,res) => {
        res.render("contact");
    },
    courses: (req, res) => {
        res.render("courses");
    }
}


/*exports.showHome = (req, res) => {
    res.render("home"); //loads the ejs file with this name
}*/