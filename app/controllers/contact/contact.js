'use strict';

const Queries = require('../../helpers/queries');
const D3 = require('d3');
const Utils = require('../../helpers/utils');


exports.getData = {
    auth: {
      scope : ['block', 'editor', 'district']
    },
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var userId = request.auth.credentials.id;
        var queryString = Queries.contact(userId);

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

            var contactResponse = D3.values(rows[0]);
            var regionsResponse = D3.values(rows[1]);

            var subjectLine = Utils.buildSubject(contactResponse[0].subject, regionsResponse);
            var data = {
                'phone': contactResponse[0].phone,
                'email': contactResponse[0].email,
                'subject': subjectLine
            };
            reply.view('contact/contact', {info: data});
        });
    }
};
