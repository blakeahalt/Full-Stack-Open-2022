describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')

      const user1 = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen'
      }
      
      cy.request('POST', 'http://localhost:3001/api/users/', user1)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.visit('http://localhost:3000')
        cy.contains('login').click()    
    })

    describe('Login',function() {
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

    describe('when logged in', function() {
      beforeEach(function() {
        cy.visit('http://localhost:3000')
        cy.login({ username: 'mluukkai', password: 'salainen' })
      })

      it('a new blog can be created', function() {
        const blog = {
          url: 'http://www.BlogCanBeCreated.com',
          title: 'TitleCanBeCreated',
          author: 'AuthorCanBeCreated'
        }
        cy.visit('http://localhost:3000')
        cy.contains('new blog').click()
        cy.createBlog({ url: blog.url, title: blog.title, author: blog.author })
        cy.contains('TitleCanBeCreated')
      })

      it('and several notes exist', function () {
        cy.visit('http://localhost:3000')
        cy.contains('new blog').click()
        cy.createBlog({ url: 'URL1', title: 'TestTitle1', author: 'Author1' })
        cy.createBlog({ url: 'URL2', title: 'TestTitle2', author: 'Author2' })
        })

      it('one of those can be be deleted', function () {
        cy.visit('http://localhost:3000')
        cy.contains('new blog').click()
        cy.createBlog({ url: 'URL1', title: 'TestTitle1', author: 'Author1' })
        cy.contains('Expand All').click()
        cy.contains('Title: TestTitle1').parent().contains('Delete').as('deleteButton')
        cy.get('@deleteButton').click()
        cy.get('.success')
        .should('contain', 'Deleted blog')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      })
      
      it('blog can not be deleted by another user', function () {

        const user2 = {
          username: 'bposter',
          name: 'Blake',
          password: 'Bposter'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user2)

        cy.visit('http://localhost:3000')
        cy.contains('new blog').click()
        cy.createBlog({ url: 'URL1', title: 'TestTitle1', author: 'Author1' })
        cy.contains('Logout').click()
        cy.login({ username: 'bposter', password: 'Bposter' })
        cy.contains('Expand All').click()
        cy.contains('Title: TestTitle1').parent().contains('Delete').as('deleteButton')
        cy.get('@deleteButton').click()
        cy.get('.error')
        .should('contain', 'Unauthorized')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      })

    describe('liking blogs', function() {
      it('a blog can be liked', function () {
        cy.visit('http://localhost:3000')
        cy.contains('new blog').click()
        cy.createBlog({ url: 'URL1', title: 'TestTitle1', author: 'Author1' })
        cy.contains('Expand All').click()
        cy.contains('Title: TestTitle1').parent().contains('Like').click()
        cy.get('.success')
        .should('contain', `You liked 'TestTitle1'`)
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      })

      it('Compare the sequence of blog likes', function () {
        cy.createBlog({
          'title': 'Title with LESS likes',
          'author': 'Author LESS',
          'url': 'https://Loser.com',
          'likes': 7
        })
        cy.createBlog({
          'title': 'Title with MORE likes',
          'author': 'Author MORE',
          'url': 'http://better.edu',
          'likes': 10
        })
        cy.contains('Expand All').click()
        cy.get('#likes')
          .should('contain', '10')
          .should('not.contain', '7')
      })
  })
})
})
})