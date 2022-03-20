const database = require( '../utils/database' );
const TABLE = "users";
module.exports = {
    all: _ => database.load( `select * from ${ TABLE }` ),
    add: ( entity ) => database.add( entity, TABLE ),
    singleByUsername: async ( username ) =>
    {
        const rows = await database.single( { f_Username: username }, TABLE );
        if ( rows.length === 0 )
            return null;
        return rows[ 0 ];
    },
};