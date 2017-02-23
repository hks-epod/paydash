'use strict';

module.exports = {
    $meta: 'English translation file',
    app: {
        $filter: 'role',
        block: {
            paydash: 'PayDash',
            overview: {
                musters_closing_today: 'Musters closing today',
                delayed_musters: 'Delayed musters',
                total_transactions: 'Transactions in last 3 months',
                days_to_payment: 'Avg. days to payment in last 3 months',
                cards_need_attention: 'cards require your attention',
                view_cards: 'VIEW CARDS'
            },
            cards: {
                cards: 'Cards',
                musters_closing_today: 'Musters closing today',
                delayed_musters_1: 'Delayed musters',
                muster_details: 'Muster details',
                current_musters: 'CURRENT MUSTERS',
                delayed_musters_2: 'DELAYED MUSTERS',
                work_code: 'Work code',
                work_name: 'Work name',
                closure_date: 'Closure date',
                days_delayed: 'Days delayed',
                step: 'Step',
                ds_t2: 'Attendance not filled (T+2)',
                ds_t5: 'Measurement book not filled (T+5)',
                ds_t6: 'Wagelist not sent (T+6)',
                ds_t7: 'Pending for FTO first signature (T+7)',
                ds_t8: 'Pending for FTO second signature (T+8)',
                contact: {
                    phone: 'Phone',
                    whatsapp: 'WhatsApp'
                }
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
                    total: 'Total time for payment (overall)',
                    all: 'Total time for payment (step-wise)'
                },
                statutory_limit: 'Statutory Limit',
                dates: {
                    all_dates: 'All dates',
                    past_3_months: 'Past 3 months'
                },
                regions: {
                    panchayat: 'Panchayat',
                    block: 'Block'
                },
                tooltip: {
                    date: 'Date',
                    days: 'Avg. days',
                    transactions: 'Transactions',
                    step: 'Step'
                }
            },
            user_dropdown: {
                profile: 'Profile',
                logout: 'Logout'
            },
            profile: {
                profile: 'Profile',
                edit: 'EDIT',
                save:'SAVE',
                updating:'UPDATING...',
                firstname: 'First Name',
                lastname: 'Last Name',
                mobile: 'Mobile',
                personal_email: 'Personal Email',
                work_email: 'Work Email',
                colorblind: 'Use Colorblind-Safe Theme',
                lang: 'Language',
                eng: 'English',
                hindi: 'Hindi',
                change_pass_button: 'CHANGE PASSWORD'
            },
            password: {
                change_pass: 'Change password',
                old_pass: 'Old password',
                new_pass: 'New password',
                pass_confirm: 'Verify new password',
                forgot_pass: 'I forgot my password',
                change_pass_button: 'CHANGE PASSWORD',
            },
            search: 'Search for TA/GRS...',
            sort: {
                current_total: 'Musters closing today',
                delayed_total: 'Delayed musters',
                name: 'Name',
                designation: 'Designation'
            },
            messages: {
                login: {
                    connectivity: 'Unable to log in to PayDash. Please try again when your device has internet connectivity.',
                    credentials: 'Incorrect username/password combination. Please contact the PayDash team if this issue persists.',
                    general: 'Unable to log in to PayDash. Please contact the PayDash team if this issue persists.',
                    ga_account: 'The Google Account associated with this device does not match the Google Account associated with your PayDash account. Please contact the PayDash team if you require assistance.',
                    deactivated: 'Your account has been deactivated. Please contact the PayDash team if you require assistance.'
                },
                logout: {
                    connectivity: 'Unable to log out of PayDash. Please try again when your device has internet connectivity.',
                    warning: {
                        'message':'Are you sure you want to log out? PayDash offline mode is only available if you stay logged in.',
                        'logout': 'Log out',
                        'cancel': 'Cancel'
                    },
                    general: 'Unable to log out of PayDash. Please contact the PayDash team if this issue persists.',
                    logging_out: 'Logging out...'
                },
                profile_success: 'Profile successfully updated.',
                profile_error: 'Unable to update profile. Please contact the PayDash team if this issue persists.',
                password_success: 'Password changed successfully.',
                password_wrong_old: 'Old password is incorrect. Please contact the PayDash team if you require assistance.',
                password_new_nomatch: 'New password does not match.',
                password_tooshort: 'Your new password must be at least 6 characters long.',
                password_network_error: 'Unable to change password. Please try again when you have network connectivity.',
                password_empty: 'Password cannot be empty',
                requesting_change: 'Requesting password change...',
                update_available: 'New Update Available',
                update: 'Update',
                grant_permission:'Please grant permission to proceed'
            },
            contact: {
                contact: 'Contact',
                gmail: 'Gmail',
                phone: 'Phone'
            },
            whatsapp: {
                muster_selection: {
                    all: 'Send delayed musters and musters closing today',
                    current: 'Send musters closing today only',
                    delayed: 'Send delayed musters only'
                },
                overview_current:'{name}\n\n{current_total} musters closing today\n\n',
                overview_delayed:'{name}\n\n{delayed_total} delayed musters\n\n',
                overview:'Muster Roll Details for {name}\n\n{current_total} musters closing today\n{delayed_total} delayed musters\n\n',
                current:'MUSTERS CLOSING TODAY\n\n_Msr_\n{msr_no}\n_Panchayat_\n{panchayat_name}\n_Work code_\n{work_code}\n_Work name_\n{work_name}\n_Closure date_\n{closure_date}\n\n',
                delayed:'DELAYED MUSTERS\n\n_Msr_\n{msr_no}\n_Panchayat_\n{panchayat_name}\n_Work code_\n{work_code}\n_Work name_\n{work_name}\n_Closure date_\n{closure_date}\n_Days delayed_\n{days_pending}\n\n'
            }
        },
        district: {
            paydash: 'PayDash',
            overview: {
                view_your_blocks: 'View your {blocks_total} blocks',
                show_blocks: 'GO TO BLOCKS',
                days_to_payment: 'Avg. days to payment in last 3 months',
                musters_closing_today: 'Musters closing today',
                delayed_musters: 'Delayed musters'
            },
            cards: {
                cards: 'Cards',
                days_to_payment: 'Avg. days to payment in last 3 months',
                musters_closing_today: 'Musters closing today',
                delayed_musters: 'Delayed musters',
                musters_diff_steps: 'Musters delayed at different steps',
                avg_days_pending: 'Avg. days pending',
                total: 'Total',
                t_2: 'Attendance not filled (T+2)',
                t_5: 'Measurement book not filled (T+5)',
                t_6: 'Wagelist not sent (T+6)',
                t_7: 'Pending for FTO first signature (T+7)',
                t_8: 'Pending for FTO second signature (T+8)',
                contact: {
                    phone: 'Phone',
                    whatsapp: 'WhatsApp'
                }
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
                    total: 'Total time for payment (overall)',
                    all: 'Total time for payment (step-wise)'
                },
                statutory_limit: 'Statutory Limit',
                dates: {
                    all_dates: 'All dates',
                    past_3_months: 'Past 3 months'
                },
                regions: {
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
            user_dropdown: {
                profile: 'Profile',
                logout: 'Logout'
            },
            profile: {
                profile: 'Profile',
                edit: 'EDIT',
                save:'SAVE',
                updating:'UPDATING...',
                firstname: 'First Name',
                lastname: 'Last Name',
                mobile: 'Mobile',
                personal_email: 'Personal Email',
                work_email: 'Work Email',
                colorblind: 'Use Colorblind-Safe Theme',
                lang: 'Language',
                eng: 'English',
                hindi: 'Hindi',
                change_pass_button: 'CHANGE PASSWORD'
            },
            password: {
                change_pass: 'Change password',
                old_pass: 'Old password',
                new_pass: 'New password',
                pass_confirm: 'Verify new password',
                forgot_pass: 'I forgot my password',
                change_pass_button: 'CHANGE PASSWORD',
            },
            search: 'Search for Block or Officer Name...',
            sort: {
                current_total: 'Musters closing today',
                delayed_total: 'Delayed musters',
                days_to_payment: 'Avg. days to payment in last 3 months',
                block_name: 'Block name',
                ceo_name: 'Block CEO name'
            },
            messages: {
                login: {
                    connectivity: 'Unable to log in to PayDash. Please try again when your device has internet connectivity.',
                    credentials: 'Incorrect username/password combination. Please contact the PayDash team if this issue persists.',
                    general: 'Unable to log in to PayDash. Please contact the PayDash team if this issue persists.',
                    ga_account: 'The Google Account associated with this device does not match the Google Account associated with your PayDash account. Please contact the PayDash team if you require assistance.',
                    deactivated: 'Your account has been deactivated. Please contact the PayDash team if you require assistance.'
                },
                logout: {
                    connectivity: 'Unable to log out of PayDash. Please try again when your device has internet connectivity.',
                    warning: {
                        'message':'Are you sure you want to log out? PayDash offline mode is only available if you stay logged in.',
                        'logout': 'Log out',
                        'cancel': 'Cancel'
                    },
                    general: 'Unable to log out of PayDash. Please contact the PayDash team if this issue persists.',
                    logging_out: 'Logging out...'
                },
                profile_success: 'Profile successfully updated.',
                profile_error: 'Unable to update profile. Please contact the PayDash team if this issue persists.',
                password_success: 'Password changed successfully.',
                password_wrong_old: 'Old password is incorrect. Please contact the PayDash team if you require assistance.',
                password_new_nomatch: 'New password does not match.',
                password_tooshort: 'Your new password must be at least 6 characters long.',
                password_network_error: 'Unable to change password. Please try again when you have network connectivity.',
                password_empty: 'Password cannot be empty',
                requesting_change: 'Requesting password change...',
                update_available: 'New Update Available',
                update: 'Update',
                grant_permission:'Please grant permission to proceed'
            },
            contact: {
                contact: 'Contact',
                gmail: 'Gmail',
                phone: 'Phone'
            },
            whatsapp: 'MGNREGA Payment Delay Performance for {name}\n\n_Block_\n{block_name}\n\n{days_to_payment} days to complete payment\n{current_total} musters closing today\n{delayed_total} delayed musters\n\nMUSTERS DELAYED AT DIFFERENT STEPS\n\n*Attendance not filled (T+2)*\n_Total_\n{t2_total}\n_Avg. days pending_\n{t2_avg}\n\n*Measurement book not filled (T+5)*\n_Total_\n{t5_total}\n_Avg. days pending_\n{t5_avg}\n\n*Wagelist not sent (T+6)*\n_Total_\n{t6_total}\n_Avg. days pending_\n{t6_avg}\n\n*Pending for FTO first signature (T+7)*\n_Total_\n{t7_total}\n_Avg. days pending_\n{t7_avg}\n\n*Pending for FTO second signature (T+8)*\n_Total_\n{t8_total}\n_Avg. days pending_\n{t8_avg}\n'
        }
    }
};
