const express = require( 'express' );
const router = express.Router();
const multer = require( 'multer' );

router.get( '/editor', ( req, res ) =>
{
    res.render( 'vwDemo/editor' );
} );

router.post( '/editor', ( req, res ) =>
{
    console.log( req.body );
    res.redirect( req.headers.referer );
} );

router.get( '/upload', ( req, res ) =>
{
    res.render( 'vwDemo/upload' );
} );

router.post( '/upload', ( req, res ) =>
{
    const storage = multer.diskStorage( {
        destination: ( req, file, cb ) =>
        {
            cb( null, './public/imgs' );
        },
        filename: ( req, file, cb ) =>
        {
            cb( null, file.originalname );
        }
    } );
    const upload = multer( { storage } );
    upload.single( 'fuMain') (req, res, ( err ) =>
    {
        if ( err )
        {

        }
        else
        {
            res.render( 'vwDemo/upload' );
        }
    } );
    res.render( 'vwDemo/upload' );
} );
module.exports = router;