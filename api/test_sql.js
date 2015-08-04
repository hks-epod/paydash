var express = require('express');
var mysql = require('mysql');

var router = express.Router();
 
var pool = mysql.createPool({
    host: 'epodindia.cvthz0qudx9w.ap-southeast-1.rds.amazonaws.com',
    user: 'paydash',
    password: 'ep()danalytics1235',
    database: 'nrega_payments',
    multipleStatements: true
});

var BLOCK_CODE = "1709003"; // we'll take this from login system


pool.getConnection(function(err, connection) {

	var data = {};

    if (err) {
        console.error("An error occurred: " + err);
    }

    connection.query("SELECT state_code,state_name,total_transactions tot_trn,date,ROUND(mrc_mre_mean,2) mrc_mre,ROUND(mre_wlg_mean,2) mre_wlg,ROUND(wlg_wls_mean,2) wlg_wls,ROUND(wls_fto_mean,2) wls_fto,ROUND(fto_firstsign_mean,2) fto_sn1,ROUND(firstsign_secondsign_mean,2) sn1_sn2,ROUND(secondsign_processed_mean,2) sn2_prc FROM state_delays_duration a WHERE a.gender = 'both' AND a.bank_type = 'b' AND a.date_type = 'processed_date' AND a.total_transactions > 0 AND a.state_code in (SELECT b.state_code FROM blocks b WHERE b.block_code ='"+BLOCK_CODE+"') ORDER BY date ASC; SELECT district_code,district_name,total_transactions tot_trn,date,ROUND(mrc_mre_mean,2) mrc_mre,ROUND(mre_wlg_mean,2) mre_wlg,ROUND(wlg_wls_mean,2) wlg_wls,ROUND(wls_fto_mean,2) wls_fto,ROUND(fto_firstsign_mean,2) fto_sn1,ROUND(firstsign_secondsign_mean,2) sn1_sn2,ROUND(secondsign_processed_mean,2) sn2_prc FROM district_delays_duration a WHERE a.gender = 'both' AND a.bank_type = 'b' AND a.date_type = 'processed_date' AND a.total_transactions > 0 AND a.district_code in (SELECT b.district_code FROM blocks b WHERE b.block_code ='"+BLOCK_CODE+"') ORDER BY date ASC; SELECT block_code,block_name,total_transactions tot_trn,date,ROUND(mrc_mre_mean,2) mrc_mre,ROUND(mre_wlg_mean,2) mre_wlg,ROUND(wlg_wls_mean,2) wlg_wls,ROUND(wls_fto_mean,2) wls_fto,ROUND(fto_firstsign_mean,2) fto_sn1,ROUND(firstsign_secondsign_mean,2) sn1_sn2,ROUND(secondsign_processed_mean,2) sn2_prc FROM block_delays_duration WHERE gender = 'both' AND bank_type = 'b' AND date_type = 'processed_date' AND total_transactions > 0 AND block_code ='"+BLOCK_CODE+"' ORDER BY date ASC; SELECT panchayat_code,panchayat_name,total_transactions tot_trn,date,ROUND(mrc_mre_mean,2) mrc_mre,ROUND(mre_wlg_mean,2) mre_wlg,ROUND(wlg_wls_mean,2) wlg_wls,ROUND(wls_fto_mean,2) wls_fto,ROUND(fto_firstsign_mean,2) fto_sn1,ROUND(firstsign_secondsign_mean,2) sn1_sn2,ROUND(secondsign_processed_mean,2) sn2_prc FROM panchayat_delays_duration WHERE gender = 'both' AND bank_type = 'b' AND date_type = 'processed_date' AND total_transactions > 0 AND block_code ='"+BLOCK_CODE+"' ORDER BY panchayat_code ASC, date ASC;", function(err, rows) {
        if (err) {
            throw err;
        } else {

            var final_dict = {};

            var stateResponse = rows[0];
            var districtResponse = rows[1];
            var blockResponse = rows[2];
            var panchayatResponse = rows[3];

            // process state data
            var stateName = stateResponse[0]['state_name'];
            var stateCode = stateResponse[0]['state_code'];
            var data = [];
            stateResponse.forEach(function(d) {
                var dt = d['date'].getFullYear() + '' + padNum(d['date'].getMonth() + 1) + '' + padNum(d['date'].getDate());
                data.push([dt,d['mrc_mre'],d['mre_wlg'],d['wlg_wls'],d['wls_fto'],d['fto_sn1'],d['sn1_sn2'],d['sn2_prc'],d['tot_trn']]);
            });
            final_dict['state'] = {'state_code':stateCode,'state_name':stateName,'data':data};

            // process district data
            var districtName = districtResponse[0]['district_name'];
            var districtCode = districtResponse[0]['district_code'];
            var data = [];
            districtResponse.forEach(function(d) {
                var dt = d['date'].getFullYear() + '' + padNum(d['date'].getMonth() + 1) + '' + padNum(d['date'].getDate());
                data.push([dt,d['mrc_mre'],d['mre_wlg'],d['wlg_wls'],d['wls_fto'],d['fto_sn1'],d['sn1_sn2'],d['sn2_prc'],d['tot_trn']]);
            });
            final_dict['district'] = {'district_code':districtCode,'district_name':districtName,'data':data};
            
            // process block data
            var blockName = blockResponse[0]['block_name'];
            var blockCode = blockResponse[0]['block_code'];
            var data = [];
            blockResponse.forEach(function(d) {
                var dt = d['date'].getFullYear() + '' + padNum(d['date'].getMonth() + 1) + '' + padNum(d['date'].getDate());
                data.push([dt,d['mrc_mre'],d['mre_wlg'],d['wlg_wls'],d['wls_fto'],d['fto_sn1'],d['sn1_sn2'],d['sn2_prc'],d['tot_trn']]);
            });
            final_dict['block'] = {'block_code':blockCode,'block_name':blockName,'data':data};

            // process panchayat data
            final_dict['panchayats'] = [];
            var panchayats = uniq_fast(panchayatResponse.map(function(d) { return d.panchayat_code }));
            panchayats.forEach(function(c) {
                var thisPanchayat = panchayatResponse.filter(function(d) { return d.panchayat_code===c; });
                var panchayatName = thisPanchayat[0]['panchayat_name'];
                var data = [];
                thisPanchayat.forEach(function(d) {
                    var dt = d['date'].getFullYear() + '' + padNum(d['date'].getMonth() + 1) + '' + padNum(d['date'].getDate());
                    data.push([dt,d['mrc_mre'],d['mre_wlg'],d['wlg_wls'],d['wls_fto'],d['fto_sn1'],d['sn1_sn2'],d['sn2_prc'],d['tot_trn']]);
                });
                final_dict['panchayats'].push({'panchayat_code':c,'panchayat_name':panchayatName,'data':data});
            });
            final_dict['panchayats'].sort(function(a,b) {
                var aTarget = a['data'][a['data'].length-1];
                var bTarget = b['data'][b['data'].length-1];
                var aSum = aTarget[1] + aTarget[2] + aTarget[3] + aTarget[4] + aTarget[5] + aTarget[6] + aTarget[7];
                var bSum = bTarget[1] + bTarget[2] + bTarget[3] + bTarget[4] + bTarget[5] + bTarget[6] + bTarget[7];
                return bSum - aSum;
            });
            
            console.log(JSON.stringify(final_dict));
            // res.json(final_dict);
            // res.end();

            function padNum(num) {
                var str = num.toString();
                return str.length===1 ? '0'+str : str;
            }
            function uniq_fast(a) { // quickly drop duplicate values from an array
                var seen = {};
                var out = [];
                var len = a.length;
                var j = 0;
                for(var i = 0; i < len; i++) {
                    var item = a[i];
                    if(seen[item] !== 1) {
                        seen[item] = 1;
                        out[j++] = item;
                    }
                }
                return out;
            }
        }
        connection.release();
    });
});
