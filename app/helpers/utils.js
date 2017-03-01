'use strict';

const D3 = require('d3');

exports.padNum = function(num) {
    var str = num.toString();
    return str.length === 1 ? '0' + str : str;
};

exports.toProperCase = function(str) {
    if (str === null || str==='') {
        return '';
    } else {
        return str.split(' ').map(i => i[0].toUpperCase() + i.substring(1)).join(' ');
    }
};

exports.getDesignation = function(task_assign, state_code) {
    var designationLookup = {
        17: 'SE',
        33: 'TA',
        34: 'JE'
    };

    if (task_assign === 'TA') {
        return designationLookup[state_code];
    } else {
        return task_assign;
    }
};

exports.buildName = function(firstname, lastname) {
    var name = (firstname.toUpperCase() + ' ' + lastname.toUpperCase()).trim();
    if (name==='') {
        return 'No Officer Data';
    } else {
        return name;
    }

}
exports.buildSubject = function(subjectStub, userId) {
    var subjectLine = subjectStub + ' [' + userId + ']';
    return subjectLine;
}

exports.getDesignationArray = function(designation,alternative_designation) {
    if (alternative_designation === null) {
        return [designation.trim(),'Other'];
    }
    else {
        return [designation].concat(alternative_designation.split(';').map(function(x) { return x.trim(); }),['Other']);
    }

}