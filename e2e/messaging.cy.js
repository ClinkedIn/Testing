import { messaging, company } from '../support/selectors';

describe('Messaging Test suite',()=>{
    beforeEach(() => {
        cy.loginLive(Cypress.env('email'), Cypress.env('password'), { log: false });
        cy.wait(3000)
        cy.get(messaging.messagingIcon).click()
    });

    it.skip('Send private messages to connections',()=>{ 
        
        cy.get(messaging.searchConnections).type("Mariana")
        cy.wait(5000)
        cy.get(messaging.connectionSuggestions).contains('Mariana Thompson').click();
        cy.get(messaging.textArea).type('test')
        cy.get(messaging.sendMessage).click()
        cy.wait(4000)
        cy.get(messaging.messageList)
        
        .last()
        .should('exist')
        .should('be.visible')
       
        cy.get(messaging.lastMessage)
        .should('contain.text','You: test')
        cy.get(messaging.newChat1)
        .should('be.visible')
        .should('contain.text', 'Mariana Thompson');

       

    })

    it.skip('Send message to another user (multiple chats)',()=>{  
        cy.wait(2000)
        cy.get(messaging.searchConnections).type("youssef")
        cy.wait(3000)
        cy.get(messaging.connectionSuggestions).contains('youssef ahmed').click();
        cy.wait(3000)
        cy.get(messaging.textArea).type('test')
        cy.get(messaging.sendMessage).click()
        cy.wait(2000)
        cy.get(messaging.messageList)
        .last()
        .should('exist')
        .should('be.visible')
        cy.get(messaging.lastMessage)
        .should('contain.text','You: test')
        cy.get(messaging.newChat1)
        .should('be.visible')
        .should('contain.text', 'youssef ahmed');  

    })

    it.skip('Mark notification as unread',()=>{ 
        
        cy.loginLive('Sidney55@gmail.com', 'password123', { log: false });
        cy.get(messaging.messagingIcon).click()
        cy.wait(6000)
        cy.get(messaging.dots)
        .first()
        .click()
        cy.get(messaging.markasUnread)
        .click()
        cy.get(messaging.unreadIcon)
        .should('be.visible')
        cy.get(messaging.firstchat)
        .first()
        .click()

    })

    it.skip('Block messages from users with existing conversations',()=>{ 

        cy.loginLive('Sidney55@gmail.com', 'password123', { log: false });
        cy.get(messaging.messagingIcon).click()
        cy.wait(6000)
        cy.get(messaging.firstchat)
        .first()
        .click()
        cy.get(messaging.blockOldUser).click()
        cy.get(messaging.blockText)
        .should('be.visible')
        .should('contain.text',"You have blocked Leonel Schuppe. You can't send or receive messages.")
        cy.get(messaging.unblock).click()
        cy.get(messaging.textArea)
        .should('be.visible')
        .type("user unblocked")

    })

    it.skip('Block messages from users with no existing conversations',()=>{  

        cy.loginLive('Sidney55@gmail.com', 'password123', { log: false });
        cy.get(messaging.messagingIcon).click()
        cy.wait(6000)
        cy.get(messaging.searchConnections).type("youssef")
        cy.wait(3000)
        cy.get(messaging.connectionSuggestions).contains('youssef ahmed').click();
        cy.wait(3000)
        cy.get(messaging.blockNew).click()

    })

    it('Send media in messages',()=>{  
        
        cy.loginLive('Sidney55@gmail.com', 'password123', { log: false });
        cy.get(messaging.messagingIcon).click()
        cy.wait(6000)
        cy.get(messaging.firstchat)
        .first()
        .click()
        cy.get(messaging.attachFile).click()
        const uploadedImage = 'test-images/bakery.jpg';
        cy.get(company.uploadImage).attachFile(uploadedImage);
        cy.get(messaging.sendMessage).click()
        cy.wait(6000)
        cy.get(messaging.messageHistory)
        .last()
        .should('be.visible')

    })


})