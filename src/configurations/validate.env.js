const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(path.resolve(), './.env') });
const envSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(8000),
    MONGODB_URL: Joi.string().required().description('Mongo DB URL'),
    NODE_ENV: Joi.string().valid('production', 'test').required(),
    JWT_ACCESS_SECRET: Joi.string().required().description('JWT access secret key'),
    JWT_REFRESH_SECRET: Joi.string().required().description('JWT refresh secret key'),
    JWT_ACCESS_EXPIRY: Joi.string().default('1h').description('JWT access token expiry after which access tokens expire'),
    JWT_REFRESH_EXPIRY: Joi.string().default('6h').description('JWT refresh token expiry after which access tokens expire'),
  })
  .unknown();

const { value: envVars, error } = envSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongodbUrl: envVars.MONGODB_URL,
  jwt_access_secret: envVars.JWT_ACCESS_SECRET,
  jwt_access_expiry: envVars.JWT_ACCESS_EXPIRY,
  jwt_refresh_secret: envVars.JWT_REFRESH_SECRET,
  jwt_refresh_expiry: envVars.JWT_REFRESH_EXPIRY
};
