const express = require( 'express' );
const moment = require( 'moment' );
const productModel = require( '../../models/product.model' );
const cart_model = require( '../../models/cart.model' );
const order_model = require( '../../models/order.model' );
const order_details_model = require( '../../models/order_details.model' );
const router = express.Router();

router.get( '/', async function ( req, res )
{
    const items = [];
    let total = 0;
    for ( const ci of req.session.cart )
    {
        const product = await productModel.singleByID( ci.id );
        items.push( {
            ...ci,
            // id: ci.id,
            // quantity: ci.quantity,
            product,
            amount: ci.quantity * product.Price
        } );
        total += ci.quantity * product.Price;
    }
    res.render( 'vwCart/index', {
        items,
        total,
        empty: req.session.cart.length === 0
    } );
} );

router.post( '/add', function ( req, res )
{
    console.log( req.body );
    const item = {
        id: +req.body.id,
        quantity: +req.body.quantity
    };
    cart_model.add( req.session.cart, item );
    res.redirect( req.headers.referer );
} );


router.post( '/remove', ( req, res ) =>
{
    const id = +req.body.id;
    cart_model.remove( req.session.cart, id );
    console.log( id );
    res.redirect( req.headers.referer );
} );

router.post( '/checkout', async ( req, res ) =>
{
    let total = 0;
    const details = [];
    for ( ci of req.session.cart )
    {
        const product = await productModel.singleByID( ci.id );
        const amount = ci.quantity * product.Price;
        total += amount;
        details.push( {
            ProID: product.ProID,
            Quantity: ci.quantity,
            Price: product.Price,
            Amount: amount,
        } );
    }
    const order = {
        OrderDate: moment().format( 'YYYY-MM-DD HH:mm:ss' ),
        UserID: req.session.authUser.f_ID,
        total
    };
    const ret = await order_model.add( order );
    console.log( ret);
    for ( const detail of details )
    {
        detail.OrderID = ret.insertId;
        console.log( detail );
        await order_details_model.add( detail );
    }
    
    res.redirect( req.headers.referer );
} );

module.exports = router;