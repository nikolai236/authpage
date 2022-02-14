const query = require('../db');
const multipleColumnSets = require('../utils/multipleColumnSets');

class Order {
    table='orders';

    addOrder = async (user, items) => {
        const sql = `INSERT INTO ${this.table} (user_id, item_ids) VALUES (?, ?)`

        const values = [
            user?.id || user,
            ...(items.map(i => i?.id || i ))
        ];
        const result = await query(sql, values);
        return result?.affectedRows || 0;
    }

    getOrder = async (params) => {
        
    }

    updateOrder = async (parms, update) => {
        const { values, columnSet } = multipleColumnSets(params);
        const key = Object.keys(update)[0];

        const sql = `UPDATE ${this.table} SET ${key} = ${update[key]} WHERE ${columnSet}`;
        
        const result = await query(sql, [...values]);
        return result?.affectedRows || 0;
    }

    deleteOrder = async (params) => {
        const { values, columnSet } = multipleColumnSets(params);
        const sql = `DELETE FROM ${this.table} WHERE ${columnSet}`;

        const result = await query(sql, [...values])[0];
        return result?.affectedRows || 0
    }
}

module.exports = new Order;