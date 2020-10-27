const express = require( 'express' );

const { 
    getTeams,
    createTeam,
    dropFromTeam,
    addMemberToTeam
} = require( '../../controllers/teams' );

const router = express.Router();

router.get( '/', getTeams );
router.post( '/', createTeam );
router.patch( '/:id/drop', dropFromTeam );
router.patch( '/:id/addMember', addMemberToTeam );

module.exports = router;