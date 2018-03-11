module.exports = function validateUrl(url) {
    url = (/^http/i.test(url)) ? url : 'http://' + url;
    return url;
};
