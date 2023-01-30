"use strict";

describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    var user = {
      name: 'test',
      username: 'test',
      password: 'test'
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });
  it('front page can be opened', function () {
    cy.visit('http://localhost:3000');
    cy.contains('Notes');
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022');
  });
  it('login form can be opened', function () {
    cy.visit('http://localhost:3000');
    cy.contains('login').click();
  });
  it('user can login', function () {
    cy.visit('http://localhost:3000');
    cy.contains('login').click();
    cy.get('#username').type('test');
    cy.get('#password').type('test');
    cy.get('#login-button').click();
    cy.contains('test logged in');
  });
  describe('when logged in', function () {
    beforeEach(function () {
      cy.visit('http://localhost:3000');
      cy.contains('login').click();
      cy.get('#username').type('test');
      cy.get('#password').type('test');
      cy.get('#login-button').click();
    });
    it('a new note can be created', function () {
      cy.contains('new note').click();
      cy.get('#note-input').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });
  });
});