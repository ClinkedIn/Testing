import { feed } from '../support/selectors';

describe('Feed Test Suite',()=>{
    beforeEach(() => {
        cy.loginLive('Sidney55@gmail.com', 'password123', { log: false });
        cy.wait(3000)
    });

    it.skip('Edit post',()=>{
        cy.loginLive(Cypress.env('email'), Cypress.env('password'), { log: false });
        cy.wait(3000)
        cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > article:nth-child(2) > div:nth-child(1) > div:nth-child(3) > button:nth-child(1)').click()
        cy.get('body div div div div div div div div li:nth-child(2)').click()
        cy.wait(2000)
        cy.get(".w-full.border.rounded.p-2.mb-2").type('edited')
        cy.get(".bg-blue-600.text-white.px-4.py-1.rounded").click()
        cy.get(':nth-child(2) > .pl-4').invoke('text').should('contain','edited')
     })

     it('save post for later',()=>{
        const text=cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > article:nth-child(2) > div:nth-child(1) > div:nth-child(3) > button:nth-child(1)').invoke('text')
        cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > article:nth-child(2) > div:nth-child(1) > div:nth-child(2) > button:nth-child(1)').click()
        cy.get('body div div div div div div div div li:nth-child(3)').click()
        cy.get("button[class='flex items-center text-xs text-[rgba(0,0,0,0.6)] font-semibold p-3 hover:bg-[rgba(0,0,0,0.08)] w-full text-left']").click()
        cy.wait(3000)
        cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > article:nth-child(2) > div:nth-child(2)').should('have.text','save for later')

     })

     it('Repost',()=>{
        const text=cy.get(':nth-child(2) > .pl-4').invoke('text')
        cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > article:nth-child(2) > div:nth-child(5) > button:nth-child(3)').click()
        cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > article:nth-child(2) > div:nth-child(1) > div:nth-child(2)').should('be.visible')
        // cy.visit('https://www.lockedin-cufe.me/profile')
        // cy.wait(3000)
        // cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(6) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3)').should('have.text',text)
     })

     it.skip('Delete',()=>{
        const text=cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > article:nth-child(2) > div:nth-child(2)").invoke('text')
        cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > article:nth-child(2) > div:nth-child(1) > div:nth-child(2) > button:nth-child(1)').click()
        cy.get("li[class='px-4 py-2 hover:bg-[rgba(0,0,0,0.05)] cursor-pointer flex items-center text-red-600']").click()
        cy.on('window:confirm', (text) => {
            return true; // Clicks "OK"
          });
        cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > article:nth-child(2) > div:nth-child(2)").should('not.contain',text)
     })



    it('Create a text post with image(s)',()=>{  
        const uploadedImage = 'test-images/bakery.jpg';
        const uploadedImage2 = 'test-images/bakery.jpg';
        cy.get(feed.createPost).click()
        cy.wait(4000)
        cy.get(feed.textArea).type("testing posting text and image")
        cy.get(feed.addImage).click()
        cy.get(feed.uploadImage).attachFile(uploadedImage)
        cy.get(feed.uploadImage).attachFile(uploadedImage2)
        cy.get(feed.postButton).click()
        cy.wait(5000)
        cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > article:nth-child(2) > div:nth-child(2)")
        .invoke('text')
        .should('eq', 'testing posting text and image');
        cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > article:nth-child(2) > div:nth-child(3) > div:nth-child(1) > img:nth-child(1)')
        .should('exist')
        .and('be.visible');
          
    })

    it('Like a post',()=>{  
        let initialCount;

        cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > article:nth-child(2) > ul:nth-child(3) > li:nth-child(1) > div:nth-child(1) > span:nth-child(2)')
        .invoke('text')
        .then((text) => {
            initialCount = parseInt(text.trim(), 10);

            cy.get(feed.likeButton).click();

            cy.get(feed.likeButton)
             .should('contain', 'Liked')
            cy.wait(1000); 

           
            cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > article:nth-child(2) > ul:nth-child(3) > li:nth-child(1) > div:nth-child(1) > span:nth-child(2)')
            .invoke('text')
            .then((updatedText) => {
                const updatedCount = parseInt(updatedText.trim(), 10);
                expect(updatedCount).to.eq(initialCount + 1);
            });
            cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > article:nth-child(2) > ul:nth-child(3) > li:nth-child(1) > div:nth-child(1) > span:nth-child(2)').click()
            cy.get(feed.likedPopup).should('be.visible')
        });

     })

     it('post a document',()=>{
        const uploadeddoc = 'test-images/Web test report-Sheet1.pdf';
        cy.get(feed.createPost).click()
        cy.wait(4000)
        cy.get(feed.textArea).type("testing posting doc")
        cy.get(feed.postDoc).click()
        cy.get(feed.uploadImage).attachFile(uploadeddoc)
        cy.get(feed.postButton).click()
        cy.wait(5000)
        cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > article:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1)').should('be.visible')
     })

     it('Comment on a post',()=>{  
        let initialCount;
        const uploadedImage = 'test-images/bakery.jpg';
        cy.get(feed.commentCount)
        .invoke('text')
        .then((text) => {
            initialCount = parseInt(text.trim(), 10);

            cy.get(feed.commentButton).click()
            cy.get(feed.commentTextArea).type("test comment")
            cy.get(feed.imagetoComment).click()
            cy.get(feed.uploadImage).attachFile(uploadedImage)
            cy.get(feed.postComment).click()
            cy.wait(1000); 
            // Re-check the count
            cy.get(feed.commentCount)
            .invoke('text')
            .then((updatedText) => {
                const updatedCount = parseInt(updatedText.trim(), 10);
                expect(updatedCount).to.eq(initialCount + 1);
            });
        });
      
        cy.get(feed.likeComment)
        .first()
        .click()
        cy.wait(4000)
        cy.get('[title="Like"]{enter}').click()
        cy.wait(3000)
        cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > article:nth-child(2) > div:nth-child(6) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > span:nth-child(2)').should('have.text','1')

     })

     it('Hide Post',()=>{  
        cy.get(feed.postMenu).click()
        cy.get(feed.hidePost).click()
        cy.wait(1000)
        cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > article:nth-child(2) > div:nth-child(2)' ,{ log: false }).should('not.be.visible')

     })

})




