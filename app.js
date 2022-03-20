const express = require( 'express' );
const app = express();


app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use( express.static( 'public' ) );


require( './middlewares/view.mdw' )( app );
require( './middlewares/session.mdw' )( app );
require( './middlewares/locals.mdw' )( app );
require( './middlewares/route.mdw' )( app );
require( './middlewares/error_handler.mdw' )( app );
// HOST WEBSITE AT LOCAL
app.listen( 3000, _ => console.log( `Listening on port 3000` ) );