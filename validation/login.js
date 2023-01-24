const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.Email = !isEmpty(data.Email) ? data.Email : "";
  data.Psw = !isEmpty(data.Psw) ? data.Psw : "";

  // Email checks
  if (Validator.isEmpty(data.Email)) {
    errors.Email = "Email field is required";
  } else if (!Validator.isEmail(data.Email)) {
    errors.Email = "Email is invalid";
  }
  // Password checks
  if (Validator.isEmpty(data.Psw)) {
    errors.Psw = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};