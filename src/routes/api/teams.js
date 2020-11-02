const express = require( 'express' );

const { authenticate } = require('../../utils/auth');

const { 
    getTeams,
    getMembersOfTeam,
    createTeam,
    dropFromTeam,
    addMemberToTeam
} = require( '../../controllers/teams' );

const router = express.Router();

router.get( '/', authenticate, getTeams );
router.get( '/:shortName', authenticate, getMembersOfTeam );
router.post( '/', authenticate, createTeam );
router.patch( '/:id/drop', authenticate, dropFromTeam );
router.patch( '/:id/addMember', authenticate, addMemberToTeam );

module.exports = router;