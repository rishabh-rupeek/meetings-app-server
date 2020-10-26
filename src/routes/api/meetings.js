const express = require( 'express' );

const { 
    addMeeting,
    getMeetings
} = require( '../../controllers/meetings' );
const { route } = require('./users');

const router = express.Router();

router.get( '/', getMeetings );
router.post( '/add', addMeeting );

module.exports = router;