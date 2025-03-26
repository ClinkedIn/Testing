const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    experimentalSessionAndOrigin: true, // Enables cy.origin()
    chromeWebSecurity: false, // Prevents CORS issues
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true
    },
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
        
    },
  },
});
