var cfg = require('nconf');
var mysql = require('mysql');
var db_config = {
    host: cfg.get('db:host'),
    user: cfg.get('db:user'),
    password: cfg.get('db:password'),
    database: cfg.get('db:database')
};

var connection;

function handleDisconnect() {
    connection = mysql.createConnection(db_config);

    connection.connect(function(err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
    });

    connection.on('error', function(err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();


module.exports = {
    getGuestbook: function(callback) {
        connection.query('SELECT * FROM `guestbook` ORDER BY `date` DESC;', function(err, rows, fields) {     
            callback(err, rows);
        });
    },
    setGuestbook: function(name, message, photo_path, callback) {
        connection.query('INSERT INTO `guestbook`(`name`, `message`, `photo_path`) VALUE(?, ?, ?);', 
            [name, message, photo_path], function(err, rows, fields) {     
            callback(err, rows);
        });
    }
};
