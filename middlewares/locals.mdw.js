const cart_model = require( '../models/cart.model' );
const category_model = require( '../models/category.model' );

module.exports = ( app ) =>
{
    app.use( ( req, res, next ) =>
    {

        if ( typeof ( req.session.isAuth ) === 'undefined' )
        {
            req.session.isAuth = false;
            req.session.cart = [];
        }

        res.locals.cart_number_items = cart_model.get_number_of_items( req.session.cart );
        res.locals.isAuth = req.session.isAuth;
        res.locals.authUser = req.session.authUser;

        next();
    } );

    app.use( async ( req, res, next ) =>
    {
        const rows = await category_model.all();
        res.locals.categories = rows;
        next();
    } );
};