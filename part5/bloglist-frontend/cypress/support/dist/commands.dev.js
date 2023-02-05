"use strict";

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', function (_ref) {
  var username = _ref.username,
      password = _ref.password;
  cy.request("POST", "http://localhost:3001/api/login", {
    username: username,
    password: password
  }).then(function (_ref2) {
    var body = _ref2.body;
    localStorage.setItem("loggedBlogUser", JSON.stringify(body));
    cy.visit("http://localhost:3000");
  });
});
Cypress.Commands.add('createBlog', function (_ref3) {
  var url = _ref3.url,
      title = _ref3.title,
      author = _ref3.author,
      likes = _ref3.likes;
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: {
      url: url,
      title: title,
      author: author,
      likes: likes
    },
    headers: {
      'Authorization': "bearer ".concat(JSON.parse(localStorage.getItem('loggedBlogUser')).token)
    }
  });
  cy.visit('http://localhost:3000');
});
Cypress.Commands.add('deleteBlog', function (_ref4) {
  var id = _ref4.id;
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'DELETE',
    body: {
      id: id
    },
    headers: {
      'Authorization': "bearer ".concat(JSON.parse(localStorage.getItem('loggedBlogUser')).token)
    }
  });
  cy.visit('http://localhost:3000');
});