const mongoose = require( 'mongoose' );

const notificationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

mongoose.model( 'notification', notificationSchema );