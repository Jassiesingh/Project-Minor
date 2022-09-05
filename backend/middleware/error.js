// imported errorhander in this file
//this file will act as a middle ware for the wrror file and the routes this will be imported in the app.js
const ErrorHandler = require("../utils/errorhandler")

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //Mongoose duplicate key error. This will be displayed for users registering with same email twice
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  
  //Wrong JSON WEB TOKEN
  if(err.code === "JsonWebTokenError"){
    const message = `Invalid Json Web Token. Please try again`
    err = new ErrorHandler(message, 400);
  }

  //JWT TOKEN error
  if(err.code === "TokenExpiredError"){
    const message = `Invalid Json Web Token. Please try again`
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).send({
    success: false,
    message: err.message,
  });
};