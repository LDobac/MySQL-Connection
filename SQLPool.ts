import mysql, { MysqlError } from "mysql";
import { DBConfig } from "./";

class SQLPool
{
    public pool : mysql.Pool;

    constructor()
    {
        this.pool = mysql.createPool(DBConfig);
    }

    async GetConnection()
    {
        try
        {
            return await this.pool.getConnection(async conn => conn);    
        }
        catch(err)
        {
            console.log('Mysql GetConnection Error!');
            console.log(err.message);

            return false;
        }
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

