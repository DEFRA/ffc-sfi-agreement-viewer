describe('Server tests', () => {
  jest.mock('ffc-messaging')
  let createServer
  let server

  test('createServer returns server', async () => {
    jest.mock('../../../../app/config', () => {
      return {
        port: 3004,
        isDev: false
      }
    })

    createServer = require('../../../../app/server')
    server = await createServer()

    expect(server).toBeDefined()
  })

  test('createServer returns server in development', async () => {
    jest.mock('../../../../app/config', () => {
      return {
        port: 3004,
        isDev: true
      }
    })

    createServer = require('../../../../app/server')
    server = await createServer()

    expect(server).toBeDefined()
  })

  beforeEach(() => {
    jest.resetModules()
    jest.mock('../../../../app/plugins/router', () => {
      return {
        plugin: {
          name: 'mockrouter',
          register: () => {}
        }
      }
    })
  })
})
