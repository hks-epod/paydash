'use strict';

module.exports = {
    $meta: 'English translation file',
    web: {
        overview: {
            current: 'CUREENT',
            delayed: 'DELAYED',
            days_to_payment: 'DAYS TO PAYMENT',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        musters: {
            $filter: 'role',
            district: 'Muster translations',
            block: 'Muster translations',
            $default: 'Muster translations'
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
                all: 'All steps'
            },
            dates: {
                all_dates: 'All dates',
                last_60: 'Last 60 days',
                last_30: 'Last 30 days'
            },
            regions: {
                panchayat: 'Panchayat',
                block: 'Block',
            },
            tooltip: {
                date: 'Date',
                days: 'Avg. days',
                transactions: 'Transactions',
                step: 'Step'
            }
        },
        notifications: {
            notifications: 'Notifications',
            read: 'Read',
            unread: 'Unread'
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
                    'message': 'Are you sure you want to log out? PayDash offline mode is only available if you stay logged in.',
                    'logout': 'Log out',
                    'cancel': 'Cancel'
                },
                general: 'Unable to log out of PayDash. Please contact the PayDash team if this issue persists.'
            }
        }
    }
};
