const user = require("./models/user");

const express = require("express"),
    layouts = require("express-ejs-layouts"),
    app = express(),
    router = express.Router(),
    homeController = require("./controllers/homeControllers"),
    errorController = require("./controllers/errorController"),
    subscribersContoller = require("./controllers/subscribersController"),
    usersController = require("./controllers/usersController"),
    coursesController = require("./controllers/coursesController"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    
    //added dependencies
    passport = require("passport"),
    cookieParser = require("cookie-parser"),
    expressSession = require("express-session"),
    expressValidator = require("express-validator"),
    connectFlash = require("connect-flash");
    User = require("./models/user");

mongoose.connect("mongodb://localhost:27017/confetti_cuisine", { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(methodOverride("_method", { methods: ["POST", "GET"] }));


router.use(layouts);
router.use(express.static("public"));

router.use(
    express.urlencoded({
        extended: false,
    })
);

router.use(express.json());

router.use(expressValidator());

router.use(cookieParser("my_passcode"));

router.use(expressSession({
    secret: "my_passcode",
    cookie: {
        maxAge: 360000
    },
    resave: false,
    saveUninitialized: false
}));

router.use(connectFlash());

router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isUnauthenticated();
    res.locals.currentUser = req.user;
})

router.get("/", homeController.index);
router.get("/contact", homeController.contact);


router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.validate, usersController.create, usersController.redirectView);

//new addtions
router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate);
router.get("/users/logout", usersController.logout, usersController.redirectView);


router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.validate, usersController.update, usersController.redirectView);

router.get("/users/:id", usersController.show, usersController.showView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

router.get("/subscribers", subscribersContoller.index, subscribersContoller.indexView);
router.get("/subscribers/new", subscribersContoller.new);
router.post("/subscribers/create", subscribersContoller.create, subscribersContoller.redirectView);
router.get("/subscribers/:id", subscribersContoller.show, subscribersContoller.showView);
router.get("/subscribers/:id/edit", subscribersContoller.edit);
router.put("/subscribers/:id/update", subscribersContoller.update, subscribersContoller.redirectView);
router.delete("/subscribers/:id/delete", subscribersContoller.delete, subscribersContoller.redirectView);


router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/new", coursesController.new);
router.post("/courses/create", coursesController.create, coursesController.redirectView);
router.get("/courses/:id", coursesController.show, coursesController.showView);
router.get("/courses/:id/edit", coursesController.edit);
router.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
router.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);


router.use(errorController.pageNotFoundError);
router.use(errorController.internalServererror);

app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);

});