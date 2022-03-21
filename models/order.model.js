const database = require( '../utils/database' );
const TABLE = 'orders';
module.exports = {
    add: async entity =>
    {
        const ret = await database.add( entity, TABLE );
        return ret;
    }

};