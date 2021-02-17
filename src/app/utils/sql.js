const util = require('util');
const Manager = require('../../database/PostgresManager');

const parseWhere = (clauses = []) => {
    if(!util.isArray(clauses)){
        throw Error('Clauses must be an array of string');
    }
    let where = clauses.join(" ");
    if(where){
        return `WHERE ${where}`.replace(/WHERE AND/gi, 'WHERE');
    }
    return "";
};

const closeConnection = async (conn) => {
    try {
        await Manager.closeConnection(conn);
    } catch(error) {
        console.log(error.message);
    }
};

module.exports = {
    parseWhere,
    closeConnection
}