const errorHandler = (err,req,res,next) =>{
    const statusCode = res.statusCode ? res.statusCode : 500 ; // what ever to set with res.status(?)

    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ?  null  : err.stack,
    })

}

module.exports = {
    errorHandler
};