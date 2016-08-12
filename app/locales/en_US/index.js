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
    notifications : {
        read : 'Read Notifications',
        unread : 'Unread Notifications',
        message: {
            1: {
                $filter: 'role',
                block: [' block made ',' payments to MGNREGA beneficiaries on ',' .'],
                district: [' district made ',' payments to MGNREGA beneficiaries on ',' .']
            },
            2: {
                main: ['The average time from muster roll closure to bank processing for these transactions was ',' days, ',' the mandated maximum of 15 days.'],
                comparison: ['greater than','equal to','less than']
            }
        } 
    },
    browser_msg: 'The browser you are using is not supported. PayDash works best with Chrome, Firefox, or Internet Explorer 9+.',
    messages: {
        loading: 'Loading data...',
        not_found: 'Page not found. Please contact the PayDash team if you need assistance.'
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
                2: 'block/panchayat'
            },
            subtitle: {
                $filter: 'role',
                block: 'The performance of your panchayat on average days to complete each step of the payment process.',
                district: 'The performance of your blocks/panchayats on average days to complete each step of the payment process.',
                $default: 'The performance of your regions on average days to complete each step of the payment process.'
            },
            tooltip: 'The charts below show the average number of days to complete each step of the payment process for payments that reached beneficiaries’ bank accounts on the given date. Therefore, only completed payments are displayed. Your worst performing panchayats are shown first.',
            ta_message: 'Your block has unmapped panchayats for the TA designation. As a result, we can\'t show you the performance of all the TA\'s in your block. Please visit the MGNREGA portal at nrega.nic.in to complete your TA mapping.',
            grs_message: 'Your block has unmapped panchayats for the GRS designation. As a result, we can\'t show you the performance of all the GRS\'s in your block. Please visit the MGNREGA portal at nrega.nic.in to complete your GRS mapping.',
            panchayat_chart_placeholder: 'Select a block or panchayat at left to view its payment performance',
            grouping_selectors: {
                no: 'No Grouping',
                ta: 'Group by TA',
                grs: 'Group by GRS'
            },
            sidebar : {
                total_trans: 'Total Transactions',
                avg_days: 'Avg. days from muster roll closure to entry'
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
            t_8: 'Pending for FTO second signature (T+8)'
        }
    },
    app: {
        overview: {
            musters_closing_today: 'Musters closing today',
            delayed_musters: 'Delayed musters',
            total_transactions: 'Transactions in last 3 months',
            days_to_payment: 'Days to payment in last 3 months',
            cards_need_attention: 'cards require your attention',
            view_cards: 'VIEW CARDS'
        },
        cards: {
            musters_closing_today: 'musters closing today',
            delayed_musters_1: 'delayed musters',
            muster_details: 'MUSTER DETAILS',
            current_musters: 'CURRENT MUSTERS',
            delayed_musters_2: 'DELAYED MUSTERS',
            work_code: 'Work code',
            work_name: 'Work name',
            closure_date: 'Closure date',
            days_delayed: 'Days delayed'
        },
        chart: {
            days_to_complete_process: 'Days to complete process',
            steps: {
                1: 'MR Closure to MR Entry',
                2: 'MR Entry to Wage List Generation',
                3: 'Wage List Generation to Wage List Sent',
                4: 'Wage List Sent to FTO Generation',
                5: 'FTO Generation to 1st Sign',
                6: '1st Sign to 2nd Sign',
                7: '2nd Sign to Bank Processing',
                total: 'Total Length of Process',
                all: 'All Steps'
            },
            dates: {
                all_dates: 'All dates',
                past_3_months: 'Past 3 months'
            },
            regions: {
                panchayat: 'Panchayat',
                block: 'Block',
                district: 'District'
            },
            tooltip: {
                date: 'Date',
                days: 'Avg. days',
                transactions: 'Transactions',
                step: 'Step'
            }
        },
        profile: {
            firstname: 'First Name',
            lastname: 'Last Name',
            profile: 'Profile',
            account: 'Account',
            work_email: 'Work Email',
            mobile: 'Mobile',
            personal_email: 'Personal Email',
            lang: 'Language',
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
            pass_confirm: 'Verify new password',
            forgot_pass: 'I forgot my password'
        },
        messages: {
            login: {
                connectivity: 'Unable to log in to PayDash. Please try again when your device has internet connectivity.',
                credentials: 'Incorrect username/password combination. Please contact the PayDash team if this issue persists.',
                general: 'Unable to log in to PayDash. Please contact the PayDash team if this issue persists.'
            },
            logout: {
                connectivity: 'Unable to log out of PayDash. Please try again when your device has internet connectivity.',
                warning: {
                    'message':'Are you sure you want to log out? PayDash offline mode is only available if you stay logged in.',
                    'logout': 'Log out',
                    'cancel': 'Cancel'
                },
                general: 'Unable to log out of PayDash. Please contact the PayDash team if this issue persists.'
            },
            password_success: 'Password changed successfully. Please login with new password.',
            password_wrong_old: 'Old password is incorrect. Please contact the PayDash team if you require assistance.',
            password_new_nomatch: 'New password does not match.',
            password_tooshort: 'Your new password must be at least 6 characters long.'
        },
        whatsapp: {
            block: 'Muster Roll Details for {name}\n\n{current_total} musters closing today\n{delayed_total} delayed musters\n\nMUSTERS CLOSING TODAY\n\n_Msr_\n{msr_no}\n_Panchayat_\n{panchayat_name}\n_Work code_\n{work_code}\n_Work name_\n{work_name}\n_Closure date_\n{closure_date}\n\nDELAYED MUSTERS\n\n_Msr_\n{msr_no}\n_Panchayat_\n{panchayat_name}\n_Work code_\n{work_code}\n_Work name_\n{work_name}\n_Closure date_\n{closure_date}\n_Days delayed_\n{days_pending}\n\n',
            district: 'MGNREGA Payment Delay Performance for {name}\n\n_Block_\n{block_name}\n\n{days_to_payment} days to complete payment\n{current_total} musters closing today\n{delayed_total} delayed musters\n\nMUSTERS DELAYED AT DIFFERENT STEPS\n\n*Attendance not filled (T+2)*\n_Total_\n{t2_total}\n_Avg. days pending_\n{t2_avg}\n\n*Measurement book not filled (T+5)*\n_Total_\n{t5_total}\n_Avg. days pending_\n{t5_avg}\n\n*Wagelist not sent (T+6)*\n_Total_\n{t6_total}\n_Avg. days pending_\n{t6_avg}\n\n*Pending for FTO first signature (T+7)*\n_Total_\n{t7_total}\n_Avg. days pending_\n{t7_avg}\n\n*Pending for FTO second signature (T+8)*\n_Total_\n{t8_total}\n_Avg. days pending_\n{t8_avg}\n'    
        }
    }
};
