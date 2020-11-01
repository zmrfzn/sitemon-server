import fs from 'fs';
import * as http from 'http2';
import { sitedata, siteStatus } from '../models/sitedata.model';
import path from 'path'
import { request } from 'express';



const filePath = path.resolve('src/app/assets/sites.json');

export const testMethod = async (): Promise<siteStatus[]> => {

    let filedata: sitedata[];
    let health: siteStatus[] = [];

    var fileContents = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
    filedata = JSON.parse(fileContents);

    let promiseList = filedata.map(client => getStatus(client.clientUrl, client.name))


    await Promise.all(promiseList).then(resultList => {
        resultList.forEach(result => {
           
            // const res = result as siteStatus;
            // // console.log("Result: ", result);
            // // console.log("typeof: ", typeof(res));
            health.push(result as siteStatus);
            // return result;
        } );
    });

    

    // filedata.forEach(async item => {
    //     let client = http.connect(item.clientURL);
    //     const req = client.request(
    //         { ':method': 'GET', ':path': '/' });

    //     let status: any;
    //     await req.on('response', async (responseHeaders) => {
    //         console.log("status : " + responseHeaders[":status"]);
    //         status = responseHeaders[":status"];
    //     });
    //     health.push({ name: item.name, clientURL: item.clientURL, status: status })
    // })
    return health;
}

function getStatus(url: string, clientName: string) {
    return new Promise((resolve, reject) => {

        let client = http.connect(url);
        const req = client.request(
            { ':method': 'GET', ':path': '/' });
        req.on('response',  (responseHeaders) => {
            resolve({clientUrl: url,name:clientName, status: responseHeaders[":status"]})
        });

        req.end();
        // request(url, function (error: { message: string; }, response: { statusCode: number; }, body: any) {
        //     resolve({ site: url, status: (!error && response.statusCode == 200) ? "OK" : "Down: " + error.message });
        // });
    })
}