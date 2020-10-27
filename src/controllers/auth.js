const jwt = require( 'jsonwebtoken' );

const mongoose = require( 'mongoose' );
const User = mongoose.model( 'user' );

async function loginUser( req, res, next ){

    const credentials = req.body;
    //console.log(credentials);
    User.find(credentials)
        .exec(( error, result ) => {
            if( error || !result){
                if( error ){
                    error.status = 403;
                    return next( error );
                } else {
                    const error = new Error( 'unknown db error' );
                    error.status = 500;
                    return next( error );
                }

            }

            const claims = {
                email : result.email,
                userId : result.userId
            }

            jwt.sign(claims, 'secretKey', function(error, token){
                
                if( error ) {
                    return res.status(401).json({ message: error.message });
                }

                res.status(200).json({
                    token: token,
                    email: result.email,
                    name: result.name
                });

            });

        });

}

module.exports = {
    loginUser
}