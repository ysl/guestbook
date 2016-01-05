var cfg = require('nconf');

/* GET home page. */
exports.home = function(req, res) {
    var db = req.app.get('db');
    db.getGuestbook(function(err, rows) {
        if (err) {
            throw err;
        } else {
            var s3UrlBase = 'https://s3-' + cfg.get('aws:region') + '.amazonaws.com/' + cfg.get('aws:s3Bucket') + '/';
            res.render('index', { 'rows': rows, 's3UrlBase': s3UrlBase });
        }
    });
};

exports.post = function(req, res) {
    var name = req.body.name;
    var message = req.body.message;

    console.log(req.body);
    console.log(req.file);

    // Compose the photo path.
    var photoPath;
    if (req.file) {
        photoPath = 'images/' + req.file.filename;
    }

    // Write record to db.
    var db = req.app.get('db');
    db.setGuestbook(name, message, photoPath, function(err, rows) {
        if (err) {
            console.log('Write db failed.');
            throw err;
        }

        // Upload image.
        if (req.file) {
            var aws = req.app.get('aws');
            aws.uploadImage(req.file.filename, req.file.path, function(err, data) {
                if (err) {
                    console.log('Upload image to S3 failed.');
                    throw err;
                }

                res.redirect('/');
            });
        } else {
            res.redirect('/');
        }
    });

};
