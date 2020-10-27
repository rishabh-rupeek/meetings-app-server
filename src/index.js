require('./db/init');

const express = require( 'express' );
const path = require( 'path' );

const authRouter = require( './routes/api/auth' );
const usersRouter = require( './routes/api/users' );
const meetingsRouter = require( './routes/api/meetings' );
const teamsRouter = require( './routes/api/teams' );
const calendarRouter = require( './routes/api/calendar' );
const { genericErrorHandler, pageNotFoundHandler } = require( './middleware/errors' );

const app = express();

app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( express.json() );
app.use( express.urlencoded() );

app.use( '/api/auth', authRouter );
app.use( '/api/users', usersRouter );
app.use( '/api/meetings', meetingsRouter );
app.use( '/api/teams', teamsRouter );
app.use( '/api/calendar', calendarRouter );

app.use( pageNotFoundHandler );
app.use( genericErrorHandler );

const port = process.env.PORT || 3000;

app.listen( port, function( err ) {
    if( err ) {
        console.error( err.message );
        return;
    }

    console.log( `Server running on http://localhost:${port}` );
});