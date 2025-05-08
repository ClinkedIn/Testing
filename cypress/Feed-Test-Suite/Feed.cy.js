import { feed } from '../support/selectors';

describe('Feed Test Suite',()=>{
    beforeEach(() => {
                cy.login(Cypress.env('email'), Cypress.env('password'), { log: false });
            });

    it.skip('Create a text post with media',()=>{
        const uploadedImage = 'test-images/bakery.jpg';
        cy.get(feed.createPost).click()
        cy.get(feed.textArea).type("testing posting text and image")
        cy.get(feed.addImage).click()
        cy.get(feed.uploadImage).attachFile(uploadedImage)
        cy.get(feed.postButton).click()
        cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > article:nth-child(2) > div:nth-child(2)")
        .invoke('text')
        .should('eq', 'testing posting text and image');
        cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > article:nth-child(2) > div:nth-child(3) > div:nth-child(1) > img:nth-child(1)')
        .should('exist')
        .and('be.visible');
          
    })

    it.skip('Like a post',()=>{
        let initialCount;

        cy.get( 'body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > article:nth-child(2) > ul:nth-child(4) > li:nth-child(1) > div:nth-child(1) > span:nth-child(2)')
        .invoke('text')
        .then((text) => {
            initialCount = parseInt(text.trim(), 10);

            cy.get(feed.likeButton).click();

            cy.get(feed.likeButton)
             .should('contain', 'Liked')
            cy.wait(1000); 

            // Re-check the count
            cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > article:nth-child(2) > ul:nth-child(4) > li:nth-child(1) > div:nth-child(1) > span:nth-child(2)')
            .invoke('text')
            .then((updatedText) => {
                const updatedCount = parseInt(updatedText.trim(), 10);
                expect(updatedCount).to.eq(initialCount + 1);
            });
        });

     })

     it.skip('Comment on a post',()=>{
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
        cy.get('.text-center.text-gray-500.py-2')
        .should('not.contain.text', 'No comments yet');

     })

     it.skip('Hide Post',()=>{
        cy.get(feed.postMenu).click()
        cy.get(feed.hidePost).click()
        cy.wait(1000)
        cy.get(feed.postToHide ,{ log: false }).should('not.be.visible')

     })

})




// cy.get('article.overflow-visible.p-0.mb-2.bg-white.rounded-md.border-none')
// .first()
// .within(() => {
//     //Check the post text
//     cy.get('.text-base.text-start.p-0.pl-4.pr-4.text-[rgba(0,0,0,0.9)].overflow-hidden')
//     .should('contain.text', 'Expected post content');

//     //Check the post image
//     cy.get('div > div img') 
//     .should('have.attr', 'src')
//     .and('include', 'res.cloudinary.com'); 
// });
