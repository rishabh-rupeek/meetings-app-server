const mongoose = require( 'mongoose' );

const memberSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.ObjectId, 
        ref: 'user'
    },
    email:{
        type: String,
        required: true
    }
},{ _id : false });

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
    members: [ memberSchema ]
})

mongoose.model( 'team', teamSchema );