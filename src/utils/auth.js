const jwt = require( 'jsonwebtoken' );

const mongoose = require( 'mongoose' );
const User = mongoose.model( 'user' );

function authenticate( req, res, next ) {
    const token = req.header( 'Authorization' );
    console.log(token);

    if( !token ) {
        return res.status( 403 ).json({
            message: 'Token is not sent'
        });
    }

    jwt.verify(token, 'secretKey', function(err, claims) {
        if( err ) {
            return res.status( 403 ).json({
                message: 'Go away intruder'
            });
        }

        res.claims = claims;
        
        next();
    });
}

function checkOldPassword( req, res, next ){
    User.findOne({ email: req.query.email })
        .exec(( error, result ) => {
            // console.log(req.query.email);
            // console.log(result);

            if( error || !result || typeof result !== 'object' || Object.keys( result ).length === 0 ) {
                if( error ) {
                    error.status = 403;
                    return next( error );
                } else {
                    const error = new Error( 'unknown db error' );
                    error.status = 500;
                    return next( error );
                }
            }

        //console.log(req.body);
        // check match of password
        result.checkPassword( req.body.oldPassword, ( err, isMatch ) => {
            if( err ) {
                err.status = 401;
                return next( err );
            }

            if( !isMatch ) {
                // again some error   
                const error = new Error();
                error.message = "Incorrect Old Password";
                error.status = 401;
                return next( error ); 
            }
            
            return next();

        });
    });
}

module.exports = {
    authenticate,
    checkOldPassword
};