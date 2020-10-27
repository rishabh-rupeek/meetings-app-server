const mongoose = require( 'mongoose' );

const Meeting = mongoose.model( 'meeting' );

// Add a new meeting
async function addMeeting( req, res, next ) {   
    const meeting = req.body;

    try {
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
    const email = req.body.email;
    const dateOption = req.body.dateOption;
    const searchItem = req.body.searchItem;
    //const searchTerms = req.body.searchTerms;

    try{
        //console.log(userId);
        let meetings;
        const today = new Date();
        const filter = { date: { }, attendees: { $elemMatch: { } } };

        if( userId ) {
            filter.attendees.$elemMatch.userId = userId;
        }
        
        if( email ) {
            filter.attendees.$elemMatch.email = email;
        }

        //console.log(currentDate);
        if(dateOption === "ALL"){
            delete filter.date;
        }else if(dateOption === "PAST"){
            filter.date.$lt = today;
        }else if(dateOption === "TODAY"){
            filter.date.$eq = today;
        }else if(dateOption === "UPCOMING"){
            filter.date.$gt = today;
        }

        if(searchItem){
            filter.description = {
                $regex: new RegExp( searchItem, "i" )
            }
        }

        meetings = await Meeting.find(filter).exec();
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
            //console.log(givenDate);
            const meetings = await Meeting.find().where("attendees.userId").equals(userId).where("date").equals(givenDate).exec();
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
    const meetingId = req.params.id;
    const user = {
        userId : req.body.userId,
        email : req.body.email
    }

    try{
        console.log(user);
        const meeting = await Meeting.findByIdAndUpdate( meetingId, { $pull: { "attendees" : user } } );
        res.json(meeting);

    }catch( error ){
        error.status = 500;
        next( error );
    }

}

// ADD attendee to a meeting
async function addAttendeeToMeeting( req, res, next ){

    const meetingId = req.params.id;
    const data = req.body;

    let attendees;
    if( data instanceof Array ) {
        attendees = data;
    } else {
        attendees = [ data ];
    }
    
    try{
        //console.log(attendees);
        const meeting = await Meeting.findByIdAndUpdate( meetingId, { $addToSet : { attendees } } );
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