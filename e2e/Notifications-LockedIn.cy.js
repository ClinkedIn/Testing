import { notifications } from "../support/selectors";

describe('Notifications Tests', () => {
    beforeEach(() => {
        cy.login(Cypress.env('email'), Cypress.env('password'), { log: false });
        cy.visit("http://localhost:5173/notifications")
    });

    it('Verify unseen notification count, and persistence with reload', () => {
        //get badge count, count unseen notifications and verify they're equal, reload to ensure persistance

            cy.get(notifications.badgeCount,{ timeout: 30000 }).then(($badge) => {
                // If badge exists, get its number; otherwise, default to 0
                const unseenCount = $badge.length > 0 ? parseInt($badge.text().trim()) || 0 : 0;
                cy.log("Unseen notifications before reload:", unseenCount);

                cy.wait(5000)

                //Count unread notifications in the list
                let unreadCount = 0;
                cy.get(notifications.notificationsCard)
                  .should('exist')
                  .should('be.visible')
                  .each(($card) => {
                    cy.wait(3000)
                    cy.wrap($card)
                      .find(notifications.unread)
                      .should('have.length', unseenCount);
                })
                //Ensure reload persistence  
                cy.reload()
                cy.get(notifications.badgeCount,{ timeout: 30000 }).then(($badge) => {
                    const newUnseenCount = $badge.length > 0 ? parseInt($badge.text().trim()) || 0 : 0;
                        expect(newUnseenCount).to.equal(unseenCount);
                 });
        });
    });
    //understand why looping only got one element

    // **
    it('Mark notification as read',()=>{
        cy.wait(10000)

        cy.get(notifications.notificationsCard)
            .should('exist')
            .should('be.visible')
            .each(($card) => {
            cy.wrap($card)
                .find(notifications.unread)
                .first()
                .click()
                .should("not.exist")

                cy.reload()

                cy.get(notifications.currentUnreadItem)
                .should('not.exist');
            })
        })

        it('Push Notifications',()=>{

            cy.get(notifications.send).click()
            cy.wait(6000)
            cy.get(notifications.pushNotifications)
            .invoke('text')
            .should('contain','New notification received!')

        })

        
        });

