const mongoose = require( 'mongoose' );

const Meeting = mongoose.model( 'meeting' );

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

module.exports = {
    addMeeting
}