const session = require( 'express-session' );
const MYSQLStore = require( 'express-mysql-session' )( session );

const options = {
    host: 'localhost',
    user: 'root',
    password: 'chawesome',
    database: 'QLBH',
    port: 3306
};
const session_store = new MYSQLStore( options );
module.exports = app =>
{
    app.set( 'trust proxy', 1 );
    app.use( session( {
        secret: 'fucking secret',
        resave: false,
        saveUninitialized: true,
        cookie: {},
        store: session_store
    } ) );
};