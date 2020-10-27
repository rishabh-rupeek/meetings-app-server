const mongoose = require( 'mongoose' );

const teamSchema = new mongoose.Schema({
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
            userId:{
                type: mongoose.Schema.ObjectId, 
                ref: 'user'
            },
            email:{
                type: String,
                required: true
            }
        }
    ]
})

mongoose.model( 'team', teamSchema );