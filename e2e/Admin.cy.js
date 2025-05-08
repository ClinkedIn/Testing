import { admin } from "../support/selectors";

describe('Reported posts',()=>{

    beforeEach(() => {
        cy.login(Cypress.env('email'), Cypress.env('password'), { log: false });
        cy.visit("http://localhost:5173/admin")
    });

    function handleReport(statusText, buttonIndex) {
      let reporterName = '';
  
      cy.get(admin.reportsIcon).click();
      cy.wait(7000);
  
      return cy.get(admin.reportsCard).should('exist').then(($cards) => {
        const matchedCards = $cards.filter((index, card) => {
          const $card = Cypress.$(card);
          const status = $card.find('span.px-2.py-1')
          .text()
          .trim();
  
          if (status === statusText) {
            return true;
          }
        });
  
        cy.wrap(matchedCards).eq(1).within(() => {
          cy.get('p.text-sm.font-medium.text-gray-900')
          .invoke('text')
          .then((text) => {
            reporterName = text.trim();
            cy.log('Reporter:', reporterName);
          });
          cy.get('button').eq(buttonIndex).click();

        });
  
        return cy.wrap(null).then(() => reporterName); // wrap for chaining
      });
    }

    function verifyReportMoved(reporterName, button) {
      cy.get(button).click();
      cy.wait(2000);
      cy.get(admin.reportsCard).should('exist').then(($cards) => {
        const matched = $cards.filter((i, card) => {
          const text = Cypress.$(card).find("p.text-sm.font-medium.text-gray-900")
          .text()
          .trim() 
          console.log(text)
          console.log('Comparing:', text.toLowerCase(), 'vs', reporterName.toLowerCase());
          return text.toLowerCase() == reporterName.toLowerCase()
        });
        expect(matched.length, 'Matched card count').to.be.greaterThan(0);
      });
    }

    it.skip('Dismiss a report',()=>{

        handleReport("Actioned",1).then((reporterName)=>{
          verifyReportMoved(reporterName, admin.dismissedButton)
        })

    })

    it.skip('Take action for a report',()=>{

      handleReport("Pending",0).then((reporterName)=>{
        verifyReportMoved(reporterName.trim(), admin.actionedButton)
      })
    })

})

describe('Job listings', () => {

  beforeEach(() => {
    cy.login(Cypress.env('email'), Cypress.env('password'), { log: false });
  });
  
  function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }
  
  function confirmStats(statPath, expectedCount) {
    cy.intercept('GET', '/jobs').as('getJobs');
  
    cy.visit("http://localhost:5173/admin");
    cy.get(':nth-child(3) > .flex').click(); // Adjust this selector if needed
  
    cy.wait('@getJobs').then((interception) => {
      console.log('Intercepted:', interception);
      const data = interception.response?.body?.data;
    
      expect(response, 'data array should exist').to.exist;
      const actual = data.length;
      expect(actual).to.equal(expectedCount);
    });
  }
  
  it('confirms flagged jobs count', () => {
    confirmStats('length', 33); // Check for 33 flagged jobs
  });
});
















