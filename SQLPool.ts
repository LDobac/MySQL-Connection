import mysql, { MysqlError } from "mysql";
import { DBConfig } from "./";

class SQLPool
{
    public pool : mysql.Pool;

    constructor()
    {
        this.pool = mysql.createPool(DBConfig);
    }

    GetConnection(callback : (connection : mysql.PoolConnection) => void)
    {
        this.pool.getConnection((err : MysqlError, connection : mysql.PoolConnection) => {
            if (err)
            {
                console.log('Mysql GetConnection Error!');
                console.log(err.message);
            }

            callback(connection);
            connection.release();
        });
    }

    Close()
    {
        this.pool.end((err : mysql.MysqlError) => {
            if (err)
            {
                console.log('Mysql Pool Close Error!');
                console.log(err);
            }
        });
    }
}

export default new SQLPool();

