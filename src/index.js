require('./db/init');

const express = require( 'express' );
const path = require( 'path' );

const usersRouter = require( './routes/api/users' );
const meetingsRouter = require( './routes/api/meetings' );
const { genericErrorHandler, pageNotFoundHandler } = require( './middleware/errors' );

const app = express();

app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( express.json() );
app.use( express.urlencoded() );

app.use( '/users', usersRouter );
app.use( '/meetings', meetingsRouter );

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