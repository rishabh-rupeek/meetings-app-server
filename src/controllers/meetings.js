const mongoose = require( 'mongoose' );

const Meeting = mongoose.model( 'meeting' );

// Add a new meeting
async function addMeeting( req, res, next ) {   
    const meeting = req.body;

    try {
        meeting.scheduledOn = new Date(meeting.scheduledOn);
        console.log(meeting);
        const addedMeeting = await Meeting.create(meeting);
        res.status( 201 ).json( addedMeeting );

    } catch( error ) {
        error.status = 500;
        next( error );
    }
}

// GET all meetings for a user
async function getMeetings( req, res, next ){
    const userId = req.body.userId;

    try{
        console.log(userId);
        const meetings = await Meeting.find({ "attendees" : userId });
        res.json(meetings);
    }catch( error ){
        error.status = 404;
        next( error );
    }

}


module.exports = {
    addMeeting,
    getMeetings
}