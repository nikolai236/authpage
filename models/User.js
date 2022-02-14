const query = require('../db');
const multipleColumnSets = require('../utils/multipleColumnSets');

class User{
    table = 'users'

    async addUser(data) {
        const sql = `INSERT INTO ${this.table} (username, password, email) VALUES (?, ?, ?)`;

        const {
            password,
            username,
            email
        } = data;
        const values = [username, password, email];
        const result = await query(sql, values);

        return result?.affectedRows || 0;
    }

    // async getUserById(id) {
    //     const sql = `SELECT * FROM ${this.table} WHERE id=?`;

    //     const user =  await query(sql, id)[0];

    //     delete user?.id;

    //     return user;
    // }

    // getUserByEmail = async (email) => {
    //     console.log(email + ' l');
    //     const sql = `SELECT * FROM ${this.table} WHERE email = ?`;

    //     const user = await query(sql, [email]);

    //     console.log(user + ' getUserByEmail');
    //     delete user[0].id;
    //     return user[0];
    // }

    getUser = async (params) => {
        const { values, columnSet } = multipleColumnSets(params);
        const sql = `SELECT * FROM ${this.table} WHERE ${columnSet}`;

        const user = await query(sql, [...values])[0];
        return user[0];
    }
    
    async updateUserById(params, update) {
        const { values, columnSet } = multipleColumnSets(params);
        const key = Object.keys(update)[0];

        const sql = `UPDATE ${this.table} SET ${key} = ${update[key]} WHERE ${columnSet}`;
        
        const result = await query(sql, [...values]);
        return result?.affectedRows || 0;
    }

    async deleteUser(params) {
        const { values, columnSet } = multipleColumnSets(params);
        const sql = `DELETE FROM ${this.table} WHERE ${columnSet}`;

        const result = await query(sql, [...values])[0];
        return result?.affectedRows || 0;
    }
}

module.exports = new User;