module.exports = {
  method: 'GET',
  path: '/agreements',
  options: {
    handler: async (request, h) => {
      return h.view('agreements')
    }
  }
}
