import { notifications } from '../support/selectors'; 

describe('Notifications module, mark as read',()=>{
    
    it('Mark a notification as read test',()=>{
       
        cy.visit('http://localhost:5173/notifications'); 

        cy.get(notifications.notifications_card).then(($notifications) => {
          const count = $notifications.length;
          if (count > 0) {
            Cypress._.times(count, (index) => {
    
              cy.get(notifications.notifications_card).children().eq(index).within(() => {
                cy.get(notifications.read_icon).should('be.visible'); 
                cy.root().click(); 
              });
              //validate url
              cy.go('back'); 
              
              cy.get(notifications.notifications_card).children().eq(index).within(() => {
                cy.get(notifications.read_icon).should('not.exist'); // Ensure notification is marked as read
              });
              cy.reload();

              cy.get(notifications.notifications_card).children().eq(index).within(() => {
                cy.get(notifications.read_icon).should('not.exist'); 
              });
            });
        }
      });
        
    })


  })
