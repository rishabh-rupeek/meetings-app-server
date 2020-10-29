const mongoose = require( 'mongoose' );
const Meeting = mongoose.model( 'meeting' );

const { sendUserByEmail } = require('./users');

// Add a new meeting
async function addMeeting( req, res, next ) {   
    const meeting = req.body;
    const attendeeEmails = meeting.attendees;
    const attendees = [];
    const promisesToAwait = [];

    attendeeEmails.forEach(attendee => {
        promisesToAwait.push(sendUserByEmail(attendee));
    });
    const users = await Promise.all(promisesToAwait);
    //console.log(attendeeEmails);
    //console.log(users);
    for(let i=0;i<users.length;i++){
        attendees.push({
            userId: users[i]._id,
            email: attendeeEmails[i]
        })
    }

    meeting.attendees = attendees;
    //console.log(meeting);
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
    const userId = res.claims.userId;
    const email = res.claims.email;
    const dateOption = req.query.dateOption;
    const searchItem = req.query.searchItem;
    //const searchTerms = req.body.searchTerms;
    //console.log(userId,email,dateOption,searchItem);
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
        const userId = res.claims.userId;
        const givenDate = new Date( req.query.givenDate );
        //console.log(userId,givenDate)
        try{
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
    //console.log(res.claims);
    const user = {
        userId : res.claims.userId,
        email : res.claims.email
    }

    try{
        //console.log(user);
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
    const email = req.body.email;

    let attendees = await sendUserByEmail(email);
    //console.log(attendees);
    let attendee = {
        userId:attendees._id,
        email:attendees.email
    }
    //console.log(attendee);
    try{
        //console.log(attendees);
        const meeting = await Meeting.findByIdAndUpdate( meetingId, { $addToSet : { "attendees" : attendee } } );
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