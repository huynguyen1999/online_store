const express = require( 'express' );
const router = express.Router();
const moment = require( 'moment' );
const bcrypt = require( 'bcryptjs' );
const user_model = require( '../../models/user.model' );
const auth = require( '../../middlewares/auth.mdw' );

router.get( '/register', ( req, res ) => res.render( 'vwAccount/register' ) );

router.post( '/register', async ( req, res ) =>
{
    console.log( req.path );
    const hash = bcrypt.hashSync( req.body.password, 10 );
    const dob = moment( req.body.dob, 'DD/MM/YYYY' ).format( 'YYYY-MM-DD' );
    const user = {
        f_Username: req.body.username,
        f_Password: hash,
        f_Email: req.body.email,
        f_DOB: dob,
        f_Name: req.body.name,
        f_Permission: 0,
    };
    console.log( user );
    await user_model.add( user );
    res.redirect( '/account/login' );
} );

router.get( '/login', ( req, res ) =>
{
    const ref = req.headers.referer;
    req.session.retUrl = ref;
    res.render( 'vwAccount/login', {
        layout: false,
    } );
} );

router.post( '/login', async ( req, res ) =>
{
    const user = await user_model.singleByUsername( req.body.username );

    if ( user === null )
        return res.render( 'vwAccount/login', { layout: false, error_message: "Invalid username!" } );
    const ret = bcrypt.compareSync( req.body.password, user.f_Password );
    console.log( ret );
    if ( ret === false )
        return res.render( 'vwAccount/login', { layout: false, error_message: "Invalid password!" } );

    req.session.isAuth = true;
    req.session.authUser = user;    
    
    const url = req.session.retUrl || '/';
    res.redirect( url );
} );

router.post( '/logout', async ( req, res ) =>
{
    req.session.isAuth = false;
    req.session.authUser = null;
    req.session.cart = [];
    res.redirect( req.headers.referer );
} );



router.get( '/profile', auth, ( req, res ) =>
{
    return res.render( 'vwAccount/profile' );
} );

router.get( '/is-available', async ( req, res ) =>
{
    const username = req.query.user;
    console.log( typeof ( username ) );
    const user = await user_model.singleByUsername( username );
    if ( user === null ) return res.json( true );
    return res.json( false );
} );

module.exports = router;