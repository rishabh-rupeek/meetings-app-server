const jwt = require( 'jsonwebtoken' );

const mongoose = require( 'mongoose' );
const User = mongoose.model( 'user' );

async function loginUser( req, res, next ){

    const credentials = req.body;
    //console.log(credentials);
    User.findOne({ "email": credentials.email })
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

            result.checkPassword( credentials.password, (err, isMatch) => {

                if(err){
                    err.status = 401;
                    return next(err);
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
        });

}

async function registerUser( req, res, next ){

    const credentials = req.body;

    User.create( credentials, (error, createdUser) => {
        if(error){
            error.status = 500;
            return next(error);
        }

        res.status(204).json(createdUser);

    })

}

module.exports = {
    loginUser,
    registerUser
}