const path = require('path');
const mysql = require('mysql2/promise')

class DbUtils{
    connection;
    async connect(){
        try{
            this.connection = await mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USERNAME,
                password : process.env.DB_SECRET,
                port     : process.env.DB_PORT
            });
            await this.connection.query(`USE horse;`)
            return this;
        } catch(e){
            console.log('Error connecting to DB - ', e);
            throw e;
        }
    }
    
    async getCampaign(clientId){
        try{
            const [rows, fields] = await this.connection.query(`
                SELECT * FROM campaign WHERE client_id = ?`, clientId
            );
            return rows;
        } catch(e){
            console.log(`Error querying campaigns - ${e}`)
            throw e;
        }
    }
    async createCampaign(campaign){
        try{
            const [rows,fields] = await this.connection.query(`
                INSERT INTO campaign values(DEFAULT ,?, ?, ?, ?, now())
            `, [campaign.sequence, campaign.step, campaign.url, campaign.client_id]);
            return rows;
        } catch(e){
            console.log(`Error creating campaigns - ${e}`)
            throw e;
        }
    }
}

module.exports = DbUtils;