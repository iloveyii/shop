'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {

  db.createTable('login', {
        columns: {
          id: {type: 'int', primaryKey: true, autoIncrement: true},
          email: {type: 'string', length: 50},
          username: {type: 'string', length: 50},
          password: {type: 'string', length: 32},
          token: {type: 'string', length: 32},
          admin: {type: 'int'}
        },
        ifNotExists: true
      }, function (err) {
        if (err) return callback(err);
        return callback();
      }
  );
};

exports.down = function (db, callback) {
  db.dropTable('login', callback);
};

exports._meta = {
  "version": 1
};
