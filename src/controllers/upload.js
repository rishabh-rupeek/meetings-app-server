const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcrypt' );

const User = mongoose.model( 'user' );

const { sendUserByEmail } = require('./users')

async function uploadData(req,res,next){
    
    try {
        let user = await sendUserByEmail(req.query.email);
        
        //console.log(req.body.newPassword);
        const SALT_FACTOR = 10;

        bcrypt.genSalt( SALT_FACTOR, ( err, salt ) => {
            if( err ) {
                return done( err );
            }
    
            bcrypt.hash( req.body.newPassword, salt)
                .then(( hashedPassword ) => {
                    
                    user.password = hashedPassword;
                    //console.log(user.password);

                    User.findByIdAndUpdate( user._id, { "password": user.password,"name": req.body.name } )
                        .select({ "password": 0}).exec();;

                    return res.status(201).json({
                        "message":"Password Updated"
                    });

                }).catch(( err ) => {
                    return done( err );
                }) 
                
            });
        
    } catch (error) {
        error.message = "Not Uploaded";
        error.status = 401;
        next( error ); 
    }
}

module.exports = {
    uploadData
}