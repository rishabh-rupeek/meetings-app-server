const express = require( 'express' );

const { authenticate } = require('../../utils/auth');

const { 
    getMeetingsForUserOnDate
} = require( '../../controllers/meetings' );

const router = express.Router();

router.get( '/', authenticate, getMeetingsForUserOnDate );

module.exports = router;