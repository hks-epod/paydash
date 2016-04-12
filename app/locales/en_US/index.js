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
        }
    },
    messages: {
        loading: 'Loading data...',
        not_found: 'Page not found. Please contact the Paydash team if you need assistance.'
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
                },
                tooltip: {
                    block: 'The chart at right shows the average number of days to complete each step of the payment process for payments that reached beneficiaries’ bank accounts on the given date. Therefore, only completed payments are displayed.',
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
            }
        }
    }
};
