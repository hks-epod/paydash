'use strict';
var d3 = require('d3');

var queries = require('../../helpers/queries');
var dummy = require('../../helpers/dummy');

// exports.showPage = {
//     handler: function(request, reply) {
//         return reply.view('dashboard/block');
//     }
// };

exports.getData = {
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var user_id = 1;
        var queryString = queries.userBlocks(user_id);

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

            var final_array = [];
            var blockResponse = flatten(rows[0]);
            
            function flatten(obj) { // flatten but maintain the sort where obj key == array index
                var array = [];
                var len = Object.keys(obj).length;
                for (var i=0; i<len; i++) {
                    array.push(obj[i]['block_code']);
                }
                return array;
            }
            
            reply(final_array);
        });
    }
};
