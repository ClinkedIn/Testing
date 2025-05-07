import { notifications } from "../support/selectors";

describe('Notifications Tests', () => {
    beforeEach(() => {
        cy.login(Cypress.env('email'), Cypress.env('password'), { log: false });
        cy.get(notifications.notificationsIcon).click()
    });

    it.skip('Verify unseen notification count, and persistence with reload', () => {
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
    it.skip('Mark notification as read',()=>{
        cy.wait(5000)

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

        it.skip('Push Notifications',()=>{

            cy.get(notifications.send).click()
            cy.wait(4000)
            cy.get(notifications.pushNotifications)
            .invoke('text')
            .should('contain','New notification received!')

        })

        it('Verify notification categorization',()=>{

            cy.get(notifications.jobsTab).click()
            // Ensure notifications contain the expected keyword
            cy.get(notifications.notificationsCard, { timeout: 10000 }).each(($card) => {
                cy.wrap($card).should('contain.text', "Job");
            });
        });
        });

