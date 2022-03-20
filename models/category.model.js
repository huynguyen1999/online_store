const database = require( '../utils/database' );
const TABLE = "categories";
module.exports = {
    all: () => database.load( `
                select ctg.CatID, ctg.CatName, count(ProID) as ProductCount
                from ${ TABLE } as ctg left join products as prd on ctg.CatID = prd.CatID
                group by ctg.CatID`),
    add: ( entity ) => database.add( entity, TABLE ),
    single: async ( id ) =>
    {
        const rows = await database.single( { CatID: id }, TABLE );
        if ( rows.length === 0 )
            return null;
        return rows[ 0 ];
    },
    delete: ( entity ) => database.delete( { CatID: entity.CatID }, TABLE ),
    patch: ( entity ) =>
    {
        const condition = { CatID: entity.CatID };
        delete entity.CatID; // chỉ update các giá trị còn lại ngoại trừ CatID vì đó là primary key
        database.patch( entity, condition, TABLE );
    }

};