function pageNotFoundHandler( req, res, next ) {
    res.render( '404' );
}

function genericErrorHandler( err, req, res, next ) {
    err.status = err.status || 500;
    res.status( err.status ).json({
        message: err.message
    });
}

module.exports = {
    pageNotFoundHandler,
    genericErrorHandler
};