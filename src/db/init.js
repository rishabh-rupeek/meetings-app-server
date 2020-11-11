const mongoose = require( 'mongoose' );
const { seed } = require( './seed' );

// creates the required models 
require( '../models/user' );
require( '../models/meeting' );
require( '../models/team' );
require( '../models/notification' );

const uri = 'mongodb://localhost:27017/meetings-app';

mongoose.set( 'useFindAndModify', false );
mongoose.set( 'returnOriginal', false );

mongoose.connect( uri, { useNewUrlParser: true } );

mongoose.connection.on( 'open', () => {
    //console.log( 'connected to db' );
    
    // add dummy data at first
    //seed();
});

mongoose.connection.on( 'error', err => {
    console.error( err.message );
    process.exit();
});