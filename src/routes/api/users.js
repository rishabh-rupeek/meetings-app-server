const express = require( 'express' );

const { authenticate } = require('../../utils/auth');

const { 
    sendUsers,
    sendUserById,
} = require( '../../controllers/users' );

const router = express.Router();

router.get( '/', authenticate, sendUsers );
router.get( '/:id', authenticate, sendUserById );

module.exports = router;