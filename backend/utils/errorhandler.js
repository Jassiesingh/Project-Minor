//this is error handling. Instead of writing if else statements you can just call this whenver you want to do an error check in a try catch block. This file will be imported in the error.js which is a middle ware for this file and the main files where you need to check errors

class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode

        Error.captureStackTrace(this,this.constructor);

    }
    
}

module.exports = ErrorHandler