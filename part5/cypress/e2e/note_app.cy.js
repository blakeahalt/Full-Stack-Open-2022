// // describe('Note app', function() {

// //   beforeEach(function() {
// //     cy.request('POST', 'http://localhost:3001/api/testing/reset')
    
// //     const user = {
// //       name: 'mluukkai',
// //       username: 'Matti Luukkainen',
// //       password: 'salainen'
// //     }
    
// //     cy.request('POST', 'http://localhost:3001/api/users/', user) 
// //     cy.visit('http://localhost:3000')
// //   })

// //     it('front page can be opened', function() {
// //       cy.visit('http://localhost:3000')
// //       cy.contains('Notes')
// //       cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
// //     })

// //     it('login form can be opened', function() {
// //       cy.visit('http://localhost:3000')
// //       cy.contains('login').click()
// //     })
    
// //     it('user can login', function () {
// //       cy.visit('http://localhost:3000')
// //       cy.contains('login').click()
// //       cy.get('#username').type('mluukkai')
// //       cy.get('#password').type('salainen')
// //       cy.get('#login-button').click()

// //       cy.contains('Matti Luukkainen logged in')
// //     })
// //   })
    
//   // describe('Note app', function() {
//   //   beforeEach(function() {
//   //     cy.request('POST', 'http://localhost:3001/api/testing/reset')
      
//   //     const user = {
//   //       name: 'mluukkai',
//   //       username: 'Matti Luukkainen',
//   //       password: 'salainen'
//   //     }
      
//   //     cy.request('POST', 'http://localhost:3001/api/users/', user) 
//   //     cy.visit('http://localhost:3000')
//   //   })

//   //   it('user can login', function () {
//   //     cy.visit('http://localhost:3000')
//   //     cy.contains('login').click()
//   //     cy.get('#username').type('mluukkai')
//   //     cy.get('#password').type('salainen')
//   //     cy.get('#login-button').click()
      
//   //     cy.contains('Matti Luukkainen logged in')
//   //   })
    
//   //   it('login fails with wrong password', function() {
//   //     cy.visit('http://localhost:3000')
//   //     cy.contains('login').click()
//   //     cy.get('#username').type('mluukkai')
//   //     cy.get('#password').type('salainen')
//   //     cy.get('#login-button').click()

//   //     cy.get('.error')
//   //     .should('contain', 'Wrong credentials')
//   //     .and('have.css', 'color', 'rgb(255, 0, 0)')
//   //     .and('have.css', 'border-style', 'solid')

//   //     cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
//   //   })

//     describe('when logged in', function() {
//       beforeEach(function() {
//         cy.request('POST', 'http://localhost:3001/api/login', {
//           username: 'mluukkai', password: 'salainen'
//         }).then(response => {
//           localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
//           cy.visit('http://localhost:3000')
//         })
//     })

//       it('a new note can be created', function() {
//         cy.contains('new note').click()
//         cy.get('#note-input').type('a note created by cypress',)
//         cy.contains('save').click()
//         cy.contains('a note created by cypress')
//       })
//     })

//   // })

describe('Note ', function() {
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

  it('front page can be opened', function() {
    // cy.visit('http://localhost:3000')
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })

  it('login form can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000')
      cy.contains('login').click()
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a new note can be created', function() {
      cy.visit('http://localhost:3000')
      cy.contains('new note').click()
      cy.get('#note-input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        // cy.createNote({
        //   content: 'another note cypress',
        //   important: true
        // })
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })

  it('login fails with wrong password', function() {
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