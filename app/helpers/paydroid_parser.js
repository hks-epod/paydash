'use strict';

const D3 = require('d3');
const Utils = require('./utils');

exports.v1 = function(rows, userId, name, userMobile) {
    var overviewResponse = D3.values(rows[0]);

    var cardsResponse = D3.values(rows[1]);

    var blockResponse = D3.values(rows[2]);

    var panchayatResponse = D3.values(rows[3]);

    var notificationsResponse = D3.values(rows[4]);

    var stateResponse = D3.values(rows[5]);

    var contactResponse = D3.values(rows[6]);

    var regionsResponse = D3.values(rows[7]);

    // Parse the overview response
    var current_total = overviewResponse[0].current_total;
    var delayed_total = overviewResponse[0].delayed_total;
    var days_to_payment = overviewResponse[0].days_to_payment;
    var total_transactions = overviewResponse[0].total_transactions;

    var state_code = stateResponse[0].state_code;

    // Nest the cards response and include the overview stats
    var cards = D3.nest()
        .key(function(d) {
            var key = d.staff_id + d.block_code;
            return key;
        })
        .rollup(function(v) {
            return {
                name: v[0].name,
                staff_id: v[0].staff_id,
                designation: v[0].task_assign,
                mobile: v[0].mobile_no,
                block_name: v[0].block_name,
                current_total: v[0].current_total,
                delayed_total: v[0].delayed_total,
                delayed_musters: v
                    .filter(function(d) {
                        return d.type === 'delayed_musters';
                    })
                    .map(function(d) {
                        return {
                            msr_no: d.msr_no,
                            panchayat_name: d.panchayat_name,
                            work_name: d.work_name,
                            work_code: d.work_code,
                            closure_date: d.end_date,
                            days_pending: d.days_pending,
                            step: d.step
                        };
                    }),
                current_musters: v
                    .filter(function(d) {
                        return d.type === 'current_musters';
                    })
                    .map(function(d) {
                        return {
                            msr_no: d.msr_no,
                            panchayat_name: d.panchayat_name,
                            work_name: d.work_name,
                            work_code: d.work_code,
                            closure_date: d.end_date
                        };
                    })
            };
        })
        .entries(cardsResponse)
        .map(function(d) {
            return d.value;
        })
        .sort(function(a, b) {
            var aActive = a.current_total + a.delayed_total > 0 ? 1 : 0;
            var bActive = b.current_total + b.delayed_total > 0 ? 1 : 0;
            var aUnmapped = a.name.toLowerCase() === 'unmapped' ? 1 : 0;
            var bUnmapped = b.name.toLowerCase() === 'unmapped' ? 1 : 0;

            // ORDER BY active DESC, unmapped, delayed_total DESC, current_total DESC, name;"

            if (aActive < bActive) return 1;
            if (aActive > bActive) return -1;
            if (aUnmapped < bUnmapped) return -1;
            if (aUnmapped > bUnmapped) return 1;
            if (a.delayed_total < b.delayed_total) return 1;
            if (a.delayed_total > b.delayed_total) return -1;
            if (a.current_total < b.current_total) return 1;
            if (a.current_total > b.current_total) return -1;
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });

    // Nest the block response
    var blockPerformance = D3.nest()
        .key(function(d) {
            return d.block_code;
        })
        .rollup(function(v) {
            return {
                block_code: v[0].block_code,
                block_name: v[0].block_name,
                data: v.map(function(d) {
                    return [
                        d.date.getFullYear() +
                            '' +
                            Utils.padNum(d.date.getMonth() + 1) +
                            '' +
                            Utils.padNum(d.date.getDate()),
                        d.mrc_mre,
                        d.mre_wlg,
                        d.wlg_wls,
                        d.wls_fto,
                        d.fto_sn1,
                        d.sn1_sn2,
                        d.sn2_prc,
                        d.tot_trn
                    ];
                })
            };
        })
        .entries(blockResponse)
        .map(function(d) {
            return d.value;
        })
        .sort(function(a, b) {
            var aTarget = a.data[a.data.length - 1];
            var bTarget = b.data[b.data.length - 1];
            var aSum =
                aTarget[1] +
                aTarget[2] +
                aTarget[3] +
                aTarget[4] +
                aTarget[5] +
                aTarget[6] +
                aTarget[7];
            var bSum =
                bTarget[1] +
                bTarget[2] +
                bTarget[3] +
                bTarget[4] +
                bTarget[5] +
                bTarget[6] +
                bTarget[7];
            return bSum - aSum;
        });

    // Nest the panchayat response
    var panchayatPerformance = D3.nest()
        .key(function(d) {
            return d.panchayat_code;
        })
        .rollup(function(v) {
            return {
                block_code: v[0].block_code,
                panchayat_code: v[0].panchayat_code,
                panchayat_name: v[0].panchayat_name,
                data: v.map(function(d) {
                    return [
                        d.date.getFullYear() +
                            '' +
                            Utils.padNum(d.date.getMonth() + 1) +
                            '' +
                            Utils.padNum(d.date.getDate()),
                        d.mrc_mre,
                        d.mre_wlg,
                        d.wlg_wls,
                        d.wls_fto,
                        d.fto_sn1,
                        d.sn1_sn2,
                        d.sn2_prc,
                        d.tot_trn
                    ];
                })
            };
        })
        .entries(panchayatResponse)
        .map(function(d) {
            return d.value;
        })
        .sort(function(a, b) {
            var aTarget = a.data[a.data.length - 1];
            var bTarget = b.data[b.data.length - 1];
            var aSum =
                aTarget[1] +
                aTarget[2] +
                aTarget[3] +
                aTarget[4] +
                aTarget[5] +
                aTarget[6] +
                aTarget[7];
            var bSum =
                bTarget[1] +
                bTarget[2] +
                bTarget[3] +
                bTarget[4] +
                bTarget[5] +
                bTarget[6] +
                bTarget[7];
            return bSum - aSum;
        });

    var subjectLine = Utils.buildSubject(name, regionsResponse, userId, userMobile);

    var headers = [
        'date',
        'mrc_mre',
        'mre_wlg',
        'wlg_wls',
        'wls_fto',
        'fto_sn1',
        'sn1_sn2',
        'sn2_prc',
        'tot_trn'
    ];

    var data = {
        overview: {
            current_total: current_total,
            delayed_total: delayed_total,
            days_to_payment: days_to_payment,
            total_transactions: total_transactions,
            cards_total: cards.length
        },
        cards: cards,
        block_performance: blockPerformance,
        panchayat_performance: panchayatPerformance,
        notifications: notificationsResponse,
        config: {
            headers: headers,
            labels: [
                'Date',
                'Muster roll closure to muster roll entry',
                'Muster roll entry to wage list generation',
                'Wage list generation to wage list sent',
                'Wage list sent to FTO generation',
                'FTO generation to first signature',
                'First signature to second signature',
                'Second signature to processed by bank',
                'Total Transactions'
            ]
        },
        contact: {
            phone: contactResponse[0].phone,
            email: contactResponse[0].email,
            subject: subjectLine
        }
    };

    return data;
};

exports.v2 = function(rows, role, userId, name, userMobile) {
    function parse_block(rows) {
        var overviewResponse = D3.values(rows[0]);

        var cardsResponse = D3.values(rows[1]);

        var blockResponse = D3.values(rows[2]);

        var panchayatResponse = D3.values(rows[3]);

        var stateResponse = D3.values(rows[4]);

        var contactResponse = D3.values(rows[5]);

        var regionsResponse = D3.values(rows[6]);

        var versionResponse = D3.values(rows[7]);

        // Parse the overview response
        var overview = D3.nest()
            .key(function(d) {
                return d.block_code;
            })
            .rollup(function(v) {
                return {
                    block_code: v[0].block_code,
                    block_name: v[0].block_name,
                    current_total: v[0].current_total,
                    delayed_total: v[0].delayed_total,
                    delayed_no_t5: v[0].delayed_no_t5,
                    days_to_payment: v[0].days_to_payment
                };
            })
            .entries(overviewResponse)
            .map(function(d) {
                return d.value;
            });

        var state_code = stateResponse[0].state_code;

        // Nest the cards response and include the overview stats
        var cards = D3.nest()
            .key(function(d) {
                var key = d.staff_id + d.block_code;
                return key;
            })
            .rollup(function(v) {
                return {
                    name: v[0].name,
                    staff_id: v[0].staff_id,
                    designation: v[0].task_assign,
                    mobile: v[0].mobile_no,
                    block_name: v[0].block_name,
                    current_total: v[0].current_total,
                    delayed_total: v[0].delayed_total,
                    delayed_no_t5: v[0].delayed_no_t5,
                    delayed_musters: v
                        .filter(function(d) {
                            return d.type === 'delayed_musters';
                        })
                        .map(function(d) {
                            return {
                                msr_no: d.msr_no,
                                panchayat_name: d.panchayat_name,
                                work_name: d.work_name,
                                work_code: d.work_code,
                                closure_date: d.end_date,
                                days_pending: d.days_pending,
                                step: d.step
                            };
                        })
                        .sort(function(a,b) {
                        var aStep = a.step;
                        var bStep = b.step;
                        var aMsr_no = a.msr_no;
                        var bMsr_no = b.msr_no;

                        if (aStep > bStep) return 1;
                        if (aStep < bStep) return -1;
                        if (aMsr_no > bMsr_no) return 1;
                        if (aMsr_no < bMsr_no) return -1;
                        return 0;
                        }),
                    current_musters: v
                        .filter(function(d) {
                            return d.type === 'current_musters';
                        })
                        .map(function(d) {
                            return {
                                msr_no: d.msr_no,
                                panchayat_name: d.panchayat_name,
                                work_name: d.work_name,
                                work_code: d.work_code,
                                closure_date: d.end_date
                            };
                        })
                };
            })
            .entries(cardsResponse)
            .map(function(d) {
                return d.value;
            })
            .sort(function(a, b) {
                var aActive = a.current_total + a.delayed_total > 0 ? 1 : 0;
                var bActive = b.current_total + b.delayed_total > 0 ? 1 : 0;
                var aUnmapped = a.name.toLowerCase() === 'unmapped' ? 1 : 0;
                var bUnmapped = b.name.toLowerCase() === 'unmapped' ? 1 : 0;

                // ORDER BY active DESC, unmapped, delayed_total DESC, current_total DESC, name;"

                if (aActive < bActive) return 1;
                if (aActive > bActive) return -1;
                if (aUnmapped < bUnmapped) return -1;
                if (aUnmapped > bUnmapped) return 1;
                if (a.delayed_total < b.delayed_total) return 1;
                if (a.delayed_total > b.delayed_total) return -1;
                if (a.current_total < b.current_total) return 1;
                if (a.current_total > b.current_total) return -1;
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });

        // Nest the block response
        var blockPerformance = D3.nest()
            .key(function(d) {
                return d.block_code;
            })
            .rollup(function(v) {
                return {
                    block_code: v[0].block_code,
                    block_name: v[0].block_name,
                    data: v.filter(function(d) { return d.tot_trn!==null; })
                        .map(function(d) {
                        return [
                            d.year + '' + Utils.padNum(d.month) + '' + Utils.padNum(1),
                            d.mrc_mre,
                            d.mre_wlg,
                            d.wlg_wls,
                            d.wls_fto,
                            d.fto_sn1,
                            d.sn1_sn2,
                            d.sn2_prc,
                            d.mrc_prc,
                            d.tot_trn
                        ];
                    })
                };
            })
            .entries(blockResponse)
            .map(function(d) {
                return d.value;
            });

        // Nest the panchayat response
        var panchayatPerformance = D3.nest()
            .key(function(d) {
                return d.panchayat_code;
            })
            .rollup(function(v) {
                return {
                    block_code: v[0].block_code,
                    panchayat_code: v[0].panchayat_code,
                    panchayat_name: v[0].panchayat_name,
                    data: v.filter(function(d) { return d.tot_trn!==null; })
                        .map(function(d) {
                        return [
                            d.year + '' + Utils.padNum(d.month) + '' + Utils.padNum(1),
                            d.mrc_mre,
                            d.mre_wlg,
                            d.wlg_wls,
                            d.wls_fto,
                            d.fto_sn1,
                            d.sn1_sn2,
                            d.sn2_prc,
                            d.mrc_prc,
                            d.tot_trn
                        ];
                    })
                };
            })
            .entries(panchayatResponse)
            .map(function(d) {
                return d.value;
            });

        var headers = [
            'date',
            'mrc_mre',
            'mre_wlg',
            'wlg_wls',
            'wls_fto',
            'fto_sn1',
            'sn1_sn2',
            'sn2_prc',
            'mrc_prc',
            'tot_trn'
        ];

        var subjectLine = Utils.buildSubject(name, regionsResponse, userId, userMobile);

        var data = {
            overview: overview,
            cards: cards,
            block_performance: blockPerformance,
            panchayat_performance: panchayatPerformance,
            config: {
                headers: headers,
                labels: [
                    'Date',
                    'Muster roll closure to muster roll entry',
                    'Muster roll entry to wage list generation',
                    'Wage list generation to wage list sent',
                    'Wage list sent to FTO generation',
                    'FTO generation to first signature',
                    'First signature to second signature',
                    'Second signature to processed by bank',
                    'Total Length of Process',
                    'Total Transactions'
                ]
            },
            contact: {
                phone: contactResponse[0].phone,
                email: contactResponse[0].email,
                subject: subjectLine
            },
            colors: {
                default: [
                    '#F15854',
                    '#B2912F',
                    '#F17CB0',
                    '#60BD68',
                    '#FAA43A',
                    '#5DA5DA',
                    '#B276B2',
                    '#97D19C'
                ],
                colorblind: [
                    '#E69F00',
                    '#56B4E9',
                    '#009E73',
                    '#000000',
                    '#F0E442',
                    '#D55E00',
                    '#CC79A7',
                    '#0072b2'
                ]
            },
            version: versionResponse[0].version
        };

        return data;
    }

    function parse_district(rows) {
        var overviewResponse = D3.values(rows[0]);

        var cardsResponse = D3.values(rows[1]);

        var districtResponse = D3.values(rows[2]);

        var blockResponse = D3.values(rows[3]);

        var stateResponse = D3.values(rows[4]);

        var contactResponse = D3.values(rows[5]);

        var regionsResponse = D3.values(rows[6]);

        var versionResponse = D3.values(rows[7]);

        // Parse the overview response
        var overview = D3.nest()
            .key(function(d) {
                return d.district_code;
            })
            .rollup(function(v) {
                return {
                    district_code: v[0].district_code,
                    district_name: v[0].district_name,
                    current_total: v[0].current_total,
                    delayed_total: v[0].delayed_total,
                    delayed_no_t5: v[0].delayed_no_t5,
                    days_to_payment: v[0].days_to_payment
                };
            })
            .entries(overviewResponse)
            .map(function(d) {
                return d.value;
            });

        var state_code = stateResponse[0].state_code;

        // Nest the cards response and include the overview stats
        var cards = D3.nest()
            .key(function(d) {
                return d.block_code;
            })
            .rollup(function(v) {
                return {
                    officers: v
                        .map(function(d) {
                            return {
                                officer_id: d.uid,
                                name: Utils.buildName(d.firstname, d.lastname),
                                designation: d.designation,
                                designation_id: d.designation_id,
                                mobile: d.mobile
                            };
                        })
                        .sort(function(a, b) {
                            return a.designation_id - b.designation_id;
                        }),
                    district_name: v[0].district_name,
                    block_code: v[0].block_code,
                    block_name: v[0].block_name,
                    current_total: v[0].current_total,
                    delayed_total: v[0].delayed_total,
                    delayed_no_t5: v[0].delayed_no_t5,
                    days_to_payment: v[0].days_to_payment,
                    t2_total: v[0].t2_total,
                    t2_avg: v[0].t2_avg,
                    t5_total: v[0].t5_total,
                    t5_avg: v[0].t5_avg,
                    t6_total: v[0].t6_total,
                    t6_avg: v[0].t6_avg,
                    t7_total: v[0].t7_total,
                    t7_avg: v[0].t7_avg,
                    t8_total: v[0].t8_total,
                    t8_avg: v[0].t8_avg
                };
            })
            .entries(cardsResponse)
            .map(function(d) {
                return d.value;
            })
            .sort(function(a, b) {
                if (a.district_name.toLowerCase() < b.district_name.toLowerCase()) return -1;
                if (a.district_name.toLowerCase() > b.district_name.toLowerCase()) return 1;
                if (a.block_name.toLowerCase() < b.block_name.toLowerCase()) return -1;
                if (a.block_name.toLowerCase() > b.block_name.toLowerCase()) return 1;
                return 0;
            });

        // Nest the district response
        var districtPerformance = D3.nest()
            .key(function(d) {
                return d.district_code;
            })
            .rollup(function(v) {
                return {
                    district_code: v[0].district_code,
                    district_name: v[0].district_name,
                    data: v.filter(function(d) { return d.tot_trn!==null; })
                        .map(function(d) {
                        return [
                            d.year + '' + Utils.padNum(d.month) + '' + Utils.padNum(1),
                            d.mrc_mre,
                            d.mre_wlg,
                            d.wlg_wls,
                            d.wls_fto,
                            d.fto_sn1,
                            d.sn1_sn2,
                            d.sn2_prc,
                            d.mrc_prc,
                            d.tot_trn
                        ];
                    })
                };
            })
            .entries(districtResponse)
            .map(function(d) {
                return d.value;
            });

        // Nest the block response
        var blockPerformance = D3.nest()
            .key(function(d) {
                return d.block_code;
            })
            .rollup(function(v) {
                return {
                    block_code: v[0].block_code,
                    block_name: v[0].block_name,
                    data: v.filter(function(d) { return d.tot_trn!==null; })
                        .map(function(d) {
                        return [
                            d.year + '' + Utils.padNum(d.month) + '' + Utils.padNum(1),
                            d.mrc_mre,
                            d.mre_wlg,
                            d.wlg_wls,
                            d.wls_fto,
                            d.fto_sn1,
                            d.sn1_sn2,
                            d.sn2_prc,
                            d.mrc_mre,
                            d.tot_trn
                        ];
                    })
                };
            })
            .entries(blockResponse)
            .map(function(d) {
                return d.value;
            });

        var subjectLine = Utils.buildSubject(name, regionsResponse, userId, userMobile);

        var headers = [
            'date',
            'mrc_mre',
            'mre_wlg',
            'wlg_wls',
            'wls_fto',
            'fto_sn1',
            'sn1_sn2',
            'sn2_prc',
            'mrc_prc',
            'tot_trn'
        ];

        var data = {
            overview: overview,
            cards: cards,
            district_performance: districtPerformance,
            block_performance: blockPerformance,
            config: {
                headers: headers,
                labels: [
                    'Date',
                    'Muster roll closure to muster roll entry',
                    'Muster roll entry to wage list generation',
                    'Wage list generation to wage list sent',
                    'Wage list sent to FTO generation',
                    'FTO generation to first signature',
                    'First signature to second signature',
                    'Second signature to processed by bank',
                    'Total Length of Process',
                    'Total Transactions'
                ]
            },
            contact: {
                phone: contactResponse[0].phone,
                email: contactResponse[0].email,
                subject: subjectLine
            },
            colors: {
                default: [
                    '#F15854',
                    '#B2912F',
                    '#F17CB0',
                    '#60BD68',
                    '#FAA43A',
                    '#5DA5DA',
                    '#B276B2',
                    '#97D19C'
                ],
                colorblind: [
                    '#E69F00',
                    '#56B4E9',
                    '#009E73',
                    '#000000',
                    '#F0E442',
                    '#D55E00',
                    '#CC79A7',
                    '#0072b2'
                ]
            },
            version: versionResponse[0].version
        };

        return data;
    }

    function parse_state(rows) {
        var overviewResponse = D3.values(rows[0]);

        var cardsResponse = D3.values(rows[1]);

        var stateResponse = D3.values(rows[2]);

        var districtResponse = D3.values(rows[3]);

        var contactResponse = D3.values(rows[4]);

        var regionsResponse = D3.values(rows[5]);

        var versionResponse = D3.values(rows[6]);

        // Parse the overview response
        var overview = D3.nest()
            .key(function(d) {
                return d.state_code;
            })
            .rollup(function(v) {
                return {
                    state_code: v[0].state_code,
                    state_name: v[0].state_name,
                    current_total: v[0].current_total,
                    delayed_total: v[0].delayed_total,
                    delayed_no_t5: v[0].delayed_no_t5,
                    days_to_payment: v[0].days_to_payment
                };
            })
            .entries(overviewResponse)
            .map(function(d) {
                return d.value;
            });

        var state_code = overviewResponse[0].state_code;

        // Nest the cards response and include the overview stats
        var cards = D3.nest()
            .key(function(d) {
                return d.district_code;
            })
            .rollup(function(v) {
                return {
                    officers: v
                        .map(function(d) {
                            return {
                                officer_id: d.uid,
                                name: Utils.buildName(d.firstname, d.lastname),
                                designation: d.designation,
                                designation_id: d.designation_id,
                                mobile: d.mobile
                            };
                        })
                        .sort(function(a, b) {
                            return a.designation_id - b.designation_id;
                        }),
                    state_name: v[0].state_name,
                    district_code: v[0].district_code,
                    district_name: v[0].district_name,
                    current_total: v[0].current_total,
                    delayed_total: v[0].delayed_total,
                    delayed_no_t5: v[0].delayed_no_t5,
                    days_to_payment: v[0].days_to_payment,
                    t2_total: v[0].t2_total,
                    t2_avg: v[0].t2_avg,
                    t5_total: v[0].t5_total,
                    t5_avg: v[0].t5_avg,
                    t6_total: v[0].t6_total,
                    t6_avg: v[0].t6_avg,
                    t7_total: v[0].t7_total,
                    t7_avg: v[0].t7_avg,
                    t8_total: v[0].t8_total,
                    t8_avg: v[0].t8_avg
                };
            })
            .entries(cardsResponse)
            .map(function(d) {
                return d.value;
            })
            .sort(function(a, b) {
                if (a.district_name.toLowerCase() < b.district_name.toLowerCase()) return -1;
                if (a.district_name.toLowerCase() > b.district_name.toLowerCase()) return 1;
                return 0;
            });

        // Nest the state response
        var statePerformance = D3.nest()
            .key(function(d) {
                return d.state_code;
            })
            .rollup(function(v) {
                return {
                    state_code: v[0].state_code,
                    state_name: v[0].state_name,
                    data: v.filter(function(d) { return d.tot_trn!==null; })
                        .map(function(d) {
                        return [
                            d.year + '' + Utils.padNum(d.month) + '' + Utils.padNum(1),
                            d.mrc_mre,
                            d.mre_wlg,
                            d.wlg_wls,
                            d.wls_fto,
                            d.fto_sn1,
                            d.sn1_sn2,
                            d.sn2_prc,
                            d.mrc_prc,
                            d.tot_trn
                        ];
                    })
                };
            })
            .entries(stateResponse)
            .map(function(d) {
                return d.value;
            });

        // Nest the district response
        var districtPerformance = D3.nest()
            .key(function(d) {
                return d.district_code;
            })
            .rollup(function(v) {
                return {
                    district_code: v[0].district_code,
                    district_name: v[0].district_name,
                    data: v.filter(function(d) { return d.tot_trn!==null; })
                        .map(function(d) {
                        return [
                            d.year + '' + Utils.padNum(d.month) + '' + Utils.padNum(1),
                            d.mrc_mre,
                            d.mre_wlg,
                            d.wlg_wls,
                            d.wls_fto,
                            d.fto_sn1,
                            d.sn1_sn2,
                            d.sn2_prc,
                            d.mrc_mre,
                            d.tot_trn
                        ];
                    })
                };
            })
            .entries(districtResponse)
            .map(function(d) {
                return d.value;
            });

        var subjectLine = Utils.buildSubject(name, regionsResponse, userId, userMobile);

        var headers = [
            'date',
            'mrc_mre',
            'mre_wlg',
            'wlg_wls',
            'wls_fto',
            'fto_sn1',
            'sn1_sn2',
            'sn2_prc',
            'mrc_prc',
            'tot_trn'
        ];

        var data = {
            overview: overview,
            cards: cards,
            state_performance: statePerformance,
            district_performance: districtPerformance,
            config: {
                headers: headers,
                labels: [
                    'Date',
                    'Muster roll closure to muster roll entry',
                    'Muster roll entry to wage list generation',
                    'Wage list generation to wage list sent',
                    'Wage list sent to FTO generation',
                    'FTO generation to first signature',
                    'First signature to second signature',
                    'Second signature to processed by bank',
                    'Total Length of Process',
                    'Total Transactions'
                ]
            },
            contact: {
                phone: contactResponse[0].phone,
                email: contactResponse[0].email,
                subject: subjectLine
            },
            colors: {
                default: [
                    '#F15854',
                    '#B2912F',
                    '#F17CB0',
                    '#60BD68',
                    '#FAA43A',
                    '#5DA5DA',
                    '#B276B2',
                    '#97D19C'
                ],
                colorblind: [
                    '#E69F00',
                    '#56B4E9',
                    '#009E73',
                    '#000000',
                    '#F0E442',
                    '#D55E00',
                    '#CC79A7',
                    '#0072b2'
                ]
            },
            version: versionResponse[0].version
        };

        return data;
    }

    if (role === 'block') {
        var data = parse_block(rows);
    } else if (role === 'district') {
        var data = parse_district(rows);
    } else if (role === 'state') {
        var data = parse_state(rows);
    }

    return data;
};
