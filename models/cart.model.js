const product_model = require( '../models/product.model' );
module.exports = {
    add: ( cart, item ) =>
    {
        for ( ci of cart )
            if ( ci.id === item.id )
            {
                ci.quantity += item.quantity;
                return;
            }
        cart.push( item );
    },
    get_number_of_items: ( cart ) =>
    {
        let total = 0;
        for ( ci of cart )
            total += ci.quantity;
        return total;
    },
    remove: ( cart, id ) =>
    {
        let x = 0;
        for ( let i = 0; i < cart.length; i++ )
            if ( cart[ i ].id === id )
            {
                cart.splice( i, 1 );
                return;
            }
    },

};