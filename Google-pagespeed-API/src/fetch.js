const https = require('https');
const validateUrl = require('./validateUrl');

const API = 'https://www.googleapis.com/pagespeedonline/v4/runPagespeed/';
const API_KEY = 'AIzaSyDRkNCs3VEih5rQS74V0sPhTJJrzUqWlLo';
const STRATEGY = 'desktop';
let body = '';

module.exports = function fetch(url){
    url = validateUrl(url);
    return new Promise((resolve, reject) => {
        https.get(`${API}?url=${url}&key=${API_KEY}&${STRATEGY}`, (res) => {
            res.setEncoding('utf-8');
            res.on('data', (d) => {
                body += d;
            });
            res.on('end', () => {
                resolve(body);
                body = '';})
        }).on('error', (e) => {
            console.log("Got an error: ", e);
            reject(e);
        });
    });
};
