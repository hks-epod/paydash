'use strict';

module.exports = {
    $meta: 'English translation file',
    web: {
        navigation: {
            overview: 'OVERVIEW',
            musters: {
                $filter: 'role',
                district: 'BLOCKS',
                block: 'MUSTERS'
            },
            performance: 'PERFORMANCE'
        },
        overview: {
            current: 'CURRENT',
            delayed: 'DELAYED',
            days_to_payment: 'DAYS TO PAYMENT (LAST 3 MONTHS)',
            welcome: {
                1: 'Hello',
                2: 'ji'
            },
            description: {
                $filter: 'role',
                block: "Here's how your Block is doing on MGNREGA payment delays.",
                district: "Here's how your District is doing on MGNREGA payment delays."
            }
        },
        musters: {
            current: 'CURRENT',
            delayed: 'DELAYED',
            muster_details: 'MUSTER DETAILS',
            officers: 'OFFICERS',
            current_musters: 'CURRENT MUSTERS',
            delayed_musters: 'Delayed MUSTERS',
            msr_no: 'MUSTER NO.',
            panchayat_name: 'PANCHAYAT NAME',
            work_name: 'WORK NAME',
            work_code: 'WORK CODE',
            closure_date: 'CLOSURE DATE',
            days_pending: 'DAYS PENDING',
            step: 'STEP',
            ds_t2: 'Attendance not filled (T+2)',
            ds_t5: 'Measurement book not filled (T+5)',
            ds_t6: 'Wagelist not sent (T+6)',
            ds_t7: 'Pending for FTO first signature (T+7)',
            ds_t8: 'Pending for FTO second signature (T+8)',
            current_total: 'CURRENT TOTAL',
            delayed_total: 'DELAYED TOTAL',
            name: 'NAME',
            designation: 'DESIGNATION',
            block_name: 'BLOCK NAME',
            days_to_payment: 'DAYS TO PAYMENT (LAST 3 MONTHS)',
            no_muster_information: 'There is no muster information available',
            sort_by: 'Sort By',
            search_placeholder: 'Search'
        },
        performance: {
            overview: {
                title: {
                    $filter: 'role',
                    district: "Your District/Block's Performance",
                    block: "Your Block/Panchayat's Performance",
                    $default: 'Overview Performance'
                },
                description: {
                    $filter: 'role',
                    district: 'Average number of days to complete each step of the payment process in your district/block.',
                    block: 'Average number of days to complete each step of the payment process in your block/panchayat.',
                    $default: 'Average number of days to complete each step of the payment process in your region.'
                },
                labels: [
                    'Muster roll closure to muster roll entry',
                    'Muster roll entry to wage list generation',
                    'Wage list generation to wage list sent',
                    'Wage list sent to FTO generation',
                    'FTO generation to first signature',
                    'First signature to second signature',
                    'Second signature to processed by bank',
                    'Muster roll closure to payment processed'
                ],
                tooltip: 'The chart at right shows the average number of days to complete each step of the payment process for payments that reached beneficiaries’ bank accounts on the given date. Therefore, only completed payments are displayed.'
            },
            comparison: {
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
                },
                labels: {
                    state: 'state average',
                    district: 'district average',
                    block: 'block average',
                    panchayat: 'panchayat average'
                },
                total_trans: {
                    state: 'Total state transactions in',
                    district: 'Total district transactions in',
                    block: 'Total block transactions in',
                    panchayat: 'Total panchayat transactions in'
                },
                tooltip: 'The chart at right shows the average number of days to complete each step of the payment process for payments that reached beneficiaries’ bank accounts on the given date. Therefore, only completed payments are displayed.'
            },
            y_axis_label: 'Days to complete process',
            total_trans: 'Total transactions in'
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
            forgot_pass: 'I forgot my password',
            colorblind: 'Colorblind'
        },
        contact: {
            header: 'Contact PayDash team',
            call: 'Call us at {{phone}}',
            or: 'Or',
            send_message: 'Send us a message using the form below',
            send_button: 'SEND'
        },
        editor: {
            title: 'MGNREGA Employee Data Entry',
            nav: {
                info: 'Data Entry Home',
                t2: 'Attendance (T+2)',
                t5: 'Measurement book (T+5)',
                t6: 'Wagelist sending (T+6)',
                t7: 'FTO first signature (T+7)',
                t8: 'FTO second signature (T+8)'
            },
            long_labels: {
                t2: 'Filling attendance (T+2)',
                t5: 'Filling measurement book (T+5)',
                t6: 'Wagelist sending (T+6)',
                t7: 'FTO first signature (T+7)',
                t8: 'FTO second signature (T+8)'
            },
            info: {
                body: '<p>Respected MGNREGA Official, {{block_name}},</p><p>In order for PayDash to serve you better, we request you to kindly enter details of various MGNREGA employees in your Block in the following section. To serve PayDash\'s purpose of helping you manage the payment process better, we request you to update this section regularly.</p> <p>In the absence of regular updation, PayDash will not be able point to officials who are responsible for different steps in the payment process. Please read the following guidelines for using this system.</p> <ol> <li>You may use this system only through the web version of PayDash. Any data entered/edited will automatically reflect in the app version.</li> <li>Kindly update officials\' names and contact details as soon as there is any movement of officials for a certain position. Please click the "Fill Data" option to enter and/or edit employee data.</li> <li>This login is only available for the {{block_officer2}} and {{block_officer1}} of your Block. Please do not share PayDash login details with anybody else.</li> <li>You may, however, invite a junior official to edit employee information, if you wish to. Kindly click the "Share this" option to do so. This will allow the official to only view the employee data entry system, but no other feature of PayDash.</li> <li>As mentioned above, because this login is being given to both the {{block_officer2}} and {{block_officer1}}, we request you to coordinate before any of you makes any change because changes made by one official will also reflect in the other official\'s PayDash account.</li> <p>For any other information, please contact the EPoD India team.</p> </ul>',
                share: 'Share this',
                fill: 'Fill data'
            },
            editor: {
                instruction: 'Please update the table below to reflect the current employees in your block responsible for ',
                save: 'Save changes',
                warning: 'Are you sure you want to leave the page? You have unsaved changes that will be lost.',
                unsaved: 'You have unsaved changes',
                leave: 'Leave page',
                stay: 'Stay on page',
                success: 'Changes saved successfully',
                error: 'There was an error saving your changes. Please contact the PayDash team if this problem persists.',
                table: {
                    name: 'Name',
                    mobile_no: 'Mobile No.',
                    panchayat_name: 'Panchayat',
                    designation: 'Designation'
                }
            },
            share: {
                header: 'Share data entry interface',
                instruction: 'To share data entry interface, enter an email address',
                email: 'Email ID',
                region: 'Share a region',
                submit: 'Submit',
                success: 'An email has been sent to this email address with login instructions.',
                user_exists: 'A user with this email is already registered.'
            }
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
                block: 'Block'
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
                    message: 'Are you sure you want to log out? PayDash offline mode is only available if you stay logged in.',
                    logout: 'Log out',
                    cancel: 'Cancel'
                },
                general: 'Unable to log out of PayDash. Please contact the PayDash team if this issue persists.'
            }
        }
    }
};
