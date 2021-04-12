"use strict";

const Subscriber = require("../models/subscriber"),
getSubscriberParams = (body) => {
    return {
        name: body.name,
        email: body.email,
        zipCode: body.zipCode
    };
};

module.exports = {
    index:(req,res,next) => {
        Subscriber.find()
        .then(subscribers => {
            res.locals.subscribers = subscribers;
            next()
        })
        .catch(error => {
            console.log(`Error fetching subscriber data: ${error.message}`);
            next(error);
        });
    },
    indexView: (req, res) => {
        res.render("subscribers/index");
    },
    new: (req, res) => {
        res.render("subscribers/new");
    },
    create: (req, res, next) => {
        let newSubscriber = new Subscriber({
            name: req.body.name,
            email: req.body.email,
            zipCode: req.body.zipCode
        });
        Subscriber.create(newSubscriber)
        .then( subscriber => {
            res.locals.subscriber = subscriber;
            res.locals.redirect = "/subscribers";
            next();
        })
        .catch(error => {
            console.log(`Error saving user ${error.message}`)
            next(error)
        });
    },
    redirectView: (req, res, rext) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath) res.redirect(redirectPath);
        else next();
    },
    show: (req, res, next) => {
        let subscriberId = req.params.id;
        Subscriber.findById(subscriberId)
        .then(subscriber => {
            res.locals.subscriber = subscriber;
            next();
        })
        .catch(error => {
            console.log(`Error fetching subscriber by ID: ${error.message}`)
        next(error);
        });
    },
    showView: (req, res) => {
        res.render("subscribers/show");
    },
    edit: (req, res) => {
        let subscriberId = req.params.id;
        Subscriber.findById(subscriberId)
        .then(subscriber =>{
            res.render("subscribers/edit", {subscriber: subscriber});
        })
        .catch(error => {
            console.log(`Error fetching subscriber by ID: ${error.message}`);
            next(error);
        })
    },
    update: (req, res, next) => {
        let subscriberId = req.params.id;

        var updatedSubscriber = {};
        updatedSubscriber.name = req.body.name;
        updatedSubscriber.email = req.body.email;
        updatedSubscriber.zipCode = req.body.zipCode;
        
        /*let updatedSubscriber = new Subscriber({
            name: req.body.name,
            email: req.body.email,
            zipCode: req.body.zipCode
        });*/

        Subscriber.findByIdAndUpdate(subscriberId, updatedSubscriber)
        .then(subscriber =>{
            res.locals.subscriber = subscriber;
            res.locals.redirect = `/subscribers/${subscriberId}`;
            next();
        })
        .catch(error => {
            console.log(`Error fetching subscriber by ID: ${error.message}`);
            next(error);
        })
    },
    delete: (req, res, next) => {
        let subscriberId = req.params.id;
        Subscriber.findByIdAndRemove(subscriberId)
            .then(() => {
                res.locals.redirect = "/subscribers";
                next();
            })
            .catch(error => {
                console.log(`Error fetching subscriber by ID: ${error.message}`);
                next(error);
            });
    }
}