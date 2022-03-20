const auth = require( './auth.mdw' );

module.exports = app =>
{
    app.get( '/', ( req, res ) => res.render( 'home' ) );
    app.get( '/about', ( req, res ) => res.render( 'about' ) );
    app.use( '/admin/categories', require( '../routes/administrator/category.route' ) );
    app.use( '/admin/products', require( '../routes/administrator/product.route' ) );
    app.use( '/products', require( '../routes/user/product.route' ) );
    app.use( '/account', require( '../routes/front/account.route' ) );
    app.use( '/cart', auth, require( '../routes/front/cart.route' ) );
};