const database = require( '../utils/database' );
const configuration = require( '../config.json' );
const TABLE = "products";
module.exports = {
    all: _ => database.load( `select * from ${ TABLE }` ),
    byCat: CatID => database.load( `select * from ${ TABLE } where CatID = ${ CatID }` ),
    countByCat: async CatID =>
    {
        const rows = await database.load( `select count(*) as total 
                                        from ${ TABLE } where CatID = ${ CatID }` );
        return rows[ 0 ].total;
    },
    pageByCat: ( CatID, offset ) => database.load( `select * from ${ TABLE }
        where CatID = ${ CatID } limit ${ configuration.pagination.limit } offset ${ offset }` ),
    singleByID: async id =>
    {
        const rows = await database.single( { ProID: id }, TABLE );
        if ( rows.length === 0 ) return null;
        return rows[ 0 ];
    }
};