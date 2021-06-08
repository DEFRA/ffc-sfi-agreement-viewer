const config = require('../config')
const processMessage = require('./process-message')
const { MessageReceiver } = require('ffc-messaging')
let eligibilityReceiver
let standardsReceiver
let validateReceiver
let calculateReceiver
let submitReceiver
let withdrawReceiver
let paymentReceiver

async function start () {
  const eligibilityAction = message => processMessage(message, eligibilityReceiver)
  eligibilityReceiver = new MessageReceiver(config.eligibilitySubscription, eligibilityAction)
  await eligibilityReceiver.subscribe()

  const standardsAction = message => processMessage(message, standardsReceiver)
  standardsReceiver = new MessageReceiver(config.standardsSubscription, standardsAction)
  await standardsReceiver.subscribe()

  const validateAction = message => processMessage(message, validateReceiver)
  validateReceiver = new MessageReceiver(config.validateSubscription, validateAction)
  await validateReceiver.subscribe()

  const calculateAction = message => processMessage(message, calculateReceiver)
  calculateReceiver = new MessageReceiver(config.calculateSubscription, calculateAction)
  await calculateReceiver.subscribe()

  const submitAction = message => processMessage(message, submitReceiver)
  submitReceiver = new MessageReceiver(config.submitSubscription, submitAction)
  await submitReceiver.subscribe()

  const withdrawAction = message => processMessage(message, withdrawReceiver)
  withdrawReceiver = new MessageReceiver(config.withdrawSubscription, withdrawAction)
  await withdrawReceiver.subscribe()

  const paymentAction = message => processMessage(message, paymentReceiver)
  paymentReceiver = new MessageReceiver(config.paymentSubscription, paymentAction)
  await paymentReceiver.subscribe()

  console.info('Ready to receive messages')
}

async function stop () {
  await eligibilityReceiver.closeConnection()
  await standardsReceiver.closeConnection()
  await validateReceiver.closeConnection()
  await calculateReceiver.closeConnection()
  await submitReceiver.closeConnection()
  await withdrawReceiver.closeConnection()
  await paymentReceiver.closeConnection()
}

module.exports = { start, stop }
