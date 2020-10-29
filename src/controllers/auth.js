const jwt = require( 'jsonwebtoken' );

const mongoose = require( 'mongoose' );
const User = mongoose.model( 'user' );

async function loginUser( req, res, next ){

    const credentials = req.body;
    //console.log(credentials);
    User.findOne(credentials)
        .exec(( error, result ) => {
            if( error || !result || typeof result !== 'object' || Object.keys( result ).length === 0 ) {
                if( error ) {
                    error.status = 403;
                    return next( error );
                } else {
                    //console.log(result);
                    const error = new Error( 'unknown db error' );
                    error.status = 500;
                    return next( error );
                }
            }
            //console.log(result);
            const claims = {
                email : result.email,
                userId : result._id,
                name : result.name
            }

            jwt.sign(claims, 'secretKey', function(error, token){
                
                if( error ) {
                    return res.status(401).json({ message: error.message });
                }

                res.status(200).json({
                    token: token,
                    email: result.email,
                    name: result.name,
                    userId: result._id
                });

            });

        });

}

module.exports = {
    loginUser
}