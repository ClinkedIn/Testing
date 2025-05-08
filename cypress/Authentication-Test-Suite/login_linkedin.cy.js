import { Login } from '../support/selectors'; 

describe('SignIn',()=>{ 
    beforeEach(() => {
        cy.visit('https://www.linkedin.com/home')
        cy.get(Login.signinButton).click()
    });

    it('Valid normal SignIn',()=>{

        cy.visit('https://www.linkedin.com/home')
        cy.get(Login.signinButton).click()
        cy.url().should('contain','www.linkedin.com/login') 
        cy.get(Login.email).type(Cypress.env('email1'))
        cy.get(Login.password).type(Cypress.env('password1'),{log: false })
        cy.get(Login.submit).click()
        cy.wait(20000)
        cy.url().should('contain','/www.linkedin.com/feed') 


    })

    //Wrong password (too short or just wrong), right email

    it('invalid normal Signin',(()=>{ 
        
        cy.url().should('contain','www.linkedin.com/login')
        cy.get(Login.email).type(Cypress.env('email1'))
        cy.get(Login.password).type("123456@jfl") 
        cy.get(Login.submit).click()
        cy.wait(20000)

        cy.get(Login.passwordError)
        .invoke('text')
        .then((text) => {
            const cleanedText = text.replace(/\s+/g, ' ').trim();

            expect(cleanedText).to.include.oneOf([
            'Wrong email or password. Try again or create an account .',
            'The password you provided must have at least 6 characters.'
            ]);
        });
        cy.url().should('match', /SignIn|login/i);

    }))

    it('Empty fields',()=>{
    
            //Empty email field
            cy.get(Login.password).type(Cypress.env('password1'),{log: false })
            cy.get(Login.submit).click()
            cy.get(Login.email).closest('div').find(Login.usernameError).should('be.visible')
            .and('contain', 'Please enter an email address or phone number.');
            cy.url().should('contain','www.linkedin.com/login') 
            cy.reload()
    
            //Empty password field
            cy.get(Login.email).type(Cypress.env('email1')).blur()
            cy.get(Login.submit).click()
            cy.get(Login.password).closest('div').find(Login.passwordError).should('be.visible')
            .and('contain','Please enter a password.')
            cy.url().should('contain','www.linkedin.com/login') 
    
            //Both fields are empty
            cy.get(Login.password).clear()
            cy.get(Login.email).clear()
            cy.get(Login.submit).click()
            cy.get(Login.email).closest('div').find(Login.usernameError).should('be.visible')
            .and('contain', 'Please enter an email address or phone number.');
            cy.url().should('contain','www.linkedin.com/login') 
            
        })

        it('Should lock account after multiple failed login attempts / captcha is triggered', () => {
            for (let i = 0; i < 10; i++) {
                cy.get(Login.email).type(Cypress.env('email1'));
                cy.get(Login.password).type('121236472@fF');
                cy.get(Login.submit).click();

                if (cy.url().should('contain','https://www.linkedin.com/checkpoint'))
                    break
                
                cy.wait(20000);
    
                cy.get(Login.passwordError).should('be.visible');
            }
    
        });

        it('Blocks post access without login, redirects back to post after login', () => {
            const jobPostUrl = 'https://www.linkedin.com/posts/dcollinsdata_data-skills-arent-about-knowing-everything-activity-7310124437209522176-5Z7H?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD4JhssBlDkaEFnDk_wOFqDY-oP8QHu5HcM'; 
        
            // visit post without logging in
            cy.visit(jobPostUrl);
        
            cy.get(Login.signinPopUp).click()
        
            // login
            cy.get(Login.emailPopUp).type(Cypress.env('email1'));
            cy.get(Login.passwordPopUp).type(Cypress.env('password1'), { log: false });
            cy.get(Login.submitPopUp).click();
            cy.wait(20000)
        
            // Verify redirection back to the job post
            cy.url().should('contain', 'www.linkedin.com/posts/dcollinsdata_data-skills-arent-about-knowing-everything-activity');
        });

        it.skip('Should retain session with Remember Me checked', () => {
        
            cy.get(Login.email).type(Cypress.env('email1'));
            cy.get(Login.password).type(Cypress.env('password1'), { log: false });
            cy.get(Login.rememberMe).invoke('attr', 'checked').then((checked) => {
                if (!checked) {
                    cy.get(Login.rememberMe).check();
                }
            });
            cy.get(Login.submit).click();
            cy.wait(20000)
      
            cy.url().should('include', '/feed');
        
            // Clear cookies and local storage but not session storage
           // cy.clearCookies();
            cy.clearLocalStorage();
            cy.reload();
        
            // Verify the user is still logged in
            cy.url().should('include', '/feed');
        });

  })
