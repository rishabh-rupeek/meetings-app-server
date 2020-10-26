const express = require( 'express' );

const { 
    getTeams,
    createTeam,
    dropFromTeam,
    addMemberToTeam
} = require( '../../controllers/teams' );

const router = express.Router();

router.get( '/', getTeams );
router.post( '/create', createTeam );
router.patch( '/drop', dropFromTeam );
router.patch( '/addMember', addMemberToTeam );

module.exports = router;