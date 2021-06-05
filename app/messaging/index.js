const config = require('../config')
const processMessage = require('./process-message')
const { MessageReceiver } = require('ffc-messaging')
let eligibilityReceiver
let standardsReceiver
let validateReceiver
let calculateReceiver
let submitReceiver
let withdrawReceiver
let paymentApiReceiver
let paymentCalculatorReceiver
let withdrawApiReceiver
let withdrawCalculatorReceiver
let withdrawViewerReceiver

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

  const paymentApiAction = message => processMessage(message, paymentApiReceiver)
  paymentApiReceiver = new MessageReceiver(config.paymentApiSubscription, paymentApiAction)
  await paymentApiReceiver.subscribe()

  const paymentCalculatorAction = message => processMessage(message, paymentCalculatorReceiver)
  paymentCalculatorReceiver = new MessageReceiver(config.paymentCalculatorSubscription, paymentCalculatorAction)
  await paymentCalculatorReceiver.subscribe()

  const withdrawApiAction = message => processMessage(message, withdrawApiReceiver)
  withdrawApiReceiver = new MessageReceiver(config.withdrawApiSubscription, withdrawApiAction)
  await withdrawApiReceiver.subscribe()

  const withdrawCalculatorAction = message => processMessage(message, withdrawCalculatorReceiver)
  withdrawCalculatorReceiver = new MessageReceiver(config.withdrawCalculatorSubscription, withdrawCalculatorAction)
  await withdrawCalculatorReceiver.subscribe()

  const withdrawViewerAction = message => processMessage(message, withdrawViewerReceiver)
  withdrawViewerReceiver = new MessageReceiver(config.withdrawViewerSubscription, withdrawViewerAction)
  await withdrawViewerReceiver.subscribe()

  console.info('Ready to receive messages')
}

async function stop () {
  await eligibilityReceiver.closeConnection()
  await standardsReceiver.closeConnection()
  await validateReceiver.closeConnection()
  await calculateReceiver.closeConnection()
  await submitReceiver.closeConnection()
  await withdrawReceiver.closeConnection()
  await paymentApiReceiver.closeConnection()
  await paymentCalculatorReceiver.closeConnection()
  await withdrawApiReceiver.closeConnection()
  await withdrawCalculatorReceiver.closeConnection()
  await withdrawViewerReceiver.closeConnection()
}

module.exports = { start, stop }
