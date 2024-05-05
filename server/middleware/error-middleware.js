const errorMiddleware = (err, req, res, next) => {
    const status = err && err.status ? err.status : 500;
    const message = err && err.message ? err.message : "BACKEND ERROR";
    const extraDetails = err && err.extraDetails ? err.extraDetails : "Error From Backend";
    
    // console.error(err)
    return res.status(status).json({message, extraDetails});
}

module.exports = errorMiddleware;