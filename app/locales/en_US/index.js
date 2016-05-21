'use strict';

module.exports = {
    $meta: 'English translation file',
    navigation: {
        overview: {
            $filter: 'role',
            district: 'District Performance',
            block: 'Block Performance',
            $default: 'Overview Performance'
        },
        discrete: {
            $filter: 'role',
            district: 'Block Performance',
            block: 'Panchayat Performance',
            $default: 'Discrete Performance'
        },
        current: 'Current musters',
        delayed: 'Delayed musters'
    },
    messages: {
        loading: 'Loading data...',
        not_found: 'Page not found. Please contact the Paydash team if you need assistance.'
    },
    time_selector: {
        '1': 'All available dates',
        '2': 'Past 60 days',
        '3': 'Past 30 days'
    },
    payment_steps: {
        '1': 'Muster roll closure to muster roll entry',
        '2': 'Muster roll entry to wage list generation',
        '3': 'Wage list generation to wage list sign',
        '4': 'Wage list sign to FTO generation',
        '5': 'FTO generation to first signature',
        '6': 'First signature to second signature',
        '7': 'Second signature to processed by bank'
    },
    payment_steps_labels: [
        'Muster roll closure to muster roll entry',
        'Muster roll entry to wage list generation',
        'Wage list generation to wage list sign',
        'Wage list sign to FTO generation',
        'FTO generation to first signature',
        'First signature to second signature',
        'Second signature to processed by bank'
    ],
    total_trans: "Total transactions on",
    performance: {
        overview: {
            chart_a: {
                title: {
                    $filter: 'role',
                    district: 'District Performance',
                    block: 'Your Block\'s Performance',
                    $default: 'Overview Performance'
                },
                description: {
                    $filter: 'role',
                    district: 'Average number of days to complete each step of the payment process in your district.',
                    block: 'Average number of days to complete each step of the payment process in your block.',
                    $default: 'Average number of days to complete each step of the payment process in your region.'
                }
            },
            chart_b: {
                title: {
                    $filter: 'role',
                    district: 'Benchmarking Your Performance',
                    block: 'Benchmarking Your Performance',
                    $default: 'Benchmarking Your Performance'
                },
                description: {
                    $filter: 'role',
                    district: 'Compare your performance with averages for your state.',
                    block: 'Compare your performance with averages for your district and state.',
                    $default: 'Compare your performance with averages for other regions.'
                }
            },
            tooltip: 'The chart at right shows the average number of days to complete each step of the payment process for payments that reached beneficiaries’ bank accounts on the given date. Therefore, only completed payments are displayed.',
        },
        discrete: {
            sub_heading: { 
                1: 'Performance of', 
                '2': 'panchayat' 
            },
            subtitle: {
                $filter: 'role',
                block: 'The performance of your panchayat on average days to complete each step of the payment process.',
                district: 'The performance of your blocks on average days to complete each step of the payment process.',
                $default: 'The performance of your regions on average days to complete each step of the payment process.'
            },
            tooltip: 'The charts below show the average number of days to complete each step of the payment process for payments that reached beneficiaries’ bank accounts on the given date. Therefore, only completed payments are displayed. Your worst performing panchayats are shown first.',
            ta_message: 'Your block has unmapped panchayats for the TA designation. As a result, we can\'t show you the performance of all the TA\'s in your block. Please visit the MGNREGA portal at nrega.nic.in to complete your TA mapping.',
            grs_message: 'Your block has unmapped panchayats for the GRS designation. As a result, we can\'t show you the performance of all the GRS\'s in your block. Please visit the MGNREGA portal at nrega.nic.in to complete your GRS mapping.',
            panchayat_chart_placeholder: 'Select a panchayat at left to view its payment performance',
            grouping_selectors: {
                no: 'No Grouping',
                ta: 'Group by TA',
                grs: 'Group by GRS'
            }
        }
    }
};
