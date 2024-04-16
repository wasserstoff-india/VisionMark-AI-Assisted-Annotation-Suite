const { body, validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

/**
 * Middleware to handle request validations for user registration
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.registerValidation = async (req, res, next) => {
  //Rules defined for validation of request
  const rules = [
    body("name").trim().isString().notEmpty().withMessage("Name is required."),
    body("email").trim().isEmail().notEmpty().withMessage("Email is required."),
    body("password")
      .isStrongPassword()
      .withMessage(
        "Password should be strong. Password should be of minimum length 8 with atleast 1 small letter, 1 capital letter, 1 special character and 1 number"
      ),
    body("contact_no")
      .trim()
      .isString()
      .isLength({ min: 10 })
      .withMessage("Contact no. should be of 10 digits."),
  ];

  // Run all the rules for the request
  await Promise.all(rules.map((rule) => rule.run(req)));
  // Fetching the validation result
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
   return  next(new ApiError(httpStatus.BAD_REQUEST, validationErrors.array()[0].msg))
  }
  next();
};

/**
 * Middleware to validate the login request body
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.loginEmailValidation = async (req, res, next) => {
  //Defining rules to validate request body
  const rules = [
    body("email").trim().isEmail().notEmpty().withMessage("Email is required."),
    body("password").notEmpty().withMessage("Password is required.")
   ];
  // Run all the rules for the request body
  await Promise.all(rules.map((rule) => rule.run(req)));
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
   return  next(new ApiError(httpStatus.BAD_REQUEST, validationErrors.array()[0].msg))
  }
  next();
};