const mongoose = require( 'mongoose' );
const Team = mongoose.model( 'team' );

const { sendUserByEmail } = require('./users');

// Create a new team
async function createTeam( req, res, next ) {   
    const team = req.body;

    const memberEmails = team.members;
    const members = [];
    const promisesToAwait = [];

    memberEmails.forEach(email => {
        promisesToAwait.push(sendUserByEmail(email));
    });

    const users = await Promise.all(promisesToAwait);
    //console.log(attendeeEmails);
    //console.log(users);
    for(let i=0;i<users.length;i++){
        members.push({
            userId: users[i]._id,
            email: memberEmails[i]
        })
    }

    team.members = members;

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
    const userId = res.claims.userId;
    //console.log(userId);
    try{
        const teams = await Team.find({ "members.userId" : userId});
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
        userId : res.claims.userId,
        email : res.claims.email
    }
    //console.log(user);

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
    const email = req.body.email;

    let members = await sendUserByEmail(email);
    //console.log(attendees);
    let member = {
        userId:members._id,
        email:members.email
    }

    try{

        const team = await Team.findByIdAndUpdate( teamId, { $addToSet : { "members" : member } } );
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