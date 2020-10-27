const express = require( 'express' );

const { 
    addMeeting,
    getMeetings,
    sendMeetingById,
    dropFromMeeting,
    addAttendeeToMeeting
} = require( '../../controllers/meetings' );

const router = express.Router();

router.get( '/', getMeetings );
router.post( '/' , addMeeting );
router.get( '/:id' , sendMeetingById );
router.patch( '/:id/addAttendee', addAttendeeToMeeting );
router.patch( '/:id/drop', dropFromMeeting );

module.exports = router;