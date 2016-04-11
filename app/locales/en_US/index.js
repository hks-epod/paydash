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
        loading: 'Loading graph data',
        not_found: 'Page does not exist'
    },
    payment_steps: {
        '1': 'Muster roll closure to muster roll entry',
        '2': 'Muster roll entry to wage list generation',
        '3': 'FTO generation to first signature',
        '4': 'Wage list generation to wage list sign',
        '5': 'Wage list sign to FTO generation',
        '6': 'First signature to second signature',
        '7': 'Second signature to processed by bank'
    },
    performance: {
        overview: {
            title: {
                $filter: 'role',
                district: 'You are looking at payment processing time in',
                block: 'You are looking at payment processing time in',
                $default: 'You are looking at payment processing time in'
            }
        }
    }
};
