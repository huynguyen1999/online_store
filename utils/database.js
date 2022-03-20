const mysql = require( 'mysql' );
const util = require( 'util' );
const pool = mysql.createPool( {
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: 'chawesome',
    database: 'QLBH',
    port: 3306,
    connectionLimit: 50,
    charset: 'utf8mb4_bin',
} );

const pool_query = util.promisify( pool.query ).bind( pool );

module.exports = {
    load: ( sql ) => pool_query( sql ),
    add: ( entity, table ) => pool_query( `insert into ${ table } set ?`, entity ),
    single: ( condition, table ) => pool_query( `select * from ${ table } where ?`, condition ),
    delete: ( condition, table ) => pool_query( `delete from ${ table } where ?`, condition ),
    patch: ( entity, condition, table ) => pool_query( `update ${ table } set ? where ?`, [ entity, condition ] )
};