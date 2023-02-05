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
    localStorage.setItem("loggedNoteappUser", JSON.stringify(body));
    cy.visit("http://localhost:3000");
  });
});
Cypress.Commands.add('createNote', function (_ref3) {
  var content = _ref3.content,
      important = _ref3.important;
  cy.request({
    url: 'http://localhost:3001/api/notes',
    method: 'POST',
    body: {
      content: content,
      important: important
    },
    headers: {
      'Authorization': "bearer ".concat(JSON.parse(localStorage.getItem('loggedNoteappUser')).token)
    }
  });
  cy.visit('http://localhost:3000');
});