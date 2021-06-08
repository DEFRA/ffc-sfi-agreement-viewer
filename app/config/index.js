const Joi = require('joi')
const mqConfig = require('./mq-config')
const dbConfig = require('./db-config')
const { development, production, test } = require('./constants').environments

// Define config schema
const schema = Joi.object({
  env: Joi.string().valid(development, test, production).default(development),
  port: Joi.number().default(3004),
  staticCacheTimeoutMillis: Joi.number().default(7 * 24 * 60 * 60 * 1000)
})

// Build config
const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  staticCacheTimeoutMillis: process.env.STATIC_CACHE_TIMEOUT_IN_MILLIS
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

// Use the Joi validated value
const value = result.value

// Add some helper props
value.isDev = value.env === development
value.isProd = value.env === production

value.eligibilitySubscription = mqConfig.eligibilitySubscription
value.standardsSubscription = mqConfig.standardsSubscription
value.validateSubscription = mqConfig.validateSubscription
value.calculateSubscription = mqConfig.calculateSubscription
value.submitSubscription = mqConfig.submitSubscription
value.withdrawSubscription = mqConfig.withdrawSubscription
value.paymentSubscription = mqConfig.paymentSubscription

value.dbConfig = dbConfig

module.exports = value
