const mongoose = require( 'mongoose' );

const teamSchema = new mongoose.Schema({
    createdBy:{
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    shortName: {
        type: String,
        required: true
    },
    description: String,
    members: [
        {
            type: mongoose.Schema.ObjectId, 
            ref: 'user'
        }
    ]
})

mongoose.model( 'team', teamSchema );