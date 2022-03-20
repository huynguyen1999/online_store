const express = require( 'express' );
const product_model = require( '../../models/product.model' );
const router = express.Router();

router.get( '/', async ( req, res ) =>
{
    const rows = await product_model.all();
    console.log( rows );
    res.render( 'vwProducts/index', {
        products: rows,
        empty: rows.length === 0
    } );
} );

module.exports = router;