import { messaging } from '../support/selectors';

describe('Messaging Test suite',()=>{
    beforeEach(() => {
        cy.login(Cypress.env('email'), Cypress.env('password'), { log: false });
        cy.get(messaging.messagingIcon).click()
    });

    it.skip('Send private messages to connections',()=>{
        
        cy.get(messaging.searchConnections).type("Ibrahim Muhammed")
        cy.get(messaging.connectionSuggestions).contains('Ibrahim Muhammed').click();
        cy.get(messaging.textArea).type('test')
        cy.get(messaging.sendMessage).click()
        cy.wait(20000)
        cy.get(messaging.messageList)
        .children()
        .last()
        .should('exist')
        .should('be.visible')
        // .find('div > div > div> p') // More flexible path
        // .should('contain.text', 'test');
        // check it's visible in both, come up with a new testcase since it passes
        cy.get(messaging.lastMessage)
        .should('contain.text','You: test')
        cy.get(messaging.newChat1)
        .should('be.visible')
        .should('contain.text', 'Ibrahim Muhammed');

        cy.reload()
        cy.get(messaging.messageList)
        .children()
        .last()
        .should('exist')
        .should('be.visible')
        cy.get(messaging.lastMessage)
        .should('contain.text','You: test')
        cy.get(messaging.newChat1)
        .should('be.visible')
        .should('contain.text', 'Ibrahim Muhammed');




    })

    it.skip('Send message to another connection (multiple chats)',()=>{

        cy.get(messaging.searchConnections).type("Ali Abdelghani")
        cy.get(messaging.connectionSuggestions).contains('Ali Abdelghani').click();
        cy.get(messaging.textArea).type('test')
        cy.get(messaging.sendMessage).click()
        cy.wait(20000)
        cy.get(messaging.newChat1)
        .should('be.visible')
        .should('contain.text', 'Ibrahim Muhammed');  //only allows 1 so can't test for both rn

    })

    it.skip('Mark notification as unread',()=>{

        cy.get(messaging.firstchat).click()
        cy.get(messaging.dots).click()
        cy.get(messaging.markasUnread).click()
        cy.get(messaging.unreadIcon)
        .should('be.visible')

    })

    it('Block messages from users with existing conversations',()=>{

        cy.get(messaging.firstchat).click()
        cy.get(messaging.blockOldUser).click()
        cy.get(messaging.blockText)
        .should('be.visible')
        .should('contain.text',"You have blocked Ibrahim Muhammed. You can't send or receive messages.")
        cy.get(messaging.unblock).click()
        cy.get(messaging.textArea)
        .should('be.visible')
        .type("user unblocked")

    })

    it('Block messages from users with no existing conversations',()=>{

        cy.get(messaging.searchConnections).type("Ali Abdelghani")
        cy.get(messaging.connectionSuggestions).contains('Ali Abdelghani').click();
        cy.get(messaging.blockNew).click()

    })

})