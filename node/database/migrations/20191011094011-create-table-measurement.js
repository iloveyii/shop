'use strict';
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

exports.up = function (db, callback) {

    db.createTable('measurement', {
            columns: {
                id: {type: 'int', primaryKey: true, autoIncrement: true},
                unit_id: {type: 'string', length: 50},
                temperature: {type: 'decimal', length: '10,1'},
                unix_timestamp: {type: 'timestamp', defaultValue: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'},
            },
            ifNotExists: true
        }, function (err) {
            if (err) return callback(err);
            return callback();
        }
    );
};

exports.down = function (db, callback) {
    db.dropTable('measurement', callback);
};

exports._meta = {
    "version": 1
};
