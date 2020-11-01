const express = require( 'express' );

const { authenticate } = require('../../utils/auth');

const { 
    getNotificationsForUser,
    addNotification
} = require( '../../controllers/notifications' );

const router = express.Router();

router.get( '/', authenticate, getNotificationsForUser );
router.post( '/', authenticate, addNotification );

module.exports = router;