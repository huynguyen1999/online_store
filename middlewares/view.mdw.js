const { engine } = require( 'express-handlebars' );
const numeral = require( 'numeral' );

module.exports = app =>
{
    app.engine( 'hbs', engine( {
        defaultLayout: 'main.hbs',
        extname: '.hbs',
        helpers: {
            section: function ( name, options )
            {
                if ( !this._sections ) this._sections = {};
                this._sections[ name ] = options.fn( this );
                return null;
            },
            format: ( price ) => numeral( price ).format( '0,0' ) + ' đ',
            equal: ( a, b, options ) => { if ( a === b ) return options.fn( this ); },
            not_equal: ( a, b, options ) => { if ( a !== b ) return options.fn( this ); },
            increment: ( a ) => +a + 1,
            decrement: ( a ) => +a - 1,
        }
    } ) );

    app.set( 'view engine', 'hbs' );
};