/* eslint-disable no-undef */

describe('Blog tests', function () {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3001/api/test/reset')

    let testUser = {
      username: 'pattar420',
      name: 'pattar',
      password: '56171'
    }

    cy.request('POST', 'http://localhost:3001/api/users', testUser)

    cy.visit('http://localhost:3001')
  })

  it('Login form is shown', function(){
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function(){
      cy.get('#usernameInput')
        .type('pattar420')

      cy.get('#passwordInput')
        .type('56171')

      cy.get('#loginSubmitButton').click()
      cy.get('#message-content')
        .should('contain', 'pattar420 logged in')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('fails with wrong credentials', function(){
      cy.get('#usernameInput')
        .type('pattar421')

      cy.get('#passwordInput')
        .type('56171')

      cy.get('#loginSubmitButton').click()
      cy.get('#message-content')
        .should('contain', 'Login failed')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })

    describe('when logged in', function(){
      beforeEach(function(){
        cy.login({ username: 'pattar420', password: '56171' })
      })

      it('a blog can be created', function(){
        cy.get('#toggle-visibility-button').click()
        cy.get('#title-input').type('this is a test')
        cy.get('#author-input').type('testy mctesterson')
        cy.get('#url-input').type('test.tes')
        cy.get('#blog-create-button').click()
        cy.contains('this is a test')
      })

      it('user can like blog', function(){
        cy.makeBlog({ title: 'this is a test', author: 'testy mctesterson', url: 'test.tes', likes: 3 })
        cy.contains('show').click()
        cy.get('#like-button').click()
        cy.get('.like-counter').contains(4)
      })

      it('user can delete a blog', function(){
        cy.makeBlog({ title: 'this is a test', author: 'testy mctesterson', url: 'test.tes', likes: 3 })
        cy.contains('show').click()
        cy.contains('delete').click()
        cy.contains('this is a test').should('not.exist')
      })

      it('blogs are sorted correctly', function(){
        cy.makeBlog({ title: 'this is a test', author: 'testy mctesterson', url: 'test.tes', likes: 0 })
        cy.makeBlog({ title: 'this is not a test', author: 'testy mctesterson', url: 'test.tes', likes: 5 })
        cy.makeBlog({ title: 'testery testeroo', author: 'testy mctesterson', url: 'test.tes', likes: 3 })

        cy.get('.blog-content').eq(0).should('contain', 'this is not a test')
        cy.get('.blog-content').eq(1).should('contain', 'testery testeroo')
        cy.get('.blog-content').eq(2).should('contain', 'this is a test')
      })
    })
  })
})
