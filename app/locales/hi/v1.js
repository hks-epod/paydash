'use strict';

module.exports = {
    $meta: 'Hindi translation file',
    web: {
        navigation: {
            overview: 'संक्षेप',
            musters: {
                $filter: 'role',
                district: 'जनपद',
                block: 'मस्टर्स'
            },
            performance: 'प्रदर्शन'
        },
        overview: {
            current: 'वर्तमान मस्टर्स',
            delayed: 'विलंबित मस्टर्स',
            days_to_payment: 'भुगतान के लिए दिन',
            welcome: {
                1: 'नमस्कार',
                2: 'जी'
            },
            description: {
                $filter: 'role',
                block: 'MGNREGA भुगतनों के सन्दर्भ में आपके जनपद के प्रदर्शन से जुड़ी जानकारी प्रस्तुत है|',
                district: 'MGNREGA भुगतनों के सन्दर्भ में आपके ज़िले के प्रदर्शन से जुड़ी जानकारी प्रस्तुत है'
            }
        },
        musters: {
            current: 'वर्तमान मस्टर्स',
            delayed: 'विलंबित मस्टर्स',
            muster_details: 'मस्टर्स की विस्तार से जानकारी',
            officers: 'अधिकारि',
            delayed_musters: 'विलंबित मस्टर्स',
            msr_no: 'मस्टर क्रमांक',
            panchayat_name: 'पंचायत का नाम',
            work_name: 'कार्य नाम',
            work_code: 'कार्य कोड',
            closure_date: 'मस्टर रोल बंद होने की तिथि',
            days_pending: 'कितने दिनो का विलंब',
            current_total: 'वर्तमान मस्टर्स',
            delayed_total: 'विलंबित मस्टर्स',
            name: 'नाम',
            designation: 'पदनाम',
            block_name: 'प्रखंड नाम',
            days_to_payment: 'भुगतान के दिन',
            no_muster_information: 'इस समय जानकारी उपलब्ध नहीं है',
            sort_by: 'क्रमबद्ध करें',
            search_placeholder: 'खोजे'
        },
        performance: {
            overview: {
                title: {
                    $filter: 'role',
                    district: 'आपके ज़िले का प्रदर्शन',
                    block: 'आपके प्रखंड/जनपद का प्रदर्शन',
                    $default: 'अवलोकन प्रदर्शन'
                },
                description: {
                    $filter: 'role',
                    district: 'आपके ज़िले में मज़दूरी भुगतान के हर एक पड़ाव पर लगे औसत दिन',
                    block: 'आपके प्रखंड/जनपद में मज़दूरी भुगतान के हर एक पड़ाव पर लगे औसत दिन',
                    $default: 'आपके क्षेत्रों में मज़दूरी भुगतान के हर एक पड़ाव पर लगे औसत दिन'
                },
                tooltip: 'यह ग्राफ़ MGNREGA मज़दूरी भुगतान में लगा औसत समय दिखाता है| वर्णित तिथियों पर हुए भुगतान में लगे समय को 7 पड़ावों में बाटा गया है| इसलिए, केवल पूरे हुए भुगतान का डाटा दिखाया जा रहा है|',
                labels: [
                    'मस्टर रोल बंद से डाटा एंट्री का समय',
                    'डाटा एंट्री से वेज लिस्ट बनाने का समय',
                    'वेज लिस्ट बनाने से वेज लिस्ट भेजने का समय',
                    'वेज लिस्ट भेजने से FTO बनाने का समय',
                    'FTO बनाने से पहले हस्ताक्षर का समय',
                    'पहले हस्ताक्षर से दूसरे हस्ताक्षर का समय',
                    'दूसरे हस्ताक्षर से बैंक की कारवाई के समापन का समय'
                ],
            },
            comparison: {
                title: {
                    $filter: 'role',
                    district: 'आपके प्रदर्शन की तुलना',
                    block: 'आपके प्रदर्शन की तुलना',
                    $default: 'आपके प्रदर्शन की तुलना'
                },
                description: {
                    $filter: 'role',
                    district: 'अपने ज़िले के औसत प्रदर्शन की तुलना राज्य के औसत प्रदर्शन से करें',
                    block: 'अपने प्रखंड/जनपद के औसत प्रदर्शन की तुलना ज़िले और राज्य के औसत प्रदर्शन से करें ',
                    $default: 'अपने प्रखंड/जनपद के औसत प्रदर्शन की तुलना अन्य क्षेत्रों के औसत प्रदर्शन से करें'
                },
                labels: {
                    'state': 'राज्य औसत',
                    'district': 'ज़िला औसत',
                    'block': 'प्रखंड औसत',
                    'panchayat': 'जनपद औसत',
                },
                total_trans: {
                    'state': 'महीना : राज्य में कुल भुगतानों की संख्या',
                    'district': 'महीना : ज़िला में कुल भुगतानों की संख्या',
                    'block': 'महीना : जनपद में कुल भुगतानों की संख्या',
                    'panchayat': 'महीना : पंचायत में कुल भुगतानों की संख्या',
                },
                tooltip: 'यह ग्राफ़ MGNREGA मज़दूरी भुगतान में लगा औसत समय दिखाता है| वर्णित तिथियों पर हुए भुगतान में लगे समय को 7 पड़ावों में बाटा गया है| इसलिए, केवल पूरे हुए भुगतान का डाटा दिखाया जा रहा है|',
            },
            y_axis_labels: 'प्रक्रिया पूरी करने में लगे दिन',
            total_trans: 'तिथि : कुल भुगतानों की संख्या-'
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
            forgot_pass: 'मैं अपना पासवर्ड भूल गयी/गया',
            colorblind: 'कलर ब्लाइंड'
        },
        editor: {
            nav: {
                t_2: 'T+2',
                t_5: 'T+5',
                t_6: 'T+6',
                t_7: 'T+7',
                t_8: 'T+8',
            },
            info: {
                text: ''
            }
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
