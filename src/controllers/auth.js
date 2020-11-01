const jwt = require( 'jsonwebtoken' );

const mongoose = require( 'mongoose' );
const User = mongoose.model( 'user' );

async function loginUser( req, res, next ){

    const credentials = req.body;
    //console.log(credentials);
    User
    .findOne( { email: credentials.email } )
    .exec(( error, result ) => {
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

        // check match of password
        result.checkPassword( credentials.password, ( err, isMatch ) => {
            if( err ) {
                err.status = 401;
                return next( err );
            }

            if( !isMatch ) {
                // again some error   
                const error = new Error();
                error.message = "Incorrect Password";
                error.status = 401;
                return next( error ); 
            }

            const claims = { email: result.email, userId: result._id };
    
            jwt.sign(claims, 'secretKey', {expiresIn: '24h'}, function( error, token ) {
                console.log( 'jwt token generated' );

                if( error ) {
                    return res.status(401).json({ message: error.message });
                }

                res.status(200).json({
                    message: 'Signed in sucessfully',
                    token: token,
                    email: result.email,
                    name: result.name
                });
            });
        })
    });  

}

async function registerUser( req, res, next ){

    const credentials = req.body;

    User.create( credentials, (error, createdUser) => {
        if(error){
            error.status = 500;
            return next(error);
        }

        console.log(createdUser);

        return res.status(200).json(createdUser);

    })

}

module.exports = {
    loginUser,
    registerUser
}