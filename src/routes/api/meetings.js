const express = require( 'express' );

const { 
    addMeeting,
    getMeetings,
    getMeetingsForUserOnDate,
    sendMeetingById,
    dropFromMeeting,
    addAttendeeToMeeting
} = require( '../../controllers/meetings' );

const router = express.Router();

router.get( '/', getMeetings );
router.get( '/search', getMeetingsForUserOnDate );
router.post( '/add', addMeeting );
router.get( '/:id' , sendMeetingById );
router.patch( '/drop', dropFromMeeting );
router.patch( '/addAttendee',addAttendeeToMeeting );

module.exports = router;