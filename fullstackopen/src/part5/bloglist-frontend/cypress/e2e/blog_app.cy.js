describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')

      const user = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen'
      }
      
      cy.request('POST', 'http://localhost:3001/api/users/', user)

      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.visit('http://localhost:3000')
        cy.contains('login').click()    
    })

    describe('Login',function() {
        beforeEach(function() {
            cy.visit('http://localhost:3000')
            cy.contains('login').click()
            cy.login({ username: 'mluukkai', password: 'salainen' })
          })

        it('succeeds with correct credentials', function() {
            cy.visit('http://localhost:3000')
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            // cy.contains('login').click()
            cy.get('#login-button').click()
            cy.get('html').should('contain', 'Matti Luukkainen logged in')
        })
    
        it('fails with wrong credentials', function() {
            cy.visit('http://localhost:3000')
            cy.contains('login').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
        
            cy.get('.error')
              .should('contain', 'Wrong credentials')
              .and('have.css', 'color', 'rgb(255, 0, 0)')
              .and('have.css', 'border-style', 'solid')
        
            cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
        })
    })
  })



//   const blog = {
//     title: 'e2e Testing Title',
//     author: 'Blake',
//     url: 'http://wwww.e2e-testing.com'
//   }
//   cy.request('POST', 'http://localhost:3001/api/blogs')