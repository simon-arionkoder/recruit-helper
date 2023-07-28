import { decodeBase64 } from './utils';

const DbService = require('./db');

let connection;

export const handler = async (event, context, callback) => {
    try{
        const queryParams = event.queryStringParameters;
        const sequence = queryParams.sequence;
        const step = queryParams.step;
        const url = queryParams.url;
        const client_id = queryParams.client_id;
        const campaign = {
            sequence,
            step,
            url: decodeBase64(url),
            client_id
        }
        if(!connection){
            connection = await new DbService().connect();
        }
        await connection.createCampaign(campaign);
        const clientCampaigns = await connection.getCampaign(campaign.client_id);
        console.log(`Client campaigns - ${JSON.stringify(clientCampaigns)}`)

        const response = {
            statusCode: 301,
            headers: {
            Location: decodeBase64(url),
            }
        };

        return response;
    }
    catch(e){
        const error = `Error in lambda execution - ${e}`;
        console.log(error);
        const response = {
            statusCode: 500,
            body: `${error}`
        };
        return response;
    }
}

