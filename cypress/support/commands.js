import { v4 as uuidv4 } from 'uuid';
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
Cypress.Commands.add('login', (username, password) => {
    cy.visit('https://www.linkedin.com/home');
    cy.get('.nav__button-secondary').click();
    cy.get('#username').type(username, { log: false }); // Hide username in logs
    cy.get('#password').type(password, { log: false }); // Hide password in logs
    cy.get('.btn__primary--large').click();
});

Cypress.Commands.add('Generate_emails', () => {
    return `testsignup1232+${uuidv4()}@gmail.com`;
});