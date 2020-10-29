const mongoose = require( 'mongoose' );

const User = mongoose.model( 'user' );

async function sendUsers( req, res ) {    
    try {
        const users = await User.find().exec();
        res.json( users );
    } catch( error ) {
        error.status = 500;
        next( error );
    }
}

async function sendUserById( req, res, next ) {
    const id = req.params.id;

    try {
        const user = await User.findById( id ).exec();
        res.json( user );
    } catch( error ) {
        error.status = 404;
        next( error );
    }
}

async function sendUserByEmail( email ) {

    try {
        const user = await User.findOne({"email":email}).exec();
        return user;
    } catch( error ) {
        return null;
    }
}

module.exports = {
    sendUsers,
    sendUserById,
    sendUserByEmail
}