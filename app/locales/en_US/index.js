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
        loading: 'Please wait, data is loading',
        not_found: 'Page does not exist'
    },
    performance: {
        overview: {
            title: {
                $filter: 'role',
                district: 'You are looking at payment processing time in',
                block: 'You are looking at payment processing time in',
                $default: 'You are looking at payment processing time in'
            },
            timeSelector: 'Please select time period',
            graphExplanation: 'The following graphs display average time taken at each step of payment processing for payments that reached beneficiaries’ bank accounts on the given date.'
        }
    }
};
