const fs = require('fs');
const path = require('path');
const fetch = require('./fetch');

const outputFile = process.argv[3];
const outputStream = fs.createWriteStream(path.join(__dirname, '../', outputFile));
let info;
let shouldRetryRequest = false;

module.exports = function sendRequest(href) {
    fetch(href).then(d => {
        console.log(`Initial url: ${href}`);
        try {
            info = JSON.parse(d);
            if (info.responseCode) {
                console.log(info.id);
                console.log(info.ruleGroups.SPEED);
                outputStream.write(`Initial url: ${href}\r\n
                                    ${JSON.stringify(info.id)}\r\n
                                    ${JSON.stringify(info.ruleGroups.SPEED)}\r\n
                                    ${JSON.stringify(info.pageStats)}\r\n`);
            }
            else if(info.error.code){
                shouldRetryRequest = !shouldRetryRequest;
                console.log(info.error.message);
                if (!shouldRetryRequest) {
                    outputStream.write(`Initial url: ${href}\r\n
                                        Error message: ${info.error.message}\r\n`);
                }
                else {
                    sendRequest(href);
                }
            }
        }
        catch (error){
            console.log(`Fail to parse JSON : ${error}`);
            outputStream.write(`Fail to parse JSON : ${error}`);
        }
    });
};
