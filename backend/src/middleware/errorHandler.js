const errorHandler = (err, req, res, next) => {
    // 1. Log the error for the developer
    console.error(err);

    // 2. Determine the status code
    const statusCode = err.statusCode || 500;

    // 3. Send the response
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
};

module.exports = errorHandler;