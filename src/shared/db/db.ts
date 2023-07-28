import { Connection, ConnectionConfig, createConnection } from 'mysql2/promise'

export class DbUtils{
    connection: Connection;
    async connect(): Promise<Connection>{
        try{
            const config: Partial<ConnectionConfig> = {
                host     : process.env.DB_HOST,
                user     : process.env.DB_USERNAME,
                password : process.env.DB_SECRET,
                port     : 3306
            }
            this.connection = await createConnection(config);
            await this.connection.query(`USE recruit-helper;`)
            return this.connection;
        } catch(e){
            console.log('Error connecting to DB - ', e);
            throw e;
        }
    }
    
}