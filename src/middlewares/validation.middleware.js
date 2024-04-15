const { body, validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

module.exports.registerValidation = async (req, res, next) => {
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

  await Promise.all(rules.map((rule) => rule.run(req)));
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
   return  next(new ApiError(httpStatus.BAD_REQUEST, validationErrors.array()[0].msg))
  }
  next();
};
