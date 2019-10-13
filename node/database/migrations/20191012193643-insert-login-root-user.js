'use strict';
var md5 = require('md5');
var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function (db) {
    db.insert('login',
        ['username', 'password'],
        ['root', md5('root')],
        function (err) {
            if (err) return callback(err);
            return callback();
        }
    );

    return null;
};

exports.down = function (db) {
    return null;
};

exports._meta = {
    "version": 1
};
