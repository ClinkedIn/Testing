import { LinkedinNotifications } from "../support/selectors";

describe('Notifications Tests', () => {
    beforeEach(() => {
        cy.login(Cypress.env('email1'), Cypress.env('password1'), { log: false });
        cy.window().then((win) => {
            win.sessionStorage.clear(); // Prevent Cypress from clearing sessionStorage
        });
    });

    //Verify actual api is called in real application
    it.skip('Verify unseen notification count, and persistence with reload', () => {

            cy.get(LinkedinNotifications.notificationBadge,{ timeout: 30000 }).then(($badge) => {
                // If badge exists, get its number; otherwise, default to 0
                const unseenCount = $badge.length > 0 ? parseInt($badge.text().trim()) || 0 : 0;
                cy.log("Unseen notifications before reload:", unseenCount);

                // Reload the page to check persistence
                cy.reload();


                cy.get(LinkedinNotifications.notificationBadge,{ timeout: 30000 }).then(($badge) => {
                    const newUnseenCount = $badge.length > 0 ? parseInt($badge.text().trim()) || 0 : 0;
                    cy.log("Unseen notifications before reload:", unseenCount);
                        expect(newUnseenCount).to.equal(unseenCount); // Ensure persistence
                    });
                });

                // Click to open notifications
                cy.get('li.global-nav__primary-item')
                  .filter(':has(a[href*="linkedin.com/notifications"])')
                  .click();

                // Ensure the notification badge disappears
                cy.get('li.global-nav__primary-item')
                  .filter(':has(a[href*="linkedin.com/notifications"])')
                  .within(() => {
                    cy.get(LinkedinNotifications.notificationBadge).should('not.exist');
                });

                cy.url().then((currentUrl) => {
                    
                    cy.reload();
        
                    cy.url().then((newUrl) => {
                        if (!newUrl.includes('/notifications')) {
                            cy.visit(currentUrl);  // Force navigation back to notifications
                        }
                    });

                cy.get('li.global-nav__primary-item')
                  .filter(':has(a[href*="linkedin.com/notifications"])')
                  .within(() => {
                    cy.get(LinkedinNotifications.notificationBadge).should('not.exist');
                });
            });
    });
});

describe('Verify Notifications Categorization', () => {

        beforeEach(() => {
            cy.login(Cypress.env('email1'), Cypress.env('password1'), { log: false });
            cy.wait(20000)
            cy.get('li.global-nav__primary-item')
            .filter(':has(a[href*="linkedin.com/notifications"])')
            .click();
        });
    
        const categories = {
            'Jobs': ['job', 'hiring', 'position'],
            'My posts': ['liked your post', 'commented on your post', 'shared your post'],
            'Mentions': ['mentioned you']
        };
    
        Object.entries(categories).forEach(([category, keyword]) => {
            it(`should display only ${category} notifications in the ${category} tab`, () => {
                // Click on the category tab
                cy.get('.artdeco-pill-choice-group ember-view nt-pill-list__pill-choice-group')
                .find(`button[aria-label="${category}"]`)
                .click();
    
                // Ensure notifications contain the expected keyword
                cy.get(LinkedinNotifications.card, { timeout: 10000 }).each(($card) => {
                    cy.wrap($card).should('contain.text', keyword);
                });
            });
        });
    
    });
    
      

// This simulates likes and comments by different user, till actual API can be called
//Failed as change isn't reflected

describe('Receive a new notification while open',()=>{

            it.skip('Receive a new notification while open',()=>{
                cy.login(Cypress.env('email2'), Cypress.env('password1'), { log: false });
                cy.wait(20000)
    
                cy.get(LinkedinNotifications.notificationBadge,{ timeout: 30000 }).then(($badge) => {
                    // If badge exists, get its number; otherwise, default to 0
                    const unseenCount = $badge.length > 0 ? parseInt($badge.text().trim()) || 0 : 0;
                    cy.log("Unseen notifications before reload:", unseenCount);
                
                cy.clearCookies();
                cy.clearLocalStorage();
                cy.visit('https://www.linkedin.com/logout');
    
                //login with user B
                cy.wait(20000)
                cy.login(Cypress.env('email1'), Cypress.env('password1'));
                cy.wait(20000)
    
                const profile = "https://www.linkedin.com/in/alia-zayed-00b658322/"; 
                cy.visit(profile);
                cy.get('.atJCHqrEdgUKUwzGBTbpuMHgdFicGDpTyup > .pv-profile-card')
                .find('.feed-shared-social-action-bar')
                .find('button[aria-label="React Like"]') 
                .filter((index, button) => button.getAttribute('tabindex') !== "-1") 
                .click();
    
                cy.wait(3000)
    
                //logout
                cy.clearCookies();
                cy.clearLocalStorage();
                cy.visit('https://www.linkedin.com/logout');
    
                //login with user A
                cy.wait(20000)
                cy.login(Cypress.env('email2'), Cypress.env('password1'));
                cy.wait(20000)
    
                cy.get(LinkedinNotifications.notificationBadge,{ timeout: 30000 }).then(($badge) => {
                    const newUnseenCount = $badge.length > 0 ? parseInt($badge.text().trim()) || 0 : 0;
                    cy.log("Unseen notifications before reload:", unseenCount);
                        expect(newUnseenCount).to.equal(unseenCount+1); // Ensure persistence
                    });
    
                cy.get('li.global-nav__primary-item')
                      .filter(':has(a[href*="linkedin.com/notifications"])')
                      .click();
                // Verify notification for like and comment
                cy.get(LinkedinNotifications.card, { timeout: 30000 })
                .should('contain.text', 'liked your post')
                .and('be.visible');
            
                cy.get(LinkedinNotifications.card, { timeout: 30000 })
                .should('contain.text', 'commented on your post')
                .and('be.visible');
             
    
            })
    
        })
})
