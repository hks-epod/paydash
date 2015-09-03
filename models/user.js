/**
 * User Model
 */
'use strict';
var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  crypto = require('../lib/crypto');

var userModel = function() {

  var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: {
      type: String,
      unique: true
    },
    password: String,
    role: String,
    gender: String,
    dob: String,
    mobile: String,
    email: String,
    sas: Boolean,
    sas_years: String,
    ias: Boolean,
    ias_years: String,
    title: String,
    region_type: String,
    region_name: String,
    work_email: String,
    work_years: String,
    time_on_nrega: String,
  });

  /**
   * Helper function that hooks into the 'save' method, and replaces plaintext passwords with a hashed version.
   */
  userSchema.pre('save', function(next) {
    var user = this;
    //If the password has not been modified in this save operation, leave it alone (So we don't double hash it)
    if (!user.isModified('password')) {
      next();
      return;
    }
    //Encrypt it using bCrypt. Using the Sync method instead of Async to keep the code simple.
    var hashedPwd = bcrypt.hashSync(user.password, crypto.getCryptLevel());
    user.password = hashedPwd;
    next();
  });

  /**
   * Helper function that takes a plaintext password and compares it against the user's hashed password.
   * @param plainText
   * @returns true/false
   */
  userSchema.methods.passwordMatches = function(plainText) {
    var user = this;
    return bcrypt.compareSync(plainText, user.password);
  };

  return mongoose.model('User', userSchema);
};

module.exports = new userModel();
