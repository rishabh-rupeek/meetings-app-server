const express = require( 'express' );

const { authenticate } = require('../../utils/auth');

const { 
    addMeeting,
    getMeetings,
    sendMeetingById,
    dropFromMeeting,
    addAttendeeToMeeting
} = require( '../../controllers/meetings' );

const router = express.Router();

router.get( '/', authenticate, getMeetings );
router.post( '/' , authenticate, addMeeting );
router.get( '/:id' , authenticate, sendMeetingById );
router.patch( '/:id/addAttendee', authenticate, addAttendeeToMeeting );
router.patch( '/:id/drop', authenticate, dropFromMeeting );

module.exports = router;