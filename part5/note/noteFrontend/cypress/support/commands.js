Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', { username, password })
    .then(({ body }) => {
      console.log('body', body)
      localStorage.setItem('noteAppUser', JSON.stringify(body))
    })
  cy.visit('http://localhost:3001')
})

Cypress.Commands.add('createNote', ({ content, important }) => {
  cy.request({
    url:'http://localhost:3001/api/notes',
    method: 'POST',
    body: { content, important },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('noteAppUser')).token }`
    }
  })

  cy.visit('http://localhost:3001')
})