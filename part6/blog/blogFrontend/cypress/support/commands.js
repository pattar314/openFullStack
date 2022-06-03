Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', { username: username, password: password })
    .then(({ body }) => {
      localStorage.setItem('blogUser', JSON.stringify(body))
    })
  cy.visit('http://localhost:3001')
})

Cypress.Commands.add('makeBlog', ({ title, author, url, likes }) => {
  console.log('saved user: ', localStorage.getItem('blogUser'))
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/blogs',
    body: {
      title,
      author,
      url,
      likes
    },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('blogUser')).token }`
    }
  })

  cy.visit('http://localhost:3001')
})
