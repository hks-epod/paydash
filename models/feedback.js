'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedbackModel = function() {

    var feedbackSchema = mongoose.Schema({
        feedback_id: {
            type: Schema.ObjectId,
            ref: 'Alert'
        },
        message: String
    });

    return mongoose.model('Feedback', feedbackSchema);
};

module.exports = new feedbackModel();
