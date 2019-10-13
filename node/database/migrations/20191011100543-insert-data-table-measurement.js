'use strict';

var moment = require('moment');
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

    const cities = ['City 01','City 02','City 03','City 04','City 05','City 06','City 07', 'City 08', 'City 09', 'City 10'];

    cities.forEach( city => {
        const temperature = (Math.random() * (3 + 3) - 3).toFixed(1);
        const days = (Math.random() * (30 - 1) + 1).toFixed(0);
        const d = new Date();
        d.setDate(d.getDate() - days);

        var formattedDate = moment(d).format('YYYY-MM-DD HH:mm:ss');
        console.log(formattedDate);


        db.insert('measurement',
            ['unit_id', 'temperature', 'unix_timestamp'],
            [city, temperature, formattedDate],
            function (err) {
                if (err) return callback(err);
                return callback();
            }
        );
    });

    return null;
};

exports.down = function (db) {
    return null;
};

exports._meta = {
    "version": 1
};
