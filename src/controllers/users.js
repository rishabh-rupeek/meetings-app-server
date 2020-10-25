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

module.exports = {
    sendUsers,
    sendUserById
}