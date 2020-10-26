const express = require( 'express' );

const { 
    getMeetingsForUserOnDate
} = require( '../../controllers/meetings' );

const router = express.Router();

router.get( '/', getMeetingsForUserOnDate );

module.exports = router;