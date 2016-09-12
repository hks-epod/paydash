'use strict';

module.exports = {
    $meta: 'Hindi translation file',
    app: {
        $filter: 'role',
        block: {
            paydash: 'पे-डॅश',
            overview: {
                musters_closing_today: 'आज बंद हो रहे मस्टर्स',
                delayed_musters: 'विलंबित मस्टर्स',
                total_transactions: 'पिछले 3 महीनों में कुल कितने भुगतान हुए',
                days_to_payment: 'पिछले 3 महीनों में किए गये हर भुगतान में लगे औसत दिन',
                cards_need_attention: 'कार्ड्स को आपके ध्यान की ज़रूरत है',
                view_cards: 'कार्ड्स देखें'
            },
            cards: {
                cards: 'कार्ड्स',
                musters_closing_today: 'आज बंद हो रहे मस्टर्स',
                delayed_musters_1: 'विलंबित मस्टर्स',
                muster_details: 'मस्टर्स की विस्तार से जानकारी',
                current_musters: 'वर्तमान मस्टर्स',
                delayed_musters_2: 'विलंबित मस्टर्स',
                work_code: 'कार्य कोड',
                work_name: 'कार्य नाम',
                closure_date: 'मस्टर रोल बंद होने की तिथि',
                days_delayed: 'विलंब(दिन)',
                contact: {
                    phone: 'Phone',
                    whatsapp: 'WhatsApp'
                }
            },
            chart: {
                days_to_complete_process: 'प्रक्रिया पूरी करने में लगे दिन',
                steps: {
                    1:'मस्टर रोल बंद से डाटा एंट्री का समय',
                    2:'डाटा एंट्री से वेज लिस्ट बनाने का समय',
                    3:'वेज लिस्ट बनाने से वेज लिस्ट भेजने का समय',
                    4:'वेज लिस्ट भेजने से FTO बनाने का समय',
                    5:'FTO बनाने से पहले हस्ताक्षर का समय',
                    6:'पहले हस्ताक्षर से दूसरे हस्ताक्षर का समय',
                    7:'दूसरे हस्ताक्षर से बैंक की कारवाई के समापन का समय',
                    total:'भुगतान प्रक्रिया पूरी करने में लगे दिन (बिना विभाजन के)',
                    all:'भुगतान प्रक्रिया पूरी करने में लगे दिन (पड़ावों में विभाजित)',
                },
                statutory_limit: 'क़ानून द्वारा निर्धारित समया सीमा',
                dates: {
                    all_dates: 'सभी तारीखें',
                    past_3_months: 'पिछले 3 महीने'
                },
                regions: {
                    panchayat: 'पंचायत',
                    block: 'प्रखंड/जनपद',
                },
                tooltip: {
                    date: 'तारीख',
                    days: 'औसत दिन',
                    transactions: 'भुगतान',
                    step: 'कदम'
                }
            },
            user_dropdown: {
                profile: 'प्रोफ़ाइल',
                logout: 'लौग आउट'
            },
            profile: {
                profile: 'प्रोफ़ाइल',
                edit: 'प्रोफ़ाइल बदलें',
                save:'प्रोफ़ाइल सेव करें',
                updating:'अपडेट होने की प्रक्रिया जारी है...',
                firstname: 'मूल नाम',
                lastname: 'उपनाम',
                mobile: 'मोबाइल नंबर',
                personal_email: 'निजी e-mail',
                work_email: 'औपचारिक e-mail',
                colorblind: 'वर्णांधता (color blindness) के लिए अनुकूल रंग प्रणाली का उपयोग करें',
                lang: 'भाषा',
                eng: 'English',
                hindi: 'Hindi',
                change_pass_button: 'पासवर्ड बदलें'
            },
            password: {
                change_pass: 'पासवर्ड बदलें',
                old_pass: 'पुराना पासवर्ड',
                new_pass: 'नया पासवर्ड',
                pass_confirm: 'नये पासवर्ड को सत्यापित करें',
                forgot_pass: 'मैं अपना पासवर्ड भूल गयी/गया',
                change_pass_button: 'पासवर्ड बदलें'
            },
            search: 'उप यंत्री/ GRS का नाम खोजें',
            sort: {
                current_total: 'आज बंद हो रहे मस्टर्स',
                delayed_total: 'विलंबित मस्टर्स',
                name: 'नाम',
                designation: 'पद'
            },
            messages: {
                login: {
                    connectivity: 'हमे खेद है कि आप log in करने में विफल रहे| कृपया अपने फ़ोन/कंप्यूटर की internet connectivity को जाँच लें|',
                    credentials: 'ऐसा व्यतीत होता है कि आपने ग़लत username या password भरा है | यदि यह समस्या कायम रहती है तो PayDash दल से संपर्क करें|',
                    general: 'हमे खेद है कि आप log in करने में विफल रहे| यदि यह समस्या कायम रहती है तो PayDash दल से संपर्क करें|',
                    ga_account: 'इस मोबाइल/कंप्यूटर से जुड़ा Google अकाउंट आपके PayDash अकाउंट से जुड़े Google अकाउंट से अलग है| यदि यह समस्या कायम रहती है तो PayDash दल से संपर्क करें|'
                },
                logout: {
                    connectivity: 'हमे खेद है कि आप log out करने में विफल रहे| कृपया अपने फ़ोन/कंप्यूटर की internet connectivity को जाँच लें|',
                    warning: {
                        'message':'क्या आप सचमुच Log Out करना चाहते हैं? PayDash का offline mode तभी तक उपलब्ध रहेगा जब तक आप logged in हैं|',
                        'logout': 'Log out',
                        'cancel': 'Cancel'
                    },
                    general: 'हमे खेद है कि आप log out करने में विफल रहे| यदि यह समस्या कायम रहती है तो PayDash दल से संपर्क करें|',
                    logging_out: 'आप लोग आउट हो रहे हैं...'
                },
                profile_success: 'आपकी प्रोफ़ाइल सफलतापूर्वक अपडेट हो चुकी है',
                profile_error: 'प्रोफ़ाइल अपडेट करने की प्रक्रिया असफल रही| यदि यह समस्या कायम रहती है तो PayDash दल से संपर्क करें|',
                password_success: 'पासवर्ड सफलतापूर्वक बदला जा चुका है|',
                password_wrong_old: 'पुराना पासवर्ड ग़लत है| सहयता के लिए PayDash दल से संपर्क करें|',
                password_new_nomatch: 'नया पासवर्ड मेल नही ख़ाता|',
                password_tooshort: 'आपके नये पासवर्ड की लंबाई कम से कम 6 अक्षर होनी चाहिए|',
                password_network_error: 'पासवर्ड बदलने की प्रक्रिया असफल रही| कृपया नेटवर्क सशक्त होने पर दोबारा कोशिश करें|',
                password_empty: 'पासवर्ड रिक्त नही रह सकता',
                requesting_change: 'पासवर्ड बदलने की प्रक्रिया जारी है',
                update_available: 'नया अपडेट उपलब्ध है',
                update: 'अपडेट',
                grant_permission: 'कृपया प्रक्रिया आगे बढ़ाने के लिए अनुमति दें'
            },
            contact: {
                contact: 'संपर्क करें',
                gmail: 'Gmail',
                phone: 'Phone'
            },
            whatsapp: {
                overview:'{name} के लिए मस्टर रोल विवरण\n\n{current_total} मस्टर रोल आज बंद हो रहे हैं\n{delayed_total} मस्टर रोल विलंबित हैं\n\n',
                current:'आज बंद हो रहे मस्टर्स\n\n_मस्टर रोल क्रमांक_\n{msr_no}\n_पंचायत_\n{panchayat_name}\n_कार्य कोड_\n{work_code}\n_कार्य नाम_\n{work_name}\n_मस्टर रोल बंद होने की तिथि_\n{closure_date}\n\n',
                delayed:'विलंबित मस्टर्स\n\n_मस्टर रोल क्रमांक_\n{msr_no}\n_पंचायत_\n{panchayat_name}\n_कार्य कोड_\n{work_code}\n_कार्य नाम_\n{work_name}\n_मस्टर रोल बंद होने की तिथि_\n{closure_date}\n_विलंब(दिन)_\n{days_pending}\n\n'
            }
        },
        district: {
            paydash: 'पे-डॅश',
            overview: {
                view_your_blocks: 'अपने ज़िले के {blocks_total} जनपदों का प्रदर्शन देखें',
                show_blocks: 'जनपद देखें',
                days_to_payment: 'पिछले 3 महीनों में किए गये हर भुगतान में लगे औसत दिन',
                musters_closing_today: 'आज बंद हो रहे मस्टर्स',
                delayed_musters: 'विलंबित मस्टर्स'
            },
            cards: {
                cards: 'कार्ड्स',
                days_to_payment: 'पिछले 3 महीनों में किए गये हर भुगतान में लगे औसत दिन',
                musters_closing_today: 'आज बंद हो रहे मस्टर्स',
                delayed_musters: 'विलंबित मस्टर्स',
                musters_diff_steps: 'विभिन्न पड़ावों पर विलंबित मस्टर रोल',
                avg_days_pending: 'औसत विलंब',
                total: 'कुल मस्टर रोल',
                t_2: 'अटेंडेन्स नहीं भरी गयी (T+2)',
                t_5: 'MB नहीं भरी गयी (T+5)',
                t_6: 'वेज लिस्ट नहीं भेजी गयी (T+6)',
                t_7: 'FTO पर पहला हस्ताक्षर नहीं हुआ (T+7)',
                t_8: 'FTO पर दूसरा हस्ताक्षर नहीं हुआ (T+8)',
                contact: {
                    phone: 'Phone',
                    whatsapp: 'WhatsApp'
                }
            },
            chart: {
                days_to_complete_process: 'प्रक्रिया पूरी करने में लगे दिन',
                steps: {
                    1:'मस्टर रोल बंद से डाटा एंट्री का समय',
                    2:'डाटा एंट्री से वेज लिस्ट बनाने का समय',
                    3:'वेज लिस्ट बनाने से वेज लिस्ट भेजने का समय',
                    4:'वेज लिस्ट भेजने से FTO बनाने का समय',
                    5:'FTO बनाने से पहले हस्ताक्षर का समय',
                    6:'पहले हस्ताक्षर से दूसरे हस्ताक्षर का समय',
                    7:'दूसरे हस्ताक्षर से बैंक की कारवाई के समापन का समय',
                    total:'भुगतान प्रक्रिया पूरी करने में लगे दिन (बिना विभाजन के)',
                    all:'भुगतान प्रक्रिया पूरी करने में लगे दिन (पड़ावों में विभाजित)',
                },
                statutory_limit: 'क़ानून द्वारा निर्धारित समया सीमा',
                dates: {
                    all_dates: 'सभी तारीखें',
                    past_3_months: 'पिछले 3 महीने'
                },
                regions: {
                    block: 'प्रखंड/जनपद',
                    district: 'ज़िला'
                },
                tooltip: {
                    date: 'तारीख',
                    days: 'औसत दिन',
                    transactions: 'भुगतान',
                    step: 'कदम'
                }
            },
            user_dropdown: {
                profile: 'प्रोफ़ाइल',
                logout: 'लौग आउट'
            },
            profile: {
                profile: 'प्रोफ़ाइल',
                edit: 'प्रोफ़ाइल बदलें',
                save:'प्रोफ़ाइल सेव करें',
                updating:'अपडेट होने की प्रक्रिया जारी है...',
                firstname: 'मूल नाम',
                lastname: 'उपनाम',
                mobile: 'मोबाइल नंबर',
                personal_email: 'निजी e-mail',
                work_email: 'औपचारिक e-mail',
                colorblind: 'वर्णांधता (color blindness) के लिए अनुकूल रंग प्रणाली का उपयोग करें',
                lang: 'भाषा',
                eng: 'English',
                hindi: 'Hindi',
                change_pass_button: 'पासवर्ड बदलें'
            },
            password: {
                change_pass: 'पासवर्ड बदलें',
                old_pass: 'पुराना पासवर्ड',
                new_pass: 'नया पासवर्ड',
                pass_confirm: 'नये पासवर्ड को सत्यापित करें',
                forgot_pass: 'मैं अपना पासवर्ड भूल गयी/गया',
                change_pass_button: 'पासवर्ड बदलें'
            },
            search: 'जनपद/प्रखंड या अफ़सर का नाम खोजें',
            sort: {
                current_total: 'आज बंद हो रहे मस्टर्स',
                delayed_total: 'विलंबित मस्टर्स',
                days_to_payment: 'पिछले 3 महीनों में किए गये हर भुगतान में लगे औसत दिन',
                block_name: 'जनपद/प्रखंड का नाम',
                ceo_name: 'जनपद/प्रखंड CEO का नाम'
            },
            messages: {
                login: {
                    connectivity: 'हमे खेद है कि आप log in करने में विफल रहे| कृपया अपने फ़ोन/कंप्यूटर की internet connectivity को जाँच लें|',
                    credentials: 'ऐसा व्यतीत होता है कि आपने ग़लत username या password भरा है | यदि यह समस्या कायम रहती है तो PayDash दल से संपर्क करें|',
                    general: 'हमे खेद है कि आप log in करने में विफल रहे| यदि यह समस्या कायम रहती है तो PayDash दल से संपर्क करें|',
                    ga_account: 'इस मोबाइल/कंप्यूटर से जुड़ा Google अकाउंट आपके PayDash अकाउंट से जुड़े Google अकाउंट से अलग है| यदि यह समस्या कायम रहती है तो PayDash दल से संपर्क करें|'
                },
                logout: {
                    connectivity: 'हमे खेद है कि आप log out करने में विफल रहे| कृपया अपने फ़ोन/कंप्यूटर की internet connectivity को जाँच लें|',
                    warning: {
                        'message':'क्या आप सचमुच Log Out करना चाहते हैं? PayDash का offline mode तभी तक उपलब्ध रहेगा जब तक आप logged in हैं|',
                        'logout': 'Log out',
                        'cancel': 'Cancel'
                    },
                    general: 'हमे खेद है कि आप log out करने में विफल रहे| यदि यह समस्या कायम रहती है तो PayDash दल से संपर्क करें|',
                    logging_out: 'आप लोग आउट हो रहे हैं...'
                },
                profile_success: 'आपकी प्रोफ़ाइल सफलतापूर्वक अपडेट हो चुकी है',
                profile_error: 'प्रोफ़ाइल अपडेट करने की प्रक्रिया असफल रही| यदि यह समस्या कायम रहती है तो PayDash दल से संपर्क करें|',
                password_success: 'पासवर्ड सफलतापूर्वक बदला जा चुका है|',
                password_wrong_old: 'पुराना पासवर्ड ग़लत है| सहयता के लिए PayDash दल से संपर्क करें|',
                password_new_nomatch: 'नया पासवर्ड मेल नही ख़ाता|',
                password_tooshort: 'आपके नये पासवर्ड की लंबाई कम से कम 6 अक्षर होनी चाहिए|',
                password_network_error: 'पासवर्ड बदलने की प्रक्रिया असफल रही| कृपया नेटवर्क सशक्त होने पर दोबारा कोशिश करें|',
                password_empty: 'पासवर्ड रिक्त नही रह सकता',
                requesting_change: 'पासवर्ड बदलने की प्रक्रिया जारी है',
                update_available: 'नया अपडेट उपलब्ध है',
                update: 'अपडेट',
                grant_permission: 'कृपया प्रक्रिया आगे बढ़ाने के लिए अनुमति दें'
            },
            contact: {
                contact: 'संपर्क करें',
                gmail: 'Gmail',
                phone: 'Phone'
            },
            whatsapp: '{name} के लए MGNREGA भुगतान प्रदर्शन\n\n_प्रखंड/जनपद_\n{block_name}\n\nभुगतान प्रक्रिया पूरी करने के लिए औसतन {days_to_payment} दिन लगे\n{current_total} मस्टर रोल आज बंद हो रहे हैं\n{delayed_total} मस्टर रोल विलंबित हैं\n\nविभिन्न पड़ावों पर विलंबित मस्टर रोल\n\n*अटेंडेन्स नहीं भरी गयी (T+2)*\n_कुल मस्टर रोल_\n{t2_total}\n_औसत विलंब_\n{t2_avg}\n\n*MB नहीं भरी गयी (T+5)*\n_कुल मस्टर रोल_\n{t5_total}\n_औसत विलंब_\n{t5_avg}\n\n*वेज लिस्ट नहीं भेजी गयी (T+6)*\n_कुल मस्टर रोल_\n{t6_total}\n_औसत विलंब_\n{t6_avg}\n\n*FTO पर पहला हस्ताक्षर नहीं हुआ (T+7)*\n_कुल मस्टर रोल_\n{t7_total}\n_औसत विलंब_\n{t7_avg}\n\n*FTO पर दूसरा हस्ताक्षर नहीं हुआ (T+8)*\n_कुल मस्टर रोल_\n{t8_total}\n_औसत विलंब_\n{t8_avg}\n'
        }
    }
};
