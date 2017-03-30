const del = require('del');

exports.cleanDist = () => del('client-dist');
exports.cleanTmp = () => del('tmp');
