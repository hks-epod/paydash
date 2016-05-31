'use strict';

module.exports = {
    $meta: 'English translation file',
    profile: {
        firstname: 'First Name',
        lastname: 'Last Name',
        profile: 'Profile',
        account: 'Account',
        work_email: 'Work Email',
        mobile: 'Mobile',
        personal_email: 'Personal Email',
        lang : 'Language',
        settings: 'Settings',
        logout: 'Logout',
        profile_settings: 'Profile Settings',
        email_settings: 'Email Settings',
        primary_email_msg: 'Your primary email address will be used for account-related notifications as well as any web-based operations.',
        save: 'Update',
        your_primary_email: 'Your primary email',
        change_pass: 'Change password',
        old_pass: 'Old password',
        new_pass: 'New password',
        pass_confirm:'Verify new password',
        forgot_pass: 'I forgot my password'
    },
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
    browser_msg: 'The browser you are using is not supported. PayDash works best with Chrome, Firefox, or Internet Explorer 9+.',
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
        '3': 'Wage list generation to wage list sent',
        '4': 'Wage list sent to FTO generation',
        '5': 'FTO generation to first signature',
        '6': 'First signature to second signature',
        '7': 'Second signature to processed by bank'
    },
    payment_steps_labels: [
        'Muster roll closure to muster roll entry',
        'Muster roll entry to wage list generation',
        'Wage list generation to wage list sent',
        'Wage list sent to FTO generation',
        'FTO generation to first signature',
        'First signature to second signature',
        'Second signature to processed by bank'
    ],
    compare_chart_labels: {
        'state': 'state average',
        'district': 'district average',
        'block': 'block average'
    },
    y_axis_labels: 'Days to complete process',
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
                '2': 'panchayats'
            },
            subtitle: {
                $filter: 'role',
                block: 'The performance of your panchayats on average days to complete each step of the payment process.',
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
    },
    musters: {
        current: {
            title: 'Musters Closing Today'
        },
        delayed: {
            title: 'Delayed Musters',
            t_2: 'Attendance not filled (T+2)',
            t_5: 'Measurement book not filled (T+5)',
            t_6: 'Wagelist not sent (T+6)',
            t_7: 'Pending for FTO first signature (T+7)',
            T_8: 'Pending for FTO second signature (T+8)'
        }
    },
    app: {
        musters_closing_today: 'Musters Closing Today',
        delayed_musters: 'Delayed Musters',
        total_transactions: 'transactions in last 3 months',
        cards_need_attention: 'Cards require your attention',
        view_cards: 'View Cards',
        muster_details: 'Muster Details',
        current_musters: 'Current Musters',
        work_code: 'Work Code',
        work_name: 'Work Name',
        closure_date: 'Closure date',
        days_to_complete_process: 'Days to Complete Process',
        steps: {
            1: 'MR Closure to MR Entry',
            2: 'MR Entry to Wage List Generation',
            3: 'Wage List Generation to Wage List Sent',
            4: 'Wage List Sent to FTO Generation',
            5: 'FTO Generation to 1st Sign',
            6: '1st Sign to 2nd Sign',
            7: '2nd Sign to Bank Processing',
            all: 'All Steps',
        },
        panchayat: 'Panchayat',
        block: 'Block',
        logout: 'Log Out'
    }
};
