'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var alertModel = function() {

    var alertSchema = mongoose.Schema({
        block_id: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        message: String,
        created: Date,
        updated: Date
    });

    return mongoose.model('Alert', alertSchema);
};

module.exports = new alertModel();
