const express = require( 'express' );
const category_model = require( '../../models/category.model' );
const router = express.Router();

router.get( '/', async ( req, res ) =>
{
    const rows = await category_model.all();
    res.render( 'vwCategories/index', {
        categories: rows,
        empty: rows.length === 0
    } );
} );

router.get( '/add', ( req, res ) =>
{
    res.render( 'vwCategories/add' );
} );

router.post( '/add', async ( req, res ) =>
{
    const ret = await category_model.add( req.body );
    res.render( 'vwCategories/categories' );
} );

router.get( '/:id', async ( req, res ) =>
{
    const id = req.params.id;
    const category = await category_model.single( id );
    if ( category === null )
        return res.redirect( '/admin/categories' );

    res.render( 'vwCategories/edit', {
        category: category
    } );
} );

router.post( '/delete', async ( req, res ) =>
{
    console.log( req.body );
    const ret = await category_model.delete( req.body );
    res.redirect( '/admin/categories' );
} );

router.post( '/patch', async ( req, res ) =>
{
    console.log( req.body );
    const ret = await category_model.patch( req.body );
    res.redirect( '/admin/categories' );
} );

module.exports = router;