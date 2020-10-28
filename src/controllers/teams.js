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

// GET all teams for a user
async function getTeams( req, res, next ){
    const email = req.query.email;
    try{
        const teams = await Team.find({ "members.email" : email});
        res.json(teams);
    }catch( error ){
        error.status = 404;
        next( error );
    }
}

// DROP from a team
async function dropFromTeam( req, res, next ){
    const teamId = req.params.id;
    const user = {
        userId : req.body.userId,
        email : req.body.email
    }
    try{
        //console.log(user);
        const team = await Team.findByIdAndUpdate( teamId, { $pull: { "members" : user } } );

        // OPTIONAL - after dropping from team drop from the team meetings as well

        res.json(team);

    }catch( error ){
        error.status = 500;
        next( error );
    }

}

// ADD member to team
async function addMemberToTeam( req, res, next ){
    const teamId = req.params.id;
    const user = {
        userId : req.body.userId,
        email : req.body.email
    }

    try{

        const team = await Team.findByIdAndUpdate( teamId, { $addToSet : { "members" : user } } );
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