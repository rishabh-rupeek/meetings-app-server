const express = require( 'express' );

const { 
    addMeeting
} = require( '../../controllers/meetings' );

const router = express.Router();

router.post( '/add', addMeeting );

module.exports = router;