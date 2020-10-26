const mongoose = require( 'mongoose' );

const Meeting = mongoose.model( 'meeting' );

// Add a new meeting
async function addMeeting( req, res, next ) {   
    const meeting = req.body;

    try {
        meeting.scheduledOn = new Date(meeting.scheduledOn);
        // console.log(meeting);
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

// GET all meetings for a user on a given date
async function getMeetingsForUserOnDate( req, res, next ){
        const userId = req.body.userId;
        const givenDate = new Date( req.body.givenDate );
        
        try{

            const meetings = await Meeting.find({ "attendees" : userId, "scheduledOn" : givenDate });
            res.json(meetings);

        }catch( error ){
            error.status = 404;
            next( error );
        }
}

// GET meeting by id
async function sendMeetingById( req, res, next ) {
    const id = req.params.id;

    try {
        const meeting = await Meeting.findById( id ).exec();
        res.json( meeting );
    } catch( error ) {
        error.status = 404;
        next( error );
    }
}

// DROP from a meeting
async function dropFromMeeting( req, res, next ){
    const meetingId = req.body.meetingId;
    const userId = req.body.userId;

    try{

        const meeting = await Meeting.findByIdAndUpdate( meetingId, { $pull: { "attendees" : userId } } );
        res.json(meeting);

    }catch( error ){
        error.status = 500;
        next( error );
    }

}

// ADD attendee to a meeting
async function addAttendeeToMeeting( req, res, next ){

    const meetingId = req.body.meetingId;
    const attendeeId = req.body.attendeeId;

    try{

        const meeting = await Meeting.findByIdAndUpdate( meetingId, { $addToSet : { "attendees" : attendeeId } } );
        res.json(meeting);

    }catch( error ){
        error.status = 500;
        next( error );
    }

}

module.exports = {
    addMeeting,
    getMeetings,
    getMeetingsForUserOnDate,
    sendMeetingById,
    dropFromMeeting,
    addAttendeeToMeeting
}