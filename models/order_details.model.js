const database = require( '../utils/database' );
const TABLE = 'orderdetails';

module.exports = {
    add: entity => database.add( entity, TABLE ),
};