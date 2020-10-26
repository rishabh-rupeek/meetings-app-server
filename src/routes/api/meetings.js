const express = require( 'express' );

const { 
    addMeeting,
    getMeetings,
    dropFromMeeting,
    addAttendeeToMeeting
} = require( '../../controllers/meetings' );
const { route } = require('./users');

const router = express.Router();

router.get( '/', getMeetings );
router.post( '/add', addMeeting );
router.patch( '/drop', dropFromMeeting );
router.patch( '/addAttendee',addAttendeeToMeeting );

module.exports = router;