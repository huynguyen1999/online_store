const express = require( 'express' );
const product_model = require( '../../models/product.model' );
const configuration = require( '../../config.json' );
const router = express.Router();


router.get( '/byCat/:id', async ( req, res ) =>
{
    try
    {
        const CatID = req.params.id;
        const page = +req.query.page || 1;
        const offset = ( page - 1 ) * configuration.pagination.limit;

        for ( const c of res.locals.categories )
            if ( +CatID === +c.CatID )
            {
                c.isActive = true;

                const [ total_products, rows ] = await Promise.all( [
                    product_model.countByCat( CatID ),
                    product_model.pageByCat( CatID, offset ) ] );

                const n_pages = Math.ceil( total_products / configuration.pagination.limit );
                const from_page = ( page - 3 ) > 0 ? ( page - 3 ) : 1;
                const to_page = ( page + 3 ) > n_pages ? n_pages : ( page + 3 );
                const page_items = [];
                for ( let i = from_page; i <= to_page; i += 1 )
                {
                    page_items.push( { item: i } );
                    if ( i === page )
                        page_items[ page_items.length - 1 ].isActive = true;
                }
                res.render( 'vwProducts/byCat', {
                    category: c,
                    products: rows,
                    empty: rows.length === 0,
                    current_page: page,
                    page_items,
                    n_pages
                } );
                return;
            }
        res.redirect( '/products' );
    } catch ( error ) { console.log( error ); }
} );


router.get( '/detail/:id', async ( req, res ) =>
{
    const ProID = req.params.id;
    const product = await product_model.singleByID( ProID );
    res.render( 'vwProducts/detail', {
        product
    } );
} );

router.get( '/', async ( req, res ) =>
{
    const rows = await product_model.all();
    res.render( 'vwProducts/index', {
        products: rows,
        empty: rows.length === 0
    } );
} );

module.exports = router;