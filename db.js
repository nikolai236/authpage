const mysql = require('mysql2');

class DBConnection{
    constructor(){
        this.db = mysql.createPool({
            host: process.env.HOST,
            user: process.env.USR,
            password: process.env.PSW,
            database: process.env.DB,
        });

        this.checkConnection();
    }

    checkConnection() {
        this.db.getConnection((err, connection) => {
            if(err) {
                console.log(err);
            }
            if(connection) {
                console.log('sql connection succes');
                connection.release();
            }
            return;
        });
    }

    query = async (sql, values) => {
        return new Promise((resolve, reject) => {

            const cb = (error, result) => {
                if(error){
                    console.log(error);
                    reject(error);
                    return;
                }

                resolve(result);
            }
            this.db.execute(sql, values, cb);
        })
        .catch(err => console.log(err));
    }
}

module.exports = new DBConnection().query;