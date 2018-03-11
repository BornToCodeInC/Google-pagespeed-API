const fs = require('fs');
const path = require('path');
const readline = require('readline');
const sendRequest = require('./src/sendRequest');

const inputFile = process.argv[2];
const inputStream = fs.createReadStream(path.join(__dirname, inputFile));
const line = readline.createInterface({
    input: inputStream,
});

line.on('line', (href) => {
    sendRequest(href);
});
