function pageNotFoundHandler( req, res, next ) {
    console.log('error aagyi - 1');
    res.render( '404' );
}

function genericErrorHandler( err, req, res, next ) {
    console.log('error aagyi');
    err.status = err.status || 500;
    res.status( err.status ).json({
        message: err.message
    });
}

module.exports = {
    pageNotFoundHandler,
    genericErrorHandler
};