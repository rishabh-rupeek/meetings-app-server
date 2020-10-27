const mongoose = require( 'mongoose' );

const attendeeSchema = mongoose.Schema({
        userId:{
        type: mongoose.Schema.ObjectId, 
        ref: 'user'
        },
        email:{
            type: String,
            required: true
        }
},{ _id : false });

const meetingSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description: String,
    date: {
        type: Date,
        required: true
    },
    startTime: {
        hours:{
            type: Number,
            required: true
        },
        minutes:{
            type: Number,
            required: true
        }
    },
    endTime: {
        hours:{
            type: Number,
            required: true
        },
        minutes:{
            type: Number,
            required: true
        }
    },
    attendees: [ attendeeSchema ]
})

mongoose.model( 'meeting', meetingSchema );