const mongoose = require( 'mongoose' );

const Team = mongoose.model( 'team' );

// Create a new team
async function createTeam( req, res, next ) {   
    const team = req.body;
    try {
    
        const addedTeam = await Team.create(team);
        res.status( 201 ).json( addedTeam );

    } catch( error ) {
        error.status = 500;
        next( error );
    }
}

// GET all teams
async function getTeams( req, res, next ){
    try{
        const teams = await Team.find();
        res.json(teams);
    }catch( error ){
        error.status = 404;
        next( error );
    }
}

// DROP from a team
async function dropFromTeam( req, res, next ){
    const teamId = req.body.teamId;
    const userId = req.body.userId;

    try{

        const team = await Team.findByIdAndUpdate( teamId, { $pull: { "members" : userId } } );

        // OPTIONAL - after dropping from team drop from the team meetings as well

        res.json(team);

    }catch( error ){
        error.status = 500;
        next( error );
    }

}

// ADD member to team
async function addMemberToTeam( req, res, next ){
    const teamId = req.body.teamId;
    const memberId = req.body.memberId;

    try{

        const team = await Team.findByIdAndUpdate( teamId, { $addToSet : { "members" : memberId } } );
        res.json(team);

    }catch( error ){
        error.status = 500;
        next( error );
    }

}

module.exports = {
    getTeams,
    createTeam,
    dropFromTeam,
    addMemberToTeam
}