'use strict';

exports.overview = function(USER_ID, ROLE) {
    if (ROLE === 'block') {
        return (
            "SELECT a.region_code, a.region_name, IFNULL(b.current_total,0) AS current_total, IFNULL(c.delayed_total,0) AS delayed_total, IFNULL(d.delayed_no_t5,0) AS delayed_no_t5, IFNULL(e.days_to_payment,'No Data') AS days_to_payment FROM (SELECT region_code, region_name FROM user_regions WHERE user_id='" +
            USER_ID +
            "') a LEFT JOIN (SELECT count(*) AS current_total, block_code AS region_code FROM current_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
            USER_ID +
            "') GROUP BY region_code) b ON a.region_code = b.region_code LEFT JOIN (SELECT count(*) AS delayed_total, block_code AS region_code FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
            USER_ID +
            "') GROUP BY region_code) c ON a.region_code = c.region_code LEFT JOIN (SELECT count(*) AS delayed_no_t5, block_code AS region_code FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
            USER_ID +
            "' AND step<>'t5') GROUP BY region_code) d ON a.region_code = d.region_code LEFT JOIN (SELECT ROUND(SUM(mrc_processed_mean * total_transactions) / SUM(total_transactions),1) AS days_to_payment, block_code AS region_code FROM block_delays_duration WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
            USER_ID +
            "') AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' and date>=DATE_SUB(now(), INTERVAL 3 MONTH) GROUP BY region_code) e ON a.region_code = e.region_code;"
        );
    } else if (ROLE === 'district') {
        return (
            "SELECT a.region_code, a.region_name, IFNULL(b.current_total,0) AS current_total, IFNULL(c.delayed_total,0) AS delayed_total, IFNULL(d.delayed_no_t5,0) AS delayed_no_t5, IFNULL(e.days_to_payment,'No Data') AS days_to_payment FROM (SELECT region_code, region_name FROM user_regions WHERE user_id='" +
            USER_ID +
            "') a LEFT JOIN (SELECT count(*) AS current_total, b.district_code AS region_code FROM current_musters a INNER JOIN (SELECT district_code, block_code from blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
            USER_ID +
            ')) b ON a.block_code = b.block_code GROUP BY region_code ) b ON a.region_code = b.region_code LEFT JOIN (SELECT count(*) AS delayed_total, b.district_code AS region_code FROM delayed_musters a INNER JOIN (SELECT district_code, block_code from blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=' +
            USER_ID +
            ")) b ON a.block_code = b.block_code GROUP BY region_code ) c ON a.region_code = c.region_code LEFT JOIN (SELECT count(*) AS delayed_no_t5, b.district_code AS region_code FROM (select * from delayed_musters WHERE step<>'ds_t5') a INNER JOIN (SELECT district_code, block_code from blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
            USER_ID +
            ")) b ON a.block_code = b.block_code GROUP BY region_code ) d ON a.region_code = d.region_code LEFT JOIN (SELECT ROUND(SUM(mrc_processed_mean * total_transactions) / SUM(total_transactions),1) AS days_to_payment, district_code AS region_code FROM district_delays_duration WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
            USER_ID +
            "') AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' and date>=DATE_SUB(now(), INTERVAL 3 MONTH) GROUP BY region_code) e ON a.region_code = e.region_code;"
        );
    } else if (ROLE === 'state') {
        return (
            "SELECT a.region_code, a.region_name, IFNULL(b.current_total,0) AS current_total, IFNULL(c.delayed_total,0) AS delayed_total, IFNULL(d.delayed_no_t5,0) AS delayed_no_t5, IFNULL(e.days_to_payment,'No Data') AS days_to_payment FROM (SELECT region_code, region_name FROM user_regions WHERE user_id="+USER_ID+") a LEFT JOIN (SELECT count(*) AS current_total, b.state_code AS region_code FROM current_musters a INNER JOIN (SELECT state_code, block_code FROM blocks WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") ) b ON a.block_code = b.block_code GROUP BY region_code ) b ON a.region_code = b.region_code LEFT JOIN (SELECT count(*) AS delayed_total, b.state_code AS region_code FROM delayed_musters a INNER JOIN (SELECT state_code, block_code from blocks WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") ) b ON a.block_code = b.block_code GROUP BY region_code ) c ON a.region_code = c.region_code LEFT JOIN (SELECT count(*) AS delayed_no_t5, b.state_code AS region_code FROM (select * FROM delayed_musters WHERE step<>'ds_t5') a INNER JOIN (SELECT state_code, block_code from blocks WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") ) b ON a.block_code = b.block_code GROUP BY region_code ) d ON a.region_code = d.region_code LEFT JOIN (SELECT ROUND(SUM(mrc_processed_mean * total_transactions) / SUM(total_transactions),1) AS days_to_payment, state_code AS region_code FROM state_delays_duration WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' and date>=DATE_SUB(now(), INTERVAL 3 MONTH) GROUP BY region_code ) e ON a.region_code = e.region_code;"
        );
    }
};

exports.cards = function(USER_ID, ROLE) {
    if (ROLE === 'block') {
        return (
            "SELECT a.staff_id, IFNULL(a.name,'Unmapped') AS name, a.task_assign, IFNULL(a.mobile_no,'') AS mobile_no, a.block_code, a.block_name, IFNULL(c.current_total,0) AS current_total, IFNULL(d.delayed_total,0) AS delayed_total, IFNULL(e.delayed_no_t5,0) AS delayed_total, b.msr_no, b.work_name, b.work_code, b.panchayat_name, b.end_date, b.days_pending, b.step, b.type FROM (SELECT a.staff_id, a.name, b.designation as task_assign, a.mobile_no, b.block_code, c.block_name FROM employees_unique a INNER JOIN employee_regions b ON a.staff_id=b.staff_id AND block_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
            USER_ID +
            ') INNER JOIN blocks c ON b.block_code=c.block_code UNION SELECT a.staff_id, a.name, a.task_assign, a.mobile_no, b.block_code, b.block_name FROM (SELECT NULL as staff_id, NULL as name, NULL as task_assign, NULL as mobile_no, 1 as merge ) a RIGHT JOIN (SELECT region_code as block_code, region_name as block_name, 1 as merge FROM user_regions WHERE user_id=' +
            USER_ID +
            ") b ON a.merge = b.merge ) a LEFT JOIN (SELECT a.staff_id, b.block_code, b.msr_no, b.work_name, b.work_code, b.panchayat_name, DATE_FORMAT(b.end_date,'%d-%m-%Y') as end_date, NULL as days_pending, NULL AS step, 'current_musters' AS type FROM (SELECT a.staff_id, b.panchayat_code FROM employees_unique a INNER JOIN employee_regions b ON a.staff_id=b.staff_id AND b.block_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
            USER_ID +
            ") AND b.step IN ('t2','t5') ) a RIGHT JOIN (SELECT * FROM current_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
            USER_ID +
            ") ) b ON a.panchayat_code = b.panchayat_code UNION SELECT a.staff_id, b.block_code, b.msr_no, b.work_name, b.work_code, b.panchayat_name, DATE_FORMAT(b.end_date,'%d-%m-%Y') as end_date, (datediff(CURDATE(), b.end_date) - SUBSTR(b.step,5,1)) AS days_pending, b.step, 'delayed_musters' AS type FROM (SELECT a.staff_id, b.step, b.block_code, b.panchayat_code FROM employees_unique a INNER JOIN employee_regions b ON a.staff_id=b.staff_id WHERE b.block_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
            USER_ID +
            ') ) a RIGHT JOIN (SELECT * FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id=' +
            USER_ID +
            ") ) b ON (a.panchayat_code = b.panchayat_code AND a.step = SUBSTR(b.step,4,2)) OR (a.panchayat_code = '' and a.block_code=b.block_code AND a.step = SUBSTR(b.step,4,2)) ) b ON a.staff_id=b.staff_id OR (a.staff_id IS NULL AND b.staff_id IS NULL AND a.block_code=b.block_code) LEFT JOIN (SELECT count(*) AS current_total, a.staff_id, b.block_code FROM (SELECT a.staff_id, b.panchayat_code FROM employees_unique a INNER JOIN employee_regions b ON a.staff_id=b.staff_id AND b.block_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
            USER_ID +
            ") AND b.step IN ('t2','t5') ) a RIGHT JOIN (SELECT * FROM current_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
            USER_ID +
            ') ) b ON a.panchayat_code = b.panchayat_code GROUP BY staff_id, b.block_code ) c ON a.staff_id=c.staff_id OR (a.staff_id IS NULL AND c.staff_id IS NULL AND a.block_code=c.block_code) LEFT JOIN (SELECT count(*) AS delayed_total, staff_id, b.block_code FROM (SELECT a.staff_id, b.step, b.block_code, b.panchayat_code FROM employees_unique a INNER JOIN employee_regions b ON a.staff_id=b.staff_id WHERE b.block_code IN (SELECT region_code FROM user_regions WHERE user_id=' +
            USER_ID +
            ') ) a RIGHT JOIN (SELECT * FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id=' +
            USER_ID +
            ") ) b ON (a.panchayat_code = b.panchayat_code AND a.step = SUBSTR(b.step,4,2)) OR (a.panchayat_code = '' and a.block_code=b.block_code AND a.step = SUBSTR(b.step,4,2)) GROUP BY a.staff_id, b.block_code ) d ON a.staff_id=d.staff_id OR (a.staff_id IS NULL AND d.staff_id IS NULL AND a.block_code=d.block_code) LEFT JOIN (SELECT count(*) AS delayed_no_t5, staff_id, b.block_code FROM (SELECT a.staff_id, b.step, b.block_code, b.panchayat_code FROM employees_unique a INNER JOIN employee_regions b ON a.staff_id=b.staff_id WHERE b.block_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
            USER_ID +
            ') ) a RIGHT JOIN (SELECT * FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id=' +
            USER_ID +
            ") AND step<>'t5') b ON (a.panchayat_code = b.panchayat_code AND a.step = SUBSTR(b.step,4,2)) OR (a.panchayat_code = '' and a.block_code=b.block_code AND a.step = SUBSTR(b.step,4,2)) GROUP BY a.staff_id, b.block_code ) e ON a.staff_id=e.staff_id OR (a.staff_id IS NULL AND e.staff_id IS NULL AND a.block_code=d.block_code) WHERE a.staff_id IS NOT NULL OR (a.staff_id IS NULL AND (c.current_total>0 OR d.delayed_total>0));" +
            "SELECT DISTINCT state_code FROM blocks WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
            USER_ID +
            "');"
        );
    } else if (ROLE === 'district') {
        return (
            "SELECT a.district_code, a.district_name, a.block_code, a.block_name, IFNULL(j.firstname,'') AS firstname, IFNULL(j.lastname,'') AS lastname, IFNULL(j.uid,'') AS uid, IFNULL(j.designation,'No Data') AS designation, j.designation_id, IFNULL(j.mobile,'No Mobile Data') AS mobile, b.days_to_payment, IFNULL(c.current_total,0) AS current_total, IFNULL(d.delayed_total,0) AS delayed_total, IFNULL(k.delayed_no_t5,0) AS delayed_no_t5, IFNULL(e.t2_total,0) AS t2_total, IFNULL(e.t2_avg,'') AS t2_avg, IFNULL(f.t5_total,0) AS t5_total, IFNULL(f.t5_avg,'') AS t5_avg, IFNULL(g.t6_total,0) AS t6_total, IFNULL(g.t6_avg,'') AS t6_avg, IFNULL(h.t7_total,0) AS t7_total, IFNULL(h.t7_avg,'') AS t7_avg, IFNULL(i.t8_total,0) AS t8_total, IFNULL(i.t8_avg,'') AS t8_avg FROM (SELECT district_code, district_name, block_code, block_name FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
            USER_ID +
            ") ) a LEFT JOIN (SELECT block_code, IFNULL(ROUND(SUM(mrc_processed_mean * total_transactions) / SUM(total_transactions),1),'No Data') AS days_to_payment FROM block_delays_duration WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
            USER_ID +
            ") AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' and date>=DATE_SUB(now(), INTERVAL 3 MONTH) GROUP BY block_code ) b ON a.block_code=b.block_code LEFT JOIN (SELECT block_code, count(*) AS current_total FROM current_musters WHERE block_code IN (SELECT block_code FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
            USER_ID +
            ')) GROUP BY block_code ) c ON a.block_code=c.block_code LEFT JOIN (SELECT block_code, count(*) AS delayed_total FROM delayed_musters WHERE block_code IN (SELECT block_code FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=' +
            USER_ID +
            ")) GROUP BY block_code ) d ON a.block_code=d.block_code LEFT JOIN (SELECT block_code, count(*) AS delayed_no_t5 FROM delayed_musters WHERE step<>'ds_t5' AND block_code IN (SELECT block_code FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
            USER_ID +
            ")) GROUP BY block_code ) k ON a.block_code=k.block_code LEFT JOIN (SELECT block_code, count(*) AS t2_total, ROUND(AVG(datediff(CURDATE(), end_date) - 2),1) AS t2_avg FROM delayed_musters WHERE step='ds_t2'AND block_code IN (SELECT block_code FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
            USER_ID +
            ")) GROUP BY block_code ) e ON a.block_code=e.block_code LEFT JOIN (SELECT block_code, count(*) AS t5_total, ROUND(AVG(datediff(CURDATE(), end_date) - 5),1) AS t5_avg FROM delayed_musters WHERE step='ds_t5'AND block_code IN (SELECT block_code FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
            USER_ID +
            ")) GROUP BY block_code ) f ON a.block_code=f.block_code LEFT JOIN (SELECT block_code, count(*) AS t6_total, ROUND(AVG(datediff(CURDATE(), end_date) - 6),1) AS t6_avg FROM delayed_musters WHERE step='ds_t6'AND block_code IN (SELECT block_code FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
            USER_ID +
            ")) GROUP BY block_code ) g ON a.block_code=g.block_code LEFT JOIN (SELECT block_code, count(*) AS t7_total, ROUND(AVG(datediff(CURDATE(), end_date) - 7),1) AS t7_avg FROM delayed_musters WHERE step='ds_t7'AND block_code IN (SELECT block_code FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
            USER_ID +
            ")) GROUP BY block_code ) h ON a.block_code=h.block_code LEFT JOIN (SELECT block_code, count(*) AS t8_total, ROUND(AVG(datediff(CURDATE(), end_date) - 8),1) AS t8_avg FROM delayed_musters WHERE step='ds_t8'AND block_code IN (SELECT block_code FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
            USER_ID +
            ')) GROUP BY block_code ) i ON a.block_code=i.block_code LEFT JOIN (SELECT a.block_code, a.uid, a.firstname, a.lastname, a.designation, a.designation_id, a.mobile FROM block_officers a RIGHT JOIN (SELECT * FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=' +
            USER_ID +
            ') ) b ON a.block_code = b.block_code ) j ON a.block_code=j.block_code;'
        );
    } else if (ROLE === 'state') {
        return (
            "SELECT a.state_code, a.state_name, a.district_code, a.district_name, IFNULL(j.firstname,'') AS firstname, IFNULL(j.lastname,'') AS lastname, IFNULL(j.uid,'') AS uid, IFNULL(j.designation,'No Data') AS designation, j.designation_id, IFNULL(j.mobile,'No Mobile Data') AS mobile, b.days_to_payment, IFNULL(c.current_total,0) AS current_total, IFNULL(d.delayed_total,0) AS delayed_total, IFNULL(k.delayed_no_t5,0) AS delayed_no_t5, IFNULL(e.t2_total,0) AS t2_total, IFNULL(e.t2_avg,'') AS t2_avg, IFNULL(f.t5_total,0) AS t5_total, IFNULL(f.t5_avg,'') AS t5_avg, IFNULL(g.t6_total,0) AS t6_total, IFNULL(g.t6_avg,'') AS t6_avg, IFNULL(h.t7_total,0) AS t7_total, IFNULL(h.t7_avg,'') AS t7_avg, IFNULL(i.t8_total,0) AS t8_total, IFNULL(i.t8_avg,'') AS t8_avg FROM (SELECT state_code, state_name, district_code, district_name FROM districts WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") ) a LEFT JOIN (SELECT district_code, IFNULL(ROUND(SUM(mrc_processed_mean * total_transactions) / SUM(total_transactions),1),'No Data') AS days_to_payment FROM district_delays_duration WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' and date>=DATE_SUB(now(), INTERVAL 3 MONTH) GROUP BY district_code ) b ON a.district_code=b.district_code LEFT JOIN (SELECT b.district_code, count(*) AS current_total FROM current_musters a INNER JOIN (SELECT district_code, block_code FROM blocks WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") ) b ON a.block_code=b.block_code GROUP BY district_code ) c ON a.district_code=c.district_code LEFT JOIN (SELECT b.district_code, count(*) AS delayed_total FROM delayed_musters a INNER JOIN (SELECT district_code, block_code FROM blocks WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") ) b ON a.block_code=b.block_code GROUP BY district_code ) d ON a.district_code=d.district_code LEFT JOIN (SELECT b.district_code, count(*) AS delayed_no_t5 FROM (SELECT * FROM delayed_musters WHERE step<>'ds_t5') a INNER JOIN (SELECT district_code, block_code FROM blocks WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") ) b ON a.block_code=b.block_code GROUP BY district_code ) k ON a.district_code=k.district_code LEFT JOIN (SELECT b.district_code, count(*) AS t2_total, ROUND(AVG(datediff(CURDATE(), end_date) - 2),1) AS t2_avg FROM (SELECT * FROM delayed_musters WHERE step='ds_t2') a INNER JOIN (SELECT district_code, block_code FROM blocks WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") ) b ON a.block_code=b.block_code GROUP BY district_code ) e ON a.district_code=e.district_code LEFT JOIN (SELECT b.district_code, count(*) AS t5_total, ROUND(AVG(datediff(CURDATE(), end_date) - 5),1) AS t5_avg FROM (SELECT * FROM delayed_musters WHERE step='ds_t5') a INNER JOIN (SELECT district_code, block_code FROM blocks WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") ) b ON a.block_code=b.block_code GROUP BY district_code ) f ON a.district_code=f.district_code LEFT JOIN (SELECT b.district_code, count(*) AS t6_total, ROUND(AVG(datediff(CURDATE(), end_date) - 6),1) AS t6_avg FROM (SELECT * FROM delayed_musters WHERE step='ds_t6') a INNER JOIN (SELECT district_code, block_code FROM blocks WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") ) b ON a.block_code=b.block_code GROUP BY district_code ) g ON a.district_code=g.district_code LEFT JOIN (SELECT b.district_code, count(*) AS t7_total, ROUND(AVG(datediff(CURDATE(), end_date) - 7),1) AS t7_avg FROM (SELECT * FROM delayed_musters WHERE step='ds_t7') a INNER JOIN (SELECT district_code, block_code FROM blocks WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") ) b ON a.block_code=b.block_code GROUP BY district_code ) h ON a.district_code=h.district_code LEFT JOIN (SELECT b.district_code, count(*) AS t8_total, ROUND(AVG(datediff(CURDATE(), end_date) - 8),1) AS t8_avg FROM (SELECT * FROM delayed_musters WHERE step='ds_t8') a INNER JOIN (SELECT district_code, block_code FROM blocks WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") ) b ON a.block_code=b.block_code GROUP BY district_code ) i ON a.district_code=i.district_code LEFT JOIN (SELECT a.district_code, a.uid, a.firstname, a.lastname, a.designation, a.designation_id, a.mobile FROM district_officers a RIGHT JOIN (SELECT * FROM districts WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") ) b ON a.district_code = b.district_code ) j ON a.district_code=j.district_code;"
        );
    }
};

exports.performance = function(USER_ID, ROLE) {
    if (ROLE === 'block') {
        return (
            "SELECT a.state_code, a.state_name, b.tot_trn, b.year, b.month, b.mrc_mre, b.mre_wlg, b.wlg_wls, b.wls_fto, b.fto_sn1, b.sn1_sn2, b.sn2_prc FROM (SELECT DISTINCT state_code, state_name FROM blocks WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "')) a LEFT JOIN (SELECT state_code,SUM(total_transactions) tot_trn,YEAR(date) AS year, MONTH(date) AS month,ROUND(sum(mrc_mre_mean*total_transactions)/sum(total_transactions),0) mrc_mre,ROUND(sum(mre_wlg_mean*total_transactions)/sum(total_transactions),0) mre_wlg,ROUND(sum(wlg_wls_mean*total_transactions)/sum(total_transactions),0) wlg_wls,ROUND(sum(wls_fto_mean*total_transactions)/sum(total_transactions),0) wls_fto,ROUND(sum(fto_firstsign_mean*total_transactions)/sum(total_transactions),0) fto_sn1,ROUND(sum(firstsign_secondsign_mean*total_transactions)/sum(total_transactions),0) sn1_sn2,ROUND(sum(secondsign_processed_mean*total_transactions)/sum(total_transactions),0) sn2_prc FROM state_delays_duration a WHERE a.gender = 'both' AND a.bank_type = 'all' AND a.date_type = 'processed_date' AND a.total_transactions > 0 AND a.state_code IN (SELECT b.state_code FROM blocks b WHERE b.block_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
            USER_ID +
            "')) GROUP BY YEAR(date), MONTH(date)) b on a.state_code=b.state_code ORDER BY b.year, b.month;" +
            "SELECT a.district_code, a.district_name, b.tot_trn, b.year, b.month, b.mrc_mre, b.mre_wlg, b.wlg_wls, b.wls_fto, b.fto_sn1, b.sn1_sn2, b.sn2_prc from (SELECT DISTINCT district_code, district_name FROM blocks WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "')) a LEFT JOIN (SELECT district_code,SUM(total_transactions) tot_trn,YEAR(date) AS year, MONTH(date) AS month,ROUND(sum(mrc_mre_mean*total_transactions)/sum(total_transactions),0) mrc_mre,ROUND(sum(mre_wlg_mean*total_transactions)/sum(total_transactions),0) mre_wlg,ROUND(sum(wlg_wls_mean*total_transactions)/sum(total_transactions),0) wlg_wls,ROUND(sum(wls_fto_mean*total_transactions)/sum(total_transactions),0) wls_fto,ROUND(sum(fto_firstsign_mean*total_transactions)/sum(total_transactions),0) fto_sn1,ROUND(sum(firstsign_secondsign_mean*total_transactions)/sum(total_transactions),0) sn1_sn2,ROUND(sum(secondsign_processed_mean*total_transactions)/sum(total_transactions),0) sn2_prc FROM district_delays_duration a WHERE a.gender = 'both' AND a.bank_type = 'all' AND a.date_type = 'processed_date' AND a.total_transactions > 0 AND a.district_code IN (SELECT b.district_code FROM blocks b WHERE b.block_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
            USER_ID +
            "')) GROUP BY YEAR(date), MONTH(date)) b ON a.district_code=b.district_code ORDER BY b.year, b.month;" +
            "SELECT a.block_code, a.block_name, b.tot_trn, b.year, b.month, b.mrc_mre, b.mre_wlg, b.wlg_wls, b.wls_fto, b.fto_sn1, b.sn1_sn2, b.sn2_prc FROM (SELECT block_code, block_name FROM blocks WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "')) a LEFT JOIN (SELECT block_code,SUM(total_transactions) AS tot_trn,YEAR(date) AS year, MONTH(date) AS month,ROUND(sum(mrc_mre_mean*total_transactions)/sum(total_transactions),0) mrc_mre,ROUND(sum(mre_wlg_mean*total_transactions)/sum(total_transactions),0) mre_wlg,ROUND(sum(wlg_wls_mean*total_transactions)/sum(total_transactions),0) wlg_wls,ROUND(sum(wls_fto_mean*total_transactions)/sum(total_transactions),0) wls_fto,ROUND(sum(fto_firstsign_mean*total_transactions)/sum(total_transactions),0) fto_sn1,ROUND(sum(firstsign_secondsign_mean*total_transactions)/sum(total_transactions),0) sn1_sn2,ROUND(sum(secondsign_processed_mean*total_transactions)/sum(total_transactions),0) sn2_prc FROM block_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND block_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
            USER_ID +
            "') GROUP BY YEAR(date), MONTH(date), block_code) b ON a.block_code=b.block_code ORDER BY a.block_code, b.year, b.month;" +
            "SELECT a.block_code, a.block_name, a.panchayat_code, a.panchayat_name, b.tot_trn, b.year, b.month, b.mrc_mre, b.mre_wlg, b.wlg_wls, b.wls_fto, b.fto_sn1, b.sn1_sn2, b.sn2_prc FROM (SELECT block_code, block_name, panchayat_code, panchayat_name FROM panchayats WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "')) a LEFT JOIN (SELECT panchayat_code, SUM(total_transactions) AS tot_trn,YEAR(date) AS year, MONTH(date) AS month,ROUND(sum(mrc_mre_mean*total_transactions)/sum(total_transactions),0) mrc_mre,ROUND(sum(mre_wlg_mean*total_transactions)/sum(total_transactions),0) mre_wlg,ROUND(sum(wlg_wls_mean*total_transactions)/sum(total_transactions),0) wlg_wls,ROUND(sum(wls_fto_mean*total_transactions)/sum(total_transactions),0) wls_fto,ROUND(sum(fto_firstsign_mean*total_transactions)/sum(total_transactions),0) fto_sn1,ROUND(sum(firstsign_secondsign_mean*total_transactions)/sum(total_transactions),0) sn1_sn2,ROUND(sum(secondsign_processed_mean*total_transactions)/sum(total_transactions),0) sn2_prc FROM panchayat_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND panchayat_code <> '0000000000' AND block_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
            USER_ID +
            "') GROUP BY YEAR(date), MONTH(date), panchayat_code) b ON a.panchayat_code=b.panchayat_code ORDER BY a.block_code, a.panchayat_code, b.year, b.month;"
        );
    } else if (ROLE === 'district') {
        return (
            "SELECT a.state_code, a.state_name, b.tot_trn, b.year, b.month, b.mrc_mre, b.mre_wlg, b.wlg_wls, b.wls_fto, b.fto_sn1, b.sn1_sn2, b.sn2_prc FROM (SELECT DISTINCT state_code, state_name FROM districts WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "')) a LEFT JOIN (SELECT state_code,SUM(total_transactions) tot_trn,YEAR(date) AS year, MONTH(date) AS month,ROUND(sum(mrc_mre_mean*total_transactions)/sum(total_transactions),0) mrc_mre,ROUND(sum(mre_wlg_mean*total_transactions)/sum(total_transactions),0) mre_wlg,ROUND(sum(wlg_wls_mean*total_transactions)/sum(total_transactions),0) wlg_wls,ROUND(sum(wls_fto_mean*total_transactions)/sum(total_transactions),0) wls_fto,ROUND(sum(fto_firstsign_mean*total_transactions)/sum(total_transactions),0) fto_sn1,ROUND(sum(firstsign_secondsign_mean*total_transactions)/sum(total_transactions),0) sn1_sn2,ROUND(sum(secondsign_processed_mean*total_transactions)/sum(total_transactions),0) sn2_prc FROM state_delays_duration a WHERE a.gender = 'both' AND a.bank_type = 'all' AND a.date_type = 'processed_date' AND a.total_transactions > 0 AND a.state_code IN (SELECT b.state_code FROM districts b WHERE b.district_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
            USER_ID +
            "')) GROUP BY YEAR(date), MONTH(date)) b ON a.state_code=b.state_code ORDER BY b.year, b.month;" +
            "SELECT a.district_code, a.district_name, b.tot_trn, b.year, b.month, b.mrc_mre, b.mre_wlg, b.wlg_wls, b.wls_fto, b.fto_sn1, b.sn1_sn2, b.sn2_prc from (SELECT DISTINCT district_code, district_name FROM districts WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "')) a LEFT JOIN (SELECT district_code,SUM(total_transactions) AS tot_trn,YEAR(date) AS year, MONTH(date) AS month,ROUND(sum(mrc_mre_mean*total_transactions)/sum(total_transactions),0) mrc_mre,ROUND(sum(mre_wlg_mean*total_transactions)/sum(total_transactions),0) mre_wlg,ROUND(sum(wlg_wls_mean*total_transactions)/sum(total_transactions),0) wlg_wls,ROUND(sum(wls_fto_mean*total_transactions)/sum(total_transactions),0) wls_fto,ROUND(sum(fto_firstsign_mean*total_transactions)/sum(total_transactions),0) fto_sn1,ROUND(sum(firstsign_secondsign_mean*total_transactions)/sum(total_transactions),0) sn1_sn2,ROUND(sum(secondsign_processed_mean*total_transactions)/sum(total_transactions),0) sn2_prc FROM district_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND district_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
            USER_ID +
            "') GROUP BY YEAR(date), MONTH(date), district_code) b ON a.district_code=b.district_code ORDER BY a.district_code, b.year, b.month;" +
            "SELECT a.district_code, a.district_name, a.block_code, a.block_name, b.tot_trn, b.year, b.month, b.mrc_mre, b.mre_wlg, b.wlg_wls, b.wls_fto, b.fto_sn1, b.sn1_sn2, b.sn2_prc FROM (SELECT district_code, district_name, block_code, block_name FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "')) a LEFT JOIN (SELECT block_code, SUM(total_transactions) AS tot_trn,YEAR(date) AS year, MONTH(date) AS month,ROUND(sum(mrc_mre_mean*total_transactions)/sum(total_transactions),0) mrc_mre,ROUND(sum(mre_wlg_mean*total_transactions)/sum(total_transactions),0) mre_wlg,ROUND(sum(wlg_wls_mean*total_transactions)/sum(total_transactions),0) wlg_wls,ROUND(sum(wls_fto_mean*total_transactions)/sum(total_transactions),0) wls_fto,ROUND(sum(fto_firstsign_mean*total_transactions)/sum(total_transactions),0) fto_sn1,ROUND(sum(firstsign_secondsign_mean*total_transactions)/sum(total_transactions),0) sn1_sn2,ROUND(sum(secondsign_processed_mean*total_transactions)/sum(total_transactions),0) sn2_prc FROM block_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND district_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
            USER_ID +
            "') GROUP BY YEAR(date), MONTH(date), block_code) b ON a.block_code=b.block_code ORDER BY a.district_code, a.block_code, b.year, b.month;"
        );
    } else if (ROLE === 'state') {
        return (
            "SELECT a.state_code, a.state_name, b.tot_trn, b.year, b.month, b.mrc_mre, b.mre_wlg, b.wlg_wls, b.wls_fto, b.fto_sn1, b.sn1_sn2, b.sn2_prc FROM (SELECT DISTINCT state_code, state_name FROM states WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "') ) a LEFT JOIN (SELECT state_code,SUM(total_transactions) AS tot_trn,YEAR(date) AS year, MONTH(date) AS month,ROUND(sum(mrc_mre_mean*total_transactions)/sum(total_transactions),0) mrc_mre,ROUND(sum(mre_wlg_mean*total_transactions)/sum(total_transactions),0) mre_wlg,ROUND(sum(wlg_wls_mean*total_transactions)/sum(total_transactions),0) wlg_wls,ROUND(sum(wls_fto_mean*total_transactions)/sum(total_transactions),0) wls_fto,ROUND(sum(fto_firstsign_mean*total_transactions)/sum(total_transactions),0) fto_sn1,ROUND(sum(firstsign_secondsign_mean*total_transactions)/sum(total_transactions),0) sn1_sn2,ROUND(sum(secondsign_processed_mean*total_transactions)/sum(total_transactions),0) sn2_prc FROM state_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND state_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "') GROUP BY YEAR(date), MONTH(date), state_code ) b ON a.state_code=b.state_code ORDER BY a.state_code, b.year, b.month;" + "SELECT a.state_code, a.state_name, a.district_code, a.district_name, b.tot_trn, b.year, b.month, b.mrc_mre, b.mre_wlg, b.wlg_wls, b.wls_fto, b.fto_sn1, b.sn1_sn2, b.sn2_prc FROM (SELECT state_code, state_name, district_code, district_name FROM districts WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "') ) a LEFT JOIN (SELECT district_code, SUM(total_transactions) AS tot_trn,YEAR(date) AS year, MONTH(date) AS month,ROUND(sum(mrc_mre_mean*total_transactions)/sum(total_transactions),0) mrc_mre,ROUND(sum(mre_wlg_mean*total_transactions)/sum(total_transactions),0) mre_wlg,ROUND(sum(wlg_wls_mean*total_transactions)/sum(total_transactions),0) wlg_wls,ROUND(sum(wls_fto_mean*total_transactions)/sum(total_transactions),0) wls_fto,ROUND(sum(fto_firstsign_mean*total_transactions)/sum(total_transactions),0) fto_sn1,ROUND(sum(firstsign_secondsign_mean*total_transactions)/sum(total_transactions),0) sn1_sn2,ROUND(sum(secondsign_processed_mean*total_transactions)/sum(total_transactions),0) sn2_prc FROM district_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND state_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "') GROUP BY YEAR(date), MONTH(date), district_code ) b ON a.district_code=b.district_code ORDER BY a.state_code, a.district_code, b.year, b.month;"
        );
    }
};

exports.contact = function(USER_ID,ROLE) {
    return "SELECT * FROM contact;" +
    "SELECT a.region_code, a.region_name, IFNULL(c.designation,'NO DESIGNATION') AS designation FROM (select * from user_regions WHERE user_id="+USER_ID+") a inner join "+ROLE+"s b ON a.region_code=b."+ROLE+"_code LEFT join officer_configuration c on b.state_code=c.state_code and c.role='"+ROLE+"' and a.designation_id=c.designation_id;";
};

exports.paydroid = function(USER_ID, ROLE, VERSION) {
    if (VERSION === 1) {
        return (
            "SELECT a.current_total, b.delayed_total, c.days_to_payment, c.total_transactions FROM (SELECT count(*) AS current_total, 1 AS merge FROM current_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
            USER_ID +
            "')) a LEFT JOIN (SELECT count(*) AS delayed_total, 1 AS merge FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
            USER_ID +
            "')) b ON a.merge = b.merge LEFT JOIN (SELECT IFNULL(ROUND(SUM(mrc_processed_mean * total_transactions) / SUM(total_transactions),1),'No Data') AS days_to_payment, IFNULL(SUM(total_transactions),0) AS total_transactions, 1 AS merge FROM block_delays_duration WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
            USER_ID +
            "') AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' and date>=DATE_SUB(now(), INTERVAL 3 MONTH)) c ON b.merge = c.merge;" +
            "SELECT a.staff_id, IFNULL(a.name,'Unmapped') AS name, a.task_assign, IFNULL(a.mobile_no,'') AS mobile_no, a.block_code, a.block_name, IFNULL(c.current_total,0) AS current_total, IFNULL(d.delayed_total,0) AS delayed_total, b.msr_no, b.work_name, b.work_code, b.panchayat_name, b.end_date, b.days_pending, b.step, b.type FROM (SELECT a.staff_id, a.name, b.designation as task_assign, a.mobile_no, b.block_code, c.block_name FROM employees_unique a INNER JOIN employee_regions b ON a.staff_id=b.staff_id AND block_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
            USER_ID +
            ') INNER JOIN blocks c ON b.block_code=c.block_code UNION SELECT a.staff_id, a.name, a.task_assign, a.mobile_no, b.block_code, b.block_name FROM (SELECT NULL as staff_id, NULL as name, NULL as task_assign, NULL as mobile_no, 1 as merge ) a RIGHT JOIN (SELECT region_code as block_code, region_name as block_name, 1 as merge FROM user_regions WHERE user_id=' +
            USER_ID +
            ") b ON a.merge = b.merge ) a LEFT JOIN (SELECT a.staff_id, b.block_code, b.msr_no, b.work_name, b.work_code, b.panchayat_name, DATE_FORMAT(b.end_date,'%d-%m-%Y') as end_date, NULL as days_pending, NULL AS step, 'current_musters' AS type FROM (SELECT a.staff_id, b.panchayat_code FROM employees_unique a INNER JOIN employee_regions b ON a.staff_id=b.staff_id AND b.block_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
            USER_ID +
            ") AND b.step IN ('t2','t5') ) a RIGHT JOIN (SELECT * FROM current_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
            USER_ID +
            ") ) b ON a.panchayat_code = b.panchayat_code UNION SELECT a.staff_id, b.block_code, b.msr_no, b.work_name, b.work_code, b.panchayat_name, DATE_FORMAT(b.end_date,'%d-%m-%Y') as end_date, (datediff(CURDATE(), b.end_date) - SUBSTR(b.step,5,1)) AS days_pending, b.step, 'delayed_musters' AS type FROM (SELECT a.staff_id, b.step, b.block_code, b.panchayat_code FROM employees_unique a INNER JOIN employee_regions b ON a.staff_id=b.staff_id WHERE b.block_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
            USER_ID +
            ') ) a RIGHT JOIN (SELECT * FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id=' +
            USER_ID +
            ") ) b ON (a.panchayat_code = b.panchayat_code AND a.step = SUBSTR(b.step,4,2)) OR (a.panchayat_code = '' and a.block_code=b.block_code AND a.step = SUBSTR(b.step,4,2)) ) b ON a.staff_id=b.staff_id OR (a.staff_id IS NULL AND b.staff_id IS NULL AND a.block_code=b.block_code) LEFT JOIN (SELECT count(*) AS current_total, a.staff_id, b.block_code FROM (SELECT a.staff_id, b.panchayat_code FROM employees_unique a INNER JOIN employee_regions b ON a.staff_id=b.staff_id AND b.block_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
            USER_ID +
            ") AND b.step IN ('t2','t5') ) a RIGHT JOIN (SELECT * FROM current_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
            USER_ID +
            ') ) b ON a.panchayat_code = b.panchayat_code GROUP BY staff_id, b.block_code ) c ON a.staff_id=c.staff_id OR (a.staff_id IS NULL AND c.staff_id IS NULL AND a.block_code=c.block_code) LEFT JOIN (SELECT count(*) AS delayed_total, staff_id, b.block_code FROM (SELECT a.staff_id, b.step, b.block_code, b.panchayat_code FROM employees_unique a INNER JOIN employee_regions b ON a.staff_id=b.staff_id WHERE b.block_code IN (SELECT region_code FROM user_regions WHERE user_id=' +
            USER_ID +
            ') ) a RIGHT JOIN (SELECT * FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id=' +
            USER_ID +
            ") ) b ON (a.panchayat_code = b.panchayat_code AND a.step = SUBSTR(b.step,4,2)) OR (a.panchayat_code = '' and a.block_code=b.block_code AND a.step = SUBSTR(b.step,4,2)) GROUP BY a.staff_id, b.block_code ) d ON a.staff_id=d.staff_id OR (a.staff_id IS NULL AND d.staff_id IS NULL AND a.block_code=d.block_code) WHERE a.staff_id IS NOT NULL OR (a.staff_id IS NULL AND (c.current_total>0 OR d.delayed_total>0));" +
            "SELECT block_code, block_name,total_transactions tot_trn,date,ROUND(mrc_mre_mean,1) mrc_mre,ROUND(mre_wlg_mean,1) mre_wlg,ROUND(wlg_wls_mean,1) wlg_wls,ROUND(wls_fto_mean,1) wls_fto,ROUND(fto_firstsign_mean,1) fto_sn1,ROUND(firstsign_secondsign_mean,1) sn1_sn2,ROUND(secondsign_processed_mean,1) sn2_prc FROM block_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND block_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
            USER_ID +
            "') ORDER BY block_code, date;" +
            "SELECT block_code, panchayat_code, panchayat_name,total_transactions tot_trn,date,ROUND(mrc_mre_mean,1) mrc_mre,ROUND(mre_wlg_mean,1) mre_wlg,ROUND(wlg_wls_mean,1) wlg_wls,ROUND(wls_fto_mean,1) wls_fto,ROUND(fto_firstsign_mean,1) fto_sn1,ROUND(firstsign_secondsign_mean,1) sn1_sn2,ROUND(secondsign_processed_mean,1) sn2_prc FROM panchayat_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND panchayat_code <> '0000000000' AND block_code  IN (SELECT region_code FROM user_regions WHERE user_id='" +
            USER_ID +
            "') ORDER BY panchayat_code, date;" +
            "SELECT * FROM notifications WHERE user_id = '" +
            USER_ID +
            "';" +
            "SELECT state_code FROM blocks WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
            USER_ID +
            "') GROUP BY state_code;" +
            "SELECT * FROM contact;" +
            "SELECT a.region_code, a.region_name, IFNULL(c.designation,'NO DESIGNATION') AS designation FROM (select * from user_regions WHERE user_id="+USER_ID+") a inner join blocks b ON a.region_code=b."+ROLE+"_code LEFT join officer_configuration c on b.state_code=c.state_code and c.role='"+ROLE+"' and a.designation_id=c.designation_id;"

        );
    } else if (VERSION === 2) {
        if (ROLE === 'block') {
            return (
                "SELECT a.region_code as block_code, a.region_name as block_name, IFNULL(b.current_total,0) AS current_total, IFNULL(c.delayed_total,0) AS delayed_total, IFNULL(d.delayed_no_t5,0) AS delayed_no_t5, IFNULL(e.days_to_payment,'No Data') AS days_to_payment FROM (SELECT region_code, region_name FROM user_regions WHERE user_id='" +
                USER_ID +
                "') a LEFT JOIN (SELECT count(*) AS current_total, block_code AS region_code FROM current_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
                USER_ID +
                "') GROUP BY region_code) b ON a.region_code = b.region_code LEFT JOIN (SELECT count(*) AS delayed_total, block_code AS region_code FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
                USER_ID +
                "') GROUP BY region_code) c ON a.region_code = c.region_code LEFT JOIN (SELECT count(*) AS delayed_no_t5, block_code AS region_code FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
                USER_ID +
                "') AND step<>'ds_t5' GROUP BY region_code) d ON a.region_code = d.region_code LEFT JOIN (SELECT ROUND(SUM(mrc_processed_mean * total_transactions) / SUM(total_transactions),1) AS days_to_payment, block_code AS region_code FROM block_delays_duration WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
                USER_ID +
                "') AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' and date>=DATE_SUB(now(), INTERVAL 3 MONTH) GROUP BY region_code) e ON a.region_code = e.region_code;" +
                "SELECT a.staff_id, IFNULL(a.name,'Unmapped') AS name, a.task_assign, IFNULL(a.mobile_no,'') AS mobile_no, a.block_code, a.block_name, IFNULL(c.current_total,0) AS current_total, IFNULL(d.delayed_total,0) AS delayed_total, IFNULL(e.delayed_no_t5,0) AS delayed_no_t5, b.msr_no, b.work_name, b.work_code, b.panchayat_name, b.end_date, b.days_pending, b.step, b.type FROM (SELECT a.staff_id, a.name, b.designation as task_assign, a.mobile_no, b.block_code, c.block_name FROM employees_unique a INNER JOIN employee_regions b ON a.staff_id=b.staff_id AND block_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
                USER_ID +
                ") INNER JOIN blocks c ON b.block_code=c.block_code UNION SELECT a.staff_id, a.name, a.task_assign, a.mobile_no, b.block_code, b.block_name FROM (SELECT NULL as staff_id, NULL as name, NULL as task_assign, NULL as mobile_no, 1 as merge ) a RIGHT JOIN (SELECT region_code as block_code, region_name as block_name, 1 as merge FROM user_regions WHERE user_id=" +
                USER_ID +
                ") b ON a.merge = b.merge ) a LEFT JOIN (SELECT a.staff_id, b.block_code, b.msr_no, b.work_name, b.work_code, b.panchayat_name, DATE_FORMAT(b.end_date,'%d-%m-%Y') as end_date, NULL as days_pending, NULL AS step, 'current_musters' AS type FROM (SELECT a.staff_id, b.panchayat_code FROM employees_unique a INNER JOIN employee_regions b ON a.staff_id=b.staff_id AND b.block_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
                USER_ID +
                ") AND b.step IN ('t2','t5') ) a RIGHT JOIN (SELECT * FROM current_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
                USER_ID +
                ") ) b ON a.panchayat_code = b.panchayat_code UNION SELECT a.staff_id, b.block_code, b.msr_no, b.work_name, b.work_code, b.panchayat_name, DATE_FORMAT(b.end_date,'%d-%m-%Y') as end_date, (datediff(CURDATE(), b.end_date) - SUBSTR(b.step,5,1)) AS days_pending, b.step, 'delayed_musters' AS type FROM (SELECT a.staff_id, b.step, b.block_code, b.panchayat_code FROM employees_unique a INNER JOIN employee_regions b ON a.staff_id=b.staff_id WHERE b.block_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
                USER_ID +
                ") ) a RIGHT JOIN (SELECT * FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
                USER_ID +
                ") ) b ON (a.panchayat_code = b.panchayat_code AND a.step = SUBSTR(b.step,4,2)) OR (a.panchayat_code = '' and a.block_code=b.block_code AND a.step = SUBSTR(b.step,4,2)) ) b ON a.staff_id=b.staff_id OR (a.staff_id IS NULL AND b.staff_id IS NULL AND a.block_code=b.block_code) LEFT JOIN (SELECT count(*) AS current_total, a.staff_id, b.block_code FROM (SELECT a.staff_id, b.panchayat_code FROM employees_unique a INNER JOIN employee_regions b ON a.staff_id=b.staff_id AND b.block_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
                USER_ID +
                ") AND b.step IN ('t2','t5') ) a RIGHT JOIN (SELECT * FROM current_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
                USER_ID +
                ") ) b ON a.panchayat_code = b.panchayat_code GROUP BY staff_id, b.block_code ) c ON a.staff_id=c.staff_id OR (a.staff_id IS NULL AND c.staff_id IS NULL AND a.block_code=c.block_code) LEFT JOIN (SELECT count(*) AS delayed_total, staff_id, b.block_code FROM (SELECT a.staff_id, b.step, b.block_code, b.panchayat_code FROM employees_unique a INNER JOIN employee_regions b ON a.staff_id=b.staff_id WHERE b.block_code IN (SELECT region_code FROM user_regions WHERE user_id=" + USER_ID +") ) a RIGHT JOIN (SELECT * FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id=" + 
                USER_ID + 
                ") ) b ON (a.panchayat_code = b.panchayat_code AND a.step = SUBSTR(b.step,4,2) ) OR (a.panchayat_code = '' and a.block_code=b.block_code AND a.step = SUBSTR(b.step,4,2) ) GROUP BY a.staff_id, b.block_code ) d ON a.staff_id=d.staff_id OR (a.staff_id IS NULL AND d.staff_id IS NULL AND a.block_code=d.block_code ) LEFT JOIN (SELECT count(*) AS delayed_no_t5, staff_id, b.block_code FROM (SELECT a.staff_id, b.step, b.block_code, b.panchayat_code FROM employees_unique a INNER JOIN employee_regions b ON a.staff_id=b.staff_id WHERE b.block_code IN (SELECT region_code FROM user_regions WHERE user_id=" + 
                USER_ID +
                ") ) a RIGHT JOIN (SELECT * FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id=" + 
                USER_ID + ") AND step <> 'ds_t5') b ON (a.panchayat_code = b.panchayat_code AND a.step = SUBSTR(b.step,4,2) ) OR (a.panchayat_code = '' and a.block_code=b.block_code AND a.step = SUBSTR(b.step,4,2) ) GROUP BY a.staff_id, b.block_code ) e ON a.staff_id=e.staff_id OR (a.staff_id IS NULL AND e.staff_id IS NULL AND a.block_code=d.block_code ) WHERE a.staff_id IS NOT NULL OR (a.staff_id IS NULL AND (c.current_total>0 OR d.delayed_total>0) ) ;" +
                "SELECT a.block_code, a.block_name, b.tot_trn, b.year, b.month, b.mrc_mre, b.mre_wlg, b.wlg_wls, b.wls_fto, b.fto_sn1, b.sn1_sn2, b.sn2_prc, b.mrc_prc from (SELECT block_code, block_name FROM blocks WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "')) a LEFT JOIN (SELECT block_code, SUM(total_transactions) AS tot_trn,YEAR(date) AS year, MONTH(date) AS month,ROUND(sum(mrc_mre_mean*total_transactions)/sum(total_transactions),1) mrc_mre,ROUND(sum(mre_wlg_mean*total_transactions)/sum(total_transactions),1) mre_wlg,ROUND(sum(wlg_wls_mean*total_transactions)/sum(total_transactions),1) wlg_wls,ROUND(sum(wls_fto_mean*total_transactions)/sum(total_transactions),1) wls_fto,ROUND(sum(fto_firstsign_mean*total_transactions)/sum(total_transactions),1) fto_sn1,ROUND(sum(firstsign_secondsign_mean*total_transactions)/sum(total_transactions),1) sn1_sn2,ROUND(sum(secondsign_processed_mean*total_transactions)/sum(total_transactions),1) sn2_prc, ROUND(sum(mrc_processed_mean*total_transactions)/sum(total_transactions),1) mrc_prc FROM block_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND block_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
                USER_ID +
                "') GROUP BY YEAR(date), MONTH(date), block_code) b ON a.block_code=b.block_code ORDER BY a.block_code, b.year, b.month;" +
                "SELECT a.block_code, a.panchayat_code, a.panchayat_name, b.tot_trn, b.year, b.month, b.mrc_mre, b.mre_wlg, b.wlg_wls, b.wls_fto, b.fto_sn1, b.sn1_sn2, b.sn2_prc, b.mrc_prc from (SELECT block_code, panchayat_code, panchayat_name FROM panchayats WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "')) a LEFT JOIN (SELECT panchayat_code, SUM(total_transactions) AS tot_trn,YEAR(date) AS year, MONTH(date) AS month,ROUND(sum(mrc_mre_mean*total_transactions)/sum(total_transactions),1) mrc_mre,ROUND(sum(mre_wlg_mean*total_transactions)/sum(total_transactions),1) mre_wlg,ROUND(sum(wlg_wls_mean*total_transactions)/sum(total_transactions),1) wlg_wls,ROUND(sum(wls_fto_mean*total_transactions)/sum(total_transactions),1) wls_fto,ROUND(sum(fto_firstsign_mean*total_transactions)/sum(total_transactions),1) fto_sn1,ROUND(sum(firstsign_secondsign_mean*total_transactions)/sum(total_transactions),1) sn1_sn2,ROUND(sum(secondsign_processed_mean*total_transactions)/sum(total_transactions),1) sn2_prc, ROUND(sum(mrc_processed_mean*total_transactions)/sum(total_transactions),1) mrc_prc FROM panchayat_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND panchayat_code <> '0000000000' AND block_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
                USER_ID +
                "') GROUP BY YEAR(date), MONTH(date), panchayat_code) b ON a.panchayat_code = b.panchayat_code ORDER by a.block_code, a.panchayat_code, b.year, b.month;" +
                "SELECT state_code FROM blocks WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
                USER_ID +
                "') GROUP BY state_code;" +
                "SELECT * FROM contact;" +
                "SELECT a.region_code, a.region_name, IFNULL(c.designation,'NO DESIGNATION') AS designation FROM (select * from user_regions WHERE user_id="+USER_ID+") a inner join blocks b ON a.region_code=b."+ROLE+"_code LEFT join officer_configuration c on b.state_code=c.state_code and c.role='"+ROLE+"' and a.designation_id=c.designation_id;" +
                'SELECT * FROM paydroid_version;' +
                "SELECT * FROM timestamps;"
            );
        } else if (ROLE == 'district') {
            return (
                "SELECT a.region_code as district_code, a.region_name as district_name, IFNULL(b.current_total,0) AS current_total, IFNULL(c.delayed_total,0) AS delayed_total, IFNULL(d.delayed_no_t5,0) AS delayed_no_t5, IFNULL(e.days_to_payment,'No Data') AS days_to_payment FROM (SELECT region_code, region_name FROM user_regions WHERE user_id='" +
                USER_ID +
                "') a LEFT JOIN (SELECT count(*) AS current_total, b.district_code AS region_code FROM current_musters a INNER JOIN (SELECT district_code, block_code from blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
                USER_ID +
                ')) b ON a.block_code = b.block_code GROUP BY region_code ) b ON a.region_code = b.region_code LEFT JOIN (SELECT count(*) AS delayed_total, b.district_code AS region_code FROM delayed_musters a INNER JOIN (SELECT district_code, block_code from blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=' +
                USER_ID +
                ")) b ON a.block_code = b.block_code GROUP BY region_code ) c ON a.region_code = c.region_code LEFT JOIN (SELECT count(*) AS delayed_no_t5, b.district_code AS region_code FROM (select * from delayed_musters where step<>'ds_t5') a INNER JOIN (SELECT district_code, block_code from blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
                USER_ID +
                ")) b ON a.block_code = b.block_code GROUP BY region_code ) d ON a.region_code = d.region_code LEFT JOIN (SELECT ROUND(SUM(mrc_processed_mean * total_transactions) / SUM(total_transactions),1) AS days_to_payment, district_code AS region_code FROM district_delays_duration WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
                USER_ID +
                "') AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' and date>=DATE_SUB(now(), INTERVAL 3 MONTH) GROUP BY region_code) e ON a.region_code = e.region_code;" +
                "SELECT a.district_code, a.district_name, a.block_code, a.block_name, IFNULL(j.firstname,'') AS firstname, IFNULL(j.lastname,'') AS lastname, IFNULL(j.uid,'') AS uid, IFNULL(j.designation,'No Data') AS designation, j.designation_id, IFNULL(j.mobile,'No Mobile Data') AS mobile, b.days_to_payment, IFNULL(c.current_total,0) AS current_total, IFNULL(d.delayed_total,0) AS delayed_total, IFNULL(k.delayed_no_t5,0) AS delayed_no_t5, IFNULL(e.t2_total,0) AS t2_total, IFNULL(e.t2_avg,'') AS t2_avg, IFNULL(f.t5_total,0) AS t5_total, IFNULL(f.t5_avg,'') AS t5_avg, IFNULL(g.t6_total,0) AS t6_total, IFNULL(g.t6_avg,'') AS t6_avg, IFNULL(h.t7_total,0) AS t7_total, IFNULL(h.t7_avg,'') AS t7_avg, IFNULL(i.t8_total,0) AS t8_total, IFNULL(i.t8_avg,'') AS t8_avg FROM (SELECT district_code, district_name, block_code, block_name FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
                USER_ID +
                ") ) a LEFT JOIN (SELECT block_code, IFNULL(ROUND(SUM(mrc_processed_mean * total_transactions) / SUM(total_transactions),1),'No Data') AS days_to_payment FROM block_delays_duration WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
                USER_ID +
                ") AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' and date>=DATE_SUB(now(), INTERVAL 3 MONTH) GROUP BY block_code ) b ON a.block_code=b.block_code LEFT JOIN (SELECT block_code, count(*) AS current_total FROM current_musters WHERE block_code IN (SELECT block_code FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
                USER_ID +
                ')) GROUP BY block_code ) c ON a.block_code=c.block_code LEFT JOIN (SELECT block_code, count(*) AS delayed_total FROM delayed_musters WHERE block_code IN (SELECT block_code FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=' +
                USER_ID +
                ")) GROUP BY block_code ) d ON a.block_code=d.block_code LEFT JOIN (SELECT block_code, count(*) AS delayed_no_t5 FROM delayed_musters WHERE step <> 'ds_t5' AND block_code IN (SELECT block_code FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
                USER_ID +
                ")) GROUP BY block_code ) k ON a.block_code=k.block_code LEFT JOIN (SELECT block_code, count(*) AS t2_total, ROUND(AVG(datediff(CURDATE(), end_date) - 2),1) AS t2_avg FROM delayed_musters WHERE step='ds_t2'AND block_code IN (SELECT block_code FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
                USER_ID +
                ")) GROUP BY block_code ) e ON a.block_code=e.block_code LEFT JOIN (SELECT block_code, count(*) AS t5_total, ROUND(AVG(datediff(CURDATE(), end_date) - 5),1) AS t5_avg FROM delayed_musters WHERE step='ds_t5'AND block_code IN (SELECT block_code FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
                USER_ID +
                ")) GROUP BY block_code ) f ON a.block_code=f.block_code LEFT JOIN (SELECT block_code, count(*) AS t6_total, ROUND(AVG(datediff(CURDATE(), end_date) - 6),1) AS t6_avg FROM delayed_musters WHERE step='ds_t6'AND block_code IN (SELECT block_code FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
                USER_ID +
                ")) GROUP BY block_code ) g ON a.block_code=g.block_code LEFT JOIN (SELECT block_code, count(*) AS t7_total, ROUND(AVG(datediff(CURDATE(), end_date) - 7),1) AS t7_avg FROM delayed_musters WHERE step='ds_t7'AND block_code IN (SELECT block_code FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
                USER_ID +
                ")) GROUP BY block_code ) h ON a.block_code=h.block_code LEFT JOIN (SELECT block_code, count(*) AS t8_total, ROUND(AVG(datediff(CURDATE(), end_date) - 8),1) AS t8_avg FROM delayed_musters WHERE step='ds_t8'AND block_code IN (SELECT block_code FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=" +
                USER_ID +
                ')) GROUP BY block_code ) i ON a.block_code=i.block_code LEFT JOIN (SELECT b.block_code, a.firstname, a.lastname, a.uid, a.designation, a.designation_id, a.mobile FROM block_officers a RIGHT JOIN (SELECT * FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id=' +
                USER_ID +
                ') ) b ON a.block_code = b.block_code ) j ON a.block_code=j.block_code;' +
                "SELECT a.district_code, a.district_name, b.tot_trn, b.year, b.month, b.mrc_mre, b.mre_wlg, b.wlg_wls, b.wls_fto, b.fto_sn1, b.sn1_sn2, b.sn2_prc, b.mrc_prc from (SELECT district_code, district_name FROM districts WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "')) a LEFT JOIN (SELECT district_code, SUM(total_transactions) AS tot_trn,YEAR(date) AS year, MONTH(date) AS month,ROUND(sum(mrc_mre_mean*total_transactions)/sum(total_transactions),1) mrc_mre,ROUND(sum(mre_wlg_mean*total_transactions)/sum(total_transactions),1) mre_wlg,ROUND(sum(wlg_wls_mean*total_transactions)/sum(total_transactions),1) wlg_wls,ROUND(sum(wls_fto_mean*total_transactions)/sum(total_transactions),1) wls_fto,ROUND(sum(fto_firstsign_mean*total_transactions)/sum(total_transactions),1) fto_sn1,ROUND(sum(firstsign_secondsign_mean*total_transactions)/sum(total_transactions),1) sn1_sn2,ROUND(sum(secondsign_processed_mean*total_transactions)/sum(total_transactions),1) sn2_prc, ROUND(sum(mrc_processed_mean*total_transactions)/sum(total_transactions),1) mrc_prc FROM district_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND district_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
                USER_ID +
                "') GROUP BY YEAR(date), MONTH(date), district_code) b ON a.district_code=b.district_code ORDER BY a.district_code, b.year, b.month;" +
                "SELECT a.district_code, a.block_code, a.block_name, b.tot_trn, b.year, b.month, b.mrc_mre, b.mre_wlg, b.wlg_wls, b.wls_fto, b.fto_sn1, b.sn1_sn2, b.sn2_prc, b.mrc_prc from (SELECT district_code, block_code, block_name FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "')) a LEFT JOIN (SELECT block_code, SUM(total_transactions) AS tot_trn,YEAR(date) AS year, MONTH(date) AS month,ROUND(sum(mrc_mre_mean*total_transactions)/sum(total_transactions),1) mrc_mre,ROUND(sum(mre_wlg_mean*total_transactions)/sum(total_transactions),1) mre_wlg,ROUND(sum(wlg_wls_mean*total_transactions)/sum(total_transactions),1) wlg_wls,ROUND(sum(wls_fto_mean*total_transactions)/sum(total_transactions),1) wls_fto,ROUND(sum(fto_firstsign_mean*total_transactions)/sum(total_transactions),1) fto_sn1,ROUND(sum(firstsign_secondsign_mean*total_transactions)/sum(total_transactions),1) sn1_sn2,ROUND(sum(secondsign_processed_mean*total_transactions)/sum(total_transactions),1) sn2_prc, ROUND(sum(mrc_processed_mean*total_transactions)/sum(total_transactions),1) mrc_prc FROM block_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND district_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
                USER_ID +
                "') GROUP BY YEAR(date), MONTH(date), block_code) b ON a.block_code = b.block_code ORDER by a.district_code, a.block_code, b.year, b.month;" +
                "SELECT state_code FROM districts WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id='" +
                USER_ID +
                "') GROUP BY state_code;" +
                "SELECT * FROM contact;" +
                "SELECT a.region_code, a.region_name, IFNULL(c.designation,'NO DESIGNATION') AS designation FROM (select * from user_regions WHERE user_id="+USER_ID+") a inner join districts b ON a.region_code=b."+ROLE+"_code LEFT join officer_configuration c on b.state_code=c.state_code and c.role='"+ROLE+"' and a.designation_id=c.designation_id;" +
                'SELECT * FROM paydroid_version;' +
                "SELECT * FROM timestamps;"
            );
        } else if (ROLE == 'state') {
            return (
                "SELECT a.region_code as state_code, a.region_name as state_name, IFNULL(b.current_total,0) AS current_total, IFNULL(c.delayed_total,0) AS delayed_total, IFNULL(d.delayed_no_t5,0) AS delayed_no_t5, IFNULL(e.days_to_payment,'No Data') AS days_to_payment FROM (SELECT region_code, region_name FROM user_regions WHERE user_id='" + USER_ID + "') a LEFT JOIN (SELECT count(*) AS current_total, b.state_code AS region_code FROM current_musters a INNER JOIN (SELECT state_code, block_code from blocks WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "') ) b ON a.block_code = b.block_code GROUP BY region_code ) b ON a.region_code = b.region_code LEFT JOIN (SELECT count(*) AS delayed_total, b.state_code AS region_code FROM delayed_musters a INNER JOIN (SELECT state_code, block_code from blocks WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "') ) b ON a.block_code = b.block_code GROUP BY region_code ) c ON a.region_code = c.region_code LEFT JOIN (SELECT count(*) AS delayed_no_t5, b.state_code AS region_code FROM (SELECT * FROM delayed_musters WHERE step<>'ds_t5') a INNER JOIN (SELECT state_code, block_code from blocks WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "') ) b ON a.block_code = b.block_code GROUP BY region_code ) d ON a.region_code = d.region_code LEFT JOIN (SELECT ROUND(SUM(mrc_processed_mean * total_transactions) / SUM(total_transactions),1) AS days_to_payment, state_code AS region_code FROM state_delays_duration WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "') AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' and date>=DATE_SUB(now(), INTERVAL 3 MONTH) GROUP BY region_code ) e ON a.region_code = e.region_code;" + "SELECT a.state_code, a.state_name, a.district_code, a.district_name, IFNULL(j.firstname,'') AS firstname, IFNULL(j.lastname,'') AS lastname, IFNULL(j.uid,'') AS uid, IFNULL(j.designation,'No Data') AS designation, j.designation_id, IFNULL(j.mobile,'No Mobile Data') AS mobile, b.days_to_payment, IFNULL(c.current_total,0) AS current_total, IFNULL(d.delayed_total,0) AS delayed_total, IFNULL(k.delayed_no_t5,0) AS delayed_no_t5, IFNULL(e.t2_total,0) AS t2_total, IFNULL(e.t2_avg,'') AS t2_avg, IFNULL(f.t5_total,0) AS t5_total, IFNULL(f.t5_avg,'') AS t5_avg, IFNULL(g.t6_total,0) AS t6_total, IFNULL(g.t6_avg,'') AS t6_avg, IFNULL(h.t7_total,0) AS t7_total, IFNULL(h.t7_avg,'') AS t7_avg, IFNULL(i.t8_total,0) AS t8_total, IFNULL(i.t8_avg,'') AS t8_avg FROM (SELECT state_code, state_name, district_code, district_name FROM districts WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "') ) a LEFT JOIN (SELECT district_code, IFNULL(ROUND(SUM(mrc_processed_mean * total_transactions) / SUM(total_transactions),1),'No Data') AS days_to_payment FROM district_delays_duration WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "') AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' and date>=DATE_SUB(now(), INTERVAL 3 MONTH) GROUP BY district_code ) b ON a.district_code=b.district_code LEFT JOIN (SELECT b.district_code, count(*) AS current_total FROM current_musters a INNER JOIN (SELECT district_code, block_code FROM blocks WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "') ) b ON a.block_code=b.block_code GROUP BY district_code ) c ON a.district_code=c.district_code LEFT JOIN (SELECT b.district_code, count(*) AS delayed_total FROM delayed_musters a INNER JOIN (SELECT district_code, block_code FROM blocks WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "') ) b ON a.block_code=b.block_code GROUP BY district_code ) d ON a.district_code=d.district_code LEFT JOIN (SELECT b.district_code, count(*) AS delayed_no_t5 FROM (SELECT * FROM delayed_musters WHERE step<>'ds_t5') a INNER JOIN (SELECT district_code, block_code FROM blocks WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "') ) b ON a.block_code=b.block_code GROUP BY district_code ) k ON a.district_code=k.district_code LEFT JOIN (SELECT b.district_code, count(*) AS t2_total, ROUND(AVG(datediff(CURDATE(), end_date) - 2),1) AS t2_avg FROM (SELECT * FROM delayed_musters WHERE step='ds_t2') a INNER JOIN (SELECT district_code, block_code FROM blocks WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "') ) b ON a.block_code=b.block_code GROUP BY district_code ) e ON a.district_code=e.district_code LEFT JOIN (SELECT b.district_code, count(*) AS t5_total, ROUND(AVG(datediff(CURDATE(), end_date) - 5),1) AS t5_avg FROM (SELECT * FROM delayed_musters WHERE step='ds_t5') a INNER JOIN (SELECT district_code, block_code FROM blocks WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "') ) b ON a.block_code=b.block_code GROUP BY district_code ) f ON a.district_code=f.district_code LEFT JOIN (SELECT b.district_code, count(*) AS t6_total, ROUND(AVG(datediff(CURDATE(), end_date) - 6),1) AS t6_avg FROM (SELECT * FROM delayed_musters WHERE step='ds_t6') a INNER JOIN (SELECT district_code, block_code FROM blocks WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "') ) b ON a.block_code=b.block_code GROUP BY district_code ) g ON a.district_code=g.district_code LEFT JOIN (SELECT b.district_code, count(*) AS t7_total, ROUND(AVG(datediff(CURDATE(), end_date) - 7),1) AS t7_avg FROM (SELECT * FROM delayed_musters WHERE step='ds_t7') a INNER JOIN (SELECT district_code, block_code FROM blocks WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "') ) b ON a.block_code=b.block_code GROUP BY district_code ) h ON a.district_code=h.district_code LEFT JOIN (SELECT b.district_code, count(*) AS t8_total, ROUND(AVG(datediff(CURDATE(), end_date) - 8),1) AS t8_avg FROM (SELECT * FROM delayed_musters WHERE step='ds_t8') a INNER JOIN (SELECT district_code, block_code FROM blocks WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "') ) b ON a.block_code=b.block_code GROUP BY district_code ) i ON a.district_code=i.district_code LEFT JOIN (SELECT b.district_code, a.uid, a.firstname, a.lastname, a.designation, a.designation_id, a.mobile FROM district_officers a RIGHT JOIN (SELECT * FROM districts WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "') ) b ON a.district_code = b.district_code ) j ON a.district_code=j.district_code;" + "SELECT a.state_code, a.state_name, b.tot_trn, b.year, b.month, b.mrc_mre, b.mre_wlg, b.wlg_wls, b.wls_fto, b.fto_sn1, b.sn1_sn2, b.sn2_prc, b.mrc_prc from (SELECT state_code, state_name FROM states WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "')) a LEFT JOIN (SELECT state_code, SUM(total_transactions) AS tot_trn,YEAR(date) AS year, MONTH(date) AS month,ROUND(sum(mrc_mre_mean*total_transactions)/sum(total_transactions),1) mrc_mre,ROUND(sum(mre_wlg_mean*total_transactions)/sum(total_transactions),1) mre_wlg,ROUND(sum(wlg_wls_mean*total_transactions)/sum(total_transactions),1) wlg_wls,ROUND(sum(wls_fto_mean*total_transactions)/sum(total_transactions),1) wls_fto,ROUND(sum(fto_firstsign_mean*total_transactions)/sum(total_transactions),1) fto_sn1,ROUND(sum(firstsign_secondsign_mean*total_transactions)/sum(total_transactions),1) sn1_sn2,ROUND(sum(secondsign_processed_mean*total_transactions)/sum(total_transactions),1) sn2_prc, ROUND(sum(mrc_processed_mean*total_transactions)/sum(total_transactions),1) mrc_prc FROM state_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND state_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "') GROUP BY YEAR(date), MONTH(date), state_code) b ON a.state_code=b.state_code ORDER BY a.state_code, b.year, b.month;" + "SELECT a.state_code, a.district_code, a.district_name, b.tot_trn, b.year, b.month, b.mrc_mre, b.mre_wlg, b.wlg_wls, b.wls_fto, b.fto_sn1, b.sn1_sn2, b.sn2_prc, b.mrc_prc from (SELECT state_code, district_code, district_name FROM districts WHERE state_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "')) a LEFT JOIN (SELECT district_code, SUM(total_transactions) AS tot_trn,YEAR(date) AS year, MONTH(date) AS month,ROUND(sum(mrc_mre_mean*total_transactions)/sum(total_transactions),1) mrc_mre,ROUND(sum(mre_wlg_mean*total_transactions)/sum(total_transactions),1) mre_wlg,ROUND(sum(wlg_wls_mean*total_transactions)/sum(total_transactions),1) wlg_wls,ROUND(sum(wls_fto_mean*total_transactions)/sum(total_transactions),1) wls_fto,ROUND(sum(fto_firstsign_mean*total_transactions)/sum(total_transactions),1) fto_sn1,ROUND(sum(firstsign_secondsign_mean*total_transactions)/sum(total_transactions),1) sn1_sn2,ROUND(sum(secondsign_processed_mean*total_transactions)/sum(total_transactions),1) sn2_prc, ROUND(sum(mrc_processed_mean*total_transactions)/sum(total_transactions),1) mrc_prc FROM district_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND state_code IN (SELECT region_code FROM user_regions WHERE user_id='" + USER_ID + "') GROUP BY YEAR(date), MONTH(date), district_code) b ON a.district_code = b.district_code ORDER by a.state_code, a.district_code, b.year, b.month;" + "SELECT * FROM contact;" + "SELECT a.region_code, a.region_name, IFNULL(c.designation,'NO DESIGNATION') AS designation FROM (select * from user_regions WHERE user_id='" + USER_ID + "') a inner join states b ON a.region_code=b."+ROLE+"_code LEFT join officer_configuration c on b.state_code=c.state_code and c.role='"+ROLE+"' and a.designation_id=c.designation_id;" + "SELECT * FROM paydroid_version;" + "SELECT * FROM timestamps;"
            );
        }
    }
};

exports.editor = function(BLOCK_CODE, STEP) {
    return (
        "SELECT * FROM (SELECT level FROM employee_configuration WHERE state_code IN (SELECT state_code from blocks WHERE block_code = '" +
        BLOCK_CODE +
        "') AND step='" +
        STEP +
        "') a LEFT JOIN ((SELECT a.block_code, a.panchayat_code, a.panchayat_name, b.staff_id, b.name, b.designation, b.mobile_no, 'panchayat' AS level FROM (SELECT panchayat_code, panchayat_name, block_code FROM panchayats WHERE block_code='" +
        BLOCK_CODE +
        "') a LEFT JOIN (SELECT a.staff_id, a.name, b.designation, a.mobile_no, b.panchayat_code FROM employees_unique a INNER JOIN employee_regions b ON a.staff_id=b.staff_id AND block_code='" +
        BLOCK_CODE +
        "' AND step='" +
        STEP +
        "' AND panchayat_code <> '') b ON a.panchayat_code = b.panchayat_code) UNION (SELECT a.block_code, NULL AS panchayat_code, NULL AS panchayat_name, b.staff_id, b.name, b.designation, b.mobile_no, 'block' AS level FROM (SELECT '" +
        BLOCK_CODE +
        "' AS block_code) a LEFT JOIN (SELECT a.staff_id, a.name, b.designation, a.mobile_no, b.block_code, b.panchayat_code FROM employees_unique a INNER JOIN employee_regions b ON a.staff_id=b.staff_id AND block_code='" +
        BLOCK_CODE +
        "' AND step='" +
        STEP +
        "' AND panchayat_code = '') b ON a.block_code = b.block_code)) b ON a.level = b.level;" +
        "SELECT level, designation, alternative_designation FROM employee_configuration WHERE state_code IN (SELECT state_code from blocks WHERE block_code = '" +
        BLOCK_CODE +
        "') AND step='" +
        STEP +
        "';"
    );
};

exports.editor_info = function(BLOCK_CODE) {
    return (
        "SELECT * FROM officer_configuration WHERE state_code IN (SELECT state_code from blocks WHERE block_code = '" +
        BLOCK_CODE +
        "') and role='block' ORDER BY designation_id;" +
        "SELECT block_name from blocks WHERE block_code='" +
        BLOCK_CODE +
        "';"
    );
};

exports.editor_upsert = function(
    NAME,
    DESIGNATION,
    STEP,
    MOBILE_NO,
    BLOCK_CODE,
    PANCHAYAT_CODE,
    USER_ID
) {
    return (
        "INSERT INTO employee_regions (staff_id,designation,step,block_code,panchayat_code,edited_by,to_delete) VALUES ((SELECT staff_id FROM employees_unique WHERE name='" +
        NAME +
        "' AND mobile_no='" +
        MOBILE_NO +
        "'), '" +
        DESIGNATION +
        "', '" +
        STEP +
        "', '" +
        BLOCK_CODE +
        "', '" +
        PANCHAYAT_CODE +
        "', " +
        USER_ID +
        ', 0 ) ON DUPLICATE KEY UPDATE edited_by=IF(!(VALUES(staff_id) <=> staff_id AND VALUES(designation) <=> designation), VALUES(edited_by), edited_by), staff_id= VALUES(staff_id), designation=VALUES(designation), to_delete=VALUES(to_delete);'
    );
};

exports.editor_insert_unique = function(NAME, MOBILE_NO) {
    return (
        "INSERT IGNORE INTO employees_unique (name,mobile_no) VALUES ('" +
        NAME +
        "','" +
        MOBILE_NO +
        "');"
    );
};

exports.usage_nav = function() {
    return "select a.metric, a.metric_label, b.comparison as filter_comparison, b.comparison_label as filter_comparison_label, 'comparison' as type, NULL as `option`, NULL as option_label from usage_metrics a inner join usage_comparisons b on a.comparison=b.comparison union select a.metric, a.metric_label, b.filter as filter_comparison, b.filter_label as filter_comparison_label, 'filter' as type, b.option, b.option_label from usage_metrics a inner join usage_filters b on a.filter=b.filter;";
};

exports.outcomes = function() {
    return (
        'SELECT outcome, label FROM outcomes;' +
        'SELECT date, mean, upper, outcome, lower, treatment FROM estimates_series;' +
        'SELECT * FROM estimates_summary;' +
        'SELECT date, mean, upper, outcome, lower, arm FROM estimates_series_arms;' + // arm === (1,2,3)
        'SELECT t1_mean, t2_mean, t3_mean, p_val, outcome FROM estimates_summary_arms;'
    );
};

exports.contact = function() {
    return ("SELECT * FROM contact;");
};

exports.employee_data_help = function(USER_ID, ROLE) {
    return "SELECT a.region_code, a.region_name, IFNULL(c.designation,'NO DESIGNATION') AS designation FROM (select * from user_regions WHERE user_id="+USER_ID+") a inner join "+ROLE+"s b ON a.region_code=b."+ROLE+"_code LEFT join officer_configuration c on b.state_code=c.state_code and c.role='"+ROLE+"' and a.designation_id=c.designation_id;";
};
