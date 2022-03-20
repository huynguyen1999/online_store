require( 'express-async-errors' );
module.exports=app=>{
    app.use( ( req, res ) => res.render( '404', { layout: false } ) );
    app.use( ( err, req, res, next ) => res.render( '500', { layout: false } ) );
}