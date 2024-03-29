const httpStatus = require("http-status-codes")

exports.pageNotFoundError = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.render("error"); //make this double quotes to render our ejs with that name
}

exports.internalServerError = (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    res.status(errorCode);
    res.send(`${errorCode}, Sorry! Something went wrong with your application`);
    console.error(error.stack); //see error from stack
}