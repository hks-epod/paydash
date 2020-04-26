'use strict';

const Queries = require('../../helpers/queries');

exports.show = {
    description: 'Delayed musters tables',
    handler: function(request, reply) {
        const pachayat_code = request.query.pc
        var sequelize = request.server.plugins.sequelize.db.sequelize;
        
        var queryString = Queries.panchayat_delayed_musters(pachayat_code);

        console.log(queryString)
        sequelize
            .query(queryString, {
                type: sequelize.QueryTypes.SELECT
            })
            .then(function(rows) {

                console.log(rows)

                if (rows.length == 0) {
                    return reply.view('delayed_musters/delayed_musters', { error: 'Panchayat not found' });
                }

               console.log(rows[0])

               const today = new Date()

               const tomorrow = new Date()
               tomorrow.setDate(today.getDate() + 1)

               
               const delayed_muster_rows = rows.map(function(d) {

                    const end_date = new Date(d.end_date)

                    const date_t8 = new Date()
                    date_t8.setDate(end_date.getDate() + 8)


                    let days_delayed = -1
                    let delay_step = ''

                    switch(d.step) {
                        case "ds_t2":
                            delay_step = 'T + 2'
                            const date_t2 = new Date()
                            date_t2.setDate(end_date.getDate() + 2)
                            days_delayed = datediff(date_t2, today)
                            break;
                        case "ds_t5":
                            delay_step = 'T + 5'
                            const date_t5 = new Date()
                            date_t5.setDate(end_date.getDate() + 5)
                            days_delayed = datediff(date_t5, today)
                            break;
                        case "ds_t6":
                            delay_step = 'T + 6'
                            const date_t6 = new Date()
                            date_t6.setDate(end_date.getDate() + 6)
                            days_delayed = datediff(date_t6, today)
                            break;
                        case "ds_t7":
                            delay_step = 'T + 7'
                            const date_t7 = new Date()
                            date_t7.setDate(end_date.getDate() + 7)
                            days_delayed = datediff(date_t7, today)
                            break;
                        case "ds_t8":
                            delay_step = 'T + 8'
                            days_delayed = datediff(date_t8, today)
                            break;
                    }

                    return {
                        msr_no: d.msr_no,
                        panchayat_name: d.panchayat_name,
                        work_name: d.work_name,
                        work_code: d.work_code,
                        end_date: d.end_date,
                        delay_step: delay_step,
                        days_delayed: days_delayed,
                        date_t8: date_t8
                    };
                })

                const actionable_musters = delayed_muster_rows.filter(function(a) {
                    const days_since_t8 = datediff(a.date_t8, today)
                    return days_since_t8 < 1
                }).sort(function(a,b) {
                    if (a.days_delayed > b.days_delayed) return 1
                    if (a.days_delayed < b.days_delayed) return -1
                    return 0
                }).map(function(d, i) {
                    return {
                        "S. No.": i + 1,
                        "Panchayat name": d.panchayat_name,
                        "Work code": d.work_code,
                        "Muster Roll no.": d.msr_no,
                        "Delay step": d.delay_step,
                        "No. of days delayed at step": d.days_delayed,
                        "End date": d.end_date.toISOString().slice(0,10),
                        "T + 8 day": d.date_t8.toISOString().slice(0,10)
                    };
                })

                const other_musters = delayed_muster_rows.filter(function(a) {
                    const days_since_t8 = datediff(a.date_t8, today)
                    return days_since_t8 >= 1
                }).sort(function(a,b) {
                    if (a.days_delayed > b.days_delayed) return 1
                    if (a.days_delayed < b.days_delayed) return -1
                    return 0
                }).map(function(d, i) {
                    return {
                        "S. No.": i + 1,
                        "Panchayat name": d.panchayat_name,
                        "Work code": d.work_code,
                        "Muster Roll no.": d.msr_no,
                        "Delay step": d.delay_step,
                        "No. of days delayed at step": d.days_delayed,
                        "End date": d.end_date.toISOString().slice(0,10),
                        "T + 8 day": d.date_t8.toISOString().slice(0,10)
                    };
                })

                return reply.view('delayed_musters/delayed_musters', { 
                    actionable_musters: actionable_musters,
                    other_musters: other_musters
                });
        });

        
    }
};

function datediff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
}

function filter_t8_not_crossed() {

}
