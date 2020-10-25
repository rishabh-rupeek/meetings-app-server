const express = require( 'express' );

const { 
    sendUsers,
    sendUserById,
} = require( '../../controllers/users' );

const router = express.Router();

router.get( '/', sendUsers );
router.get( '/:id', sendUserById );

module.exports = router;