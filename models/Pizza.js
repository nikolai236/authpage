const query = require('../db');
const multipleColumnSets = require('../utils/multipleColumnSets');

class Pizza {
    table = 'pizzas'

    addPizza = async data => {
        const sql = `INSERT INTO ${this.table} (name, category, price) VALUES (?, ?, ?)`;
        const values = Object.values(data);

        const result = await query(sql, [...values]);
        return result?.affectedRows || 0;
    }

    getPizzas = async () => {
        const sql = `SELECT * FROM ${this.table}`;

        const pizzas = await query(sql);

        return pizzas;
    }

    getPizza = async params => {
        const { values, columnSet } = multipleColumnSets(params);
        const sql = `SELECT * FROM ${this.table} WHERE ${columnSet}`;

        const pizzas = await query(sql, [...values]);

        return pizzas;
    }

    deletePizza = async params => {
        const { values, columnSet } = multipleColumnSets(params);
        const sql = `DELETE FROM ${this.table} WHERE ${columnSet}`;

        const result = await query(sql, [...values])[0];
        return result?.affectedRows || 0;
    }
}

module.exports = new Pizza;