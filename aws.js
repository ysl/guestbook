var cfg = require('nconf');
var AWS = require('aws-sdk');
var fs = require('fs');

AWS.config.update({
    accessKeyId: cfg.get('aws:accessKeyId'),
    secretAccessKey: cfg.get('aws:secretAccessKey'),
    region: cfg.get('aws:region')
});


var s3bucket = new AWS.S3({ params: { Bucket: cfg.get('aws:s3Bucket') } });

exports.uploadImage = function(filename, path, callback) {
    var fileStream = fs.createReadStream(path);
    var params = {
        Key: 'images/' + filename,
        Body: fileStream,
        ACL:'public-read'
    };

    s3bucket.upload(params, function(err, data) {
        callback(err, data);
    });
};
