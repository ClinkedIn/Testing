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
    cy.visit('http://localhost:5173/');
    cy.get("a[class='text-blue-600 text-sm font-semibold border border-blue-600 px-4 py-2 rounded-full hover:bg-blue-100']").click();
    cy.get("input[placeholder='Email']").type(username, { log: false }); // Hide username in logs
    cy.get("input[placeholder='Password']").type(password, { log: false }); // Hide password in logs
    cy.get("button[type='submit']").click();
});
Cypress.Commands.add('loginLive', (username, password) => {
    cy.visit('https://www.lockedin-cufe.me/');
    cy.get("a[class='text-blue-600 text-sm font-semibold border border-blue-600 px-4 py-2 rounded-full hover:bg-blue-100']").click();
    cy.get("input[placeholder='Email']").type(username, { log: false }); // Hide username in logs
    cy.get("input[placeholder='Password']").type(password, { log: false }); // Hide password in logs
    cy.get("button[type='submit']").click();
});
Cypress.Commands.add('Generate_emails', () => {
    const email=`testsignup+${uuidv4()}@mailinator.com`;
    console.log(email);
    return email
});
import 'cypress-file-upload';
