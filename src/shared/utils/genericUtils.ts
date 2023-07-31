import { APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy";
import { gzip } from "zlib";

export async function createResponse(statusCode: number, body: string): Promise<APIGatewayProxyResult> {
    const bodyBuffer = Buffer.from(body);
    return new Promise((resolve, reject) => {
        gzip(bodyBuffer, (e, result) => {
            if (e) {
                reject(e);
            } else {
                resolve({
                    statusCode,
                    isBase64Encoded: true,
                    body: result.toString('base64'),
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Encoding': 'gzip',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Accept,Content-Type,x-api-key',
                        'Access-Control-Allow-Methods': 'GET,OPTIONS,PUT,POST',
                        'Strict-Transport-Security': 'max-age=3600'
                    }
                });
            }
        });

    });
}