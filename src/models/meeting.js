const mongoose = require( 'mongoose' );

const meetingSchema = new mongoose.Schema({
    createdBy:{
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    scheduledOn: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    description: String,
    attendees: [
        {
            type: mongoose.Schema.ObjectId, 
            ref: 'user'
        }
    ]
})

mongoose.model( 'meeting', meetingSchema );