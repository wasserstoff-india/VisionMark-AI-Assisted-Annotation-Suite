const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');


dotenv.config({ path: path.join(path.resolve(), '../.env') });

const envSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(8000),
    MONGODB_URL: Joi.string().required().description('Mongo DB URL'),
    NODE_ENV: Joi.string().valid('production', 'test').required(),
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
};
