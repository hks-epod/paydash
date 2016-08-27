'use strict';

module.exports = {
    $meta: 'Hindi translation file',
    web: {
        overview: {
            current: 'वर्तमान मस्टर्स',
            delayed: 'विलंबित मस्टर्स',
            days_to_payment: 'भुगतान के लिए दिन',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        musters: {
            current: 'वर्तमान मस्टर्स',
            delayed: 'विलंबित मस्टर्स',
            muster_details: 'MUSTER DETAILS',
            current_musters: 'विलंबित मस्टर्स',
            delayed_musters: 'विलंबित मस्टर्स',
            msr_no: 'MUSTER NO.',
            panchayat_name :'PANCHAYAT NAME',
            work_name : 'WORK NAME',
            work_code: 'WORK CODE',
            closure_date: 'CLOSURE DATE',
            days_pending: 'DAYS PENDING'
        }
    },
    app: {
        overview: {
            musters_closing_today: 'आज बंद हो रहे मस्टर्स',
            delayed_musters: 'विलंबित मस्टर्स',
            total_transactions: 'पिछले 3 महीनों में कुल कितने भुगतान हुए',
            days_to_payment: 'पिछले 3 महीनों में भुगतान के लिए दिन',
            cards_need_attention: 'कार्ड्स को आपके ध्यान की ज़रूरत है',
            view_cards: 'कार्ड्स देखें'
        },
        cards: {
            musters_closing_today: 'आज बंद हो रहे मस्टर्स',
            delayed_musters_1: 'विलंबित मस्टर्स',
            muster_details: 'मस्टर्स की विस्तार से जानकारी',
            current_musters: 'वर्तमान मस्टर्स',
            delayed_musters_2: 'विलंबित मस्टर्स',
            work_code: 'कार्य कोड',
            work_name: 'कार्य नाम',
            closure_date: 'मस्टर रोल बंद होने की तिथि',
            days_delayed: 'विलंब(दिन)'
        },
        chart: {
            days_to_complete_process: 'प्रक्रिया पूरी करने में लगे दिन',
            steps: {
                1: 'मस्टर रोल बंद से डाटा एंट्री का समय',
                2: 'डाटा एंट्री से वेज लिस्ट बनाने का समय',
                3: 'वेज लिस्ट बनाने से वेज लिस्ट भेजने का समय',
                4: 'वेज लिस्ट भेजने से FTO बनाने का समय',
                5: 'FTO बनाने से पहले हस्ताक्षर का समय',
                6: 'पहले हस्ताक्षर से दूसरे हस्ताक्षर का समय',
                7: 'दूसरे हस्ताक्षर से बैंक की कारवाई के समापन का समय',
                all: 'पूरी प्रक्रिया के सारे पड़ाव',
            },
            dates: {
                all_dates: 'सभी तारीखें',
                last_60: 'पिछले 60 दिन',
                last_30: 'पिछले 30 दिन'
            },
            regions: {
                panchayat: 'पंचायत',
                block: 'प्रखंड/जनपद'
            },
            tooltip: {
                date: 'तारीख',
                days: 'औसत दिन',
                transactions: 'भुगतान',
                step: 'कदम'
            }
        },
        notifications: {
            notifications: 'संदेश',
            read: 'पठित',
            unread: 'अपठित'
        },
        profile: {
            firstname: 'मूल नाम',
            lastname: 'उपनाम',
            profile: 'प्रोफ़ाइल',
            account: 'अकाउंट',
            work_email: 'औपचारिक e-mail',
            mobile: 'मोबाइल नंबर',
            personal_email: 'निजी e-mail',
            lang: 'भाषा',
            settings: 'सेट्टिंग्स',
            logout: 'लौग आउट',
            profile_settings: 'आपकी प्रोफ़ाइल सेट्टिंग्स',
            email_settings: 'E-Mail सेट्टिंग्स',
            primary_email_msg: 'आपके अकाउंट से संबंधित संदेशों और इंटरनेट-संबंधित प्रक्रियाओं के लिए आपके मुख्य e-mail ID का उपयोग किया जाएगा.',
            save: 'अद्यतन (update)',
            your_primary_email: 'आपका मुख्य e-mail ID',
            change_pass: 'पासवर्ड बदलें',
            old_pass: 'पुराना पासवर्ड ',
            new_pass: 'नया पासवर्ड ',
            pass_confirm: 'नये पासवर्ड को सत्यापित करें',
            forgot_pass: 'मैं अपना पासवर्ड भूल गयी/गया'
        },
        messages: {
            login: {
                connectivity: 'हमे खेद है कि आप log in करने में विफल रहे| कृपया अपने फ़ोन/कंप्यूटर की internet connectivity को जाँच लें |',
                credentials: 'ऐसा व्यतीत होता है कि आपने ग़लत username या password भरा है | यदि यह समस्या कायम रहती है तो PayDash दल से संपर्क करें |',
                general: 'हमे खेद है कि आप log in करने में विफल रहे | यदि यह समस्या कायम रहती है तो PayDash दल से संपर्क करें |'
            },
            logout: {
                connectivity: 'हमे खेद है कि आप log out करने में विफल रहे| कृपया अपने फ़ोन/कंप्यूटर की internet connectivity को जाँच लें |',
                warning: {
                    'message': 'क्या आप सचमुच Log Out करना चाहते हैं? PayDash का offline mode तभी तक उपलब्ध रहेगा जब तक आप logged in हैं |',
                    'logout': 'Log out',
                    'cancel': 'Cancel'
                },
                general: 'हमे खेद है कि आप log out करने में विफल रहे | यदि यह समस्या कायम रहती है तो PayDash दल से संपर्क करें |'
            }
        }
    }
};
