/* eslint-disable no-undef */


describe('Note app', function() {

  it('login fails with wrong password', function(){
    cy.visit('http://localhost:3001')
    cy.contains('login').click()
    cy.get('#usernameInput').type('pattar420')
    cy.get('#passwordInput').type('wrong password')
    cy.get('#loginSubmitButton').click()

    cy.get('#message-banner')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
  })

  beforeEach(function(){
    cy.request('POST', 'http://localhost:3001/api/test/reset')
    const user = {
      name: 'pattar',
      username: 'pattar420',
      password: '56171'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3001')
  })


  it('front page can be opened', function(){
    cy.visit('http://localhost:3001')
    cy.contains('Notes')
  })

  it('login form can be opened', function(){
    cy.visit('http://localhost:3001')
    cy.contains('login').click()
    cy.get('#usernameInput').type('pattar420')
    cy.get('#passwordInput').type('56171')
    cy.get('#loginSubmitButton').click()

    cy.contains('new note')
  })

  describe('when logged in', function(){

    beforeEach(function(){
      cy.contains('login').click()
      cy.get('#usernameInput').type('pattar420')
      cy.get('#passwordInput').type('56171')
      cy.get('#loginSubmitButton').click()
    })


    it('a new note can be created', function(){
      cy.contains('new note').click()
      cy.get('#newNoteInput').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a new note exists', function(){

      beforeEach(function() {
        cy.contains('new note').click()
        cy.get('#newNoteInput').type('another note cypress')
        cy.contains('save').click()
      })

      it('it can be made important', function(){
        cy.contains('another note cypress')
          .contains('make important').click()

        cy.contains('another note cypress')
          .contains('make not important')
      })

    })


  })

})
