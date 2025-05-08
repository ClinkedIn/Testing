import { Signup, Login } from '../support/selectors'; 

describe('Successful Signup',()=>{

    it.skip('Valid signup from homepage',()=>{ 

        cy.visit('https://www.linkedin.com/home')
        cy.get(Signup.joinLink).click()
        cy.url().should('contain','www.linkedin.com/signup') 
        
        cy.intercept('POST', '/api/verify-otp', {
            statusCode: 200,
            body: { success: true }
          }).as('mockOtp');
        cy.intercept('POST', 'https://client-api.arkoselabs.com/fc/ca/', {
            statusCode: 200,
            body: { success: true }
        }).as('recaptcha');
        cy.window().then((win) => {
            win.grecaptcha = {
                execute: () => Promise.resolve('mock-token'),
                getResponse: () => 'mock-token'
            };
        });
        cy.Generate_emails().then((email) => {
            cy.get(Signup.Email).type(email); 
        });
        cy.get(Signup.Password).type(Cypress.env('password1')) //show password
        cy.get(Signup.submitMP).click()
       
        cy.url().should('contain','/www.linkedin.com/signup') 
        cy.get(Signup.FName).type('Alia')
        cy.get(Signup.LName).type('Tarek')
        cy.get(Signup.submitName).click()
 

    })

})

describe('Invalid Signup',()=>{
    beforeEach(()=>{
        cy.visit('https://www.linkedin.com/home')
        cy.get(Signup.joinLink).click()
        cy.url().should('contain','www.linkedin.com/signup') 
    })

    it('Email is already registered',()=>{

        cy.get(Signup.Email).type(Cypress.env('email1')); 
        cy.get(Signup.Password).type(Cypress.env('password1'))
        cy.get(Signup.submitMP).click()
        cy.get(Signup.FName).type('Alia')
        cy.get(Signup.LName).type('Tarek')
        cy.get(Signup.submitName).click()
        cy.get(Signup.emailExistsPopup).should('contain',"Someone's already using that email.")
        cy.url().should('contain','www.linkedin.com/signup') 

    })

    it('Invalid email format',()=>{

        cy.get(Signup.Email).type('user.com{enter}');
        cy.get(Signup.Password).type(Cypress.env('password1'))
        cy.get(Signup.submitMP).click()
        cy.get(Signup.Email).closest('div').find(Signup.errorMessage).should('contain', 'Please enter a valid email address.');
        cy.url().should('contain','www.linkedin.com/signup') 

    })

    it('weak password',()=>{

        cy.get(Signup.Email).type(Cypress.env('email1'));
        cy.get(Signup.Password).type('12345')
        cy.get(Signup.submitMP).click()
        cy.get(Signup.Password).closest('div').find(Signup.errorMessage)
        .should('be.visible')
        .and('contain','Password must be 6 characters or more.')
        cy.url().should('contain','www.linkedin.com/signup') 
        cy.get(Signup.Password).clear()
        cy.get(Signup.Password).type('123456')
        cy.get(Signup.submitMP).click()
        cy.get(Signup.Password).closest('div').find(Signup.errorMessage)
        .should('be.visible')
        .and('contain','Please enter a more secure password and use 6 or more characters.')
        cy.url().should('contain','www.linkedin.com/signup') 

    })

    it('Empty fields',()=>{

        //Empty email field
        cy.get(Signup.Password).type(Cypress.env('password1'),{log: false })
        cy.get(Signup.submitMP).click()
        cy.get(Signup.Email).closest('div').find(Signup.errorMessage).should('be.visible')
        .and('contain', 'Please enter your email address.');
        cy.get(Signup.Password).closest('div').find(Signup.errorMessage).should('not.exist')
        cy.url().should('contain','www.linkedin.com/signup') 
        cy.reload()

        //Empty password field
        cy.get(Signup.Email).type(Cypress.env('email1')).blur()
        cy.get(Signup.submitMP).click()
        cy.get(Signup.Password).closest('div').find(Signup.errorMessage).should('be.visible')
        .and('contain','Please enter your password.')
        cy.get(Signup.form).find(Signup.errorMessage)
        .should('not.contain', 'Please enter your email address.');
        cy.url().should('contain','www.linkedin.com/signup') 

        //Both fields are empty
        cy.get(Signup.Password).clear()
        cy.get(Signup.Email).clear()
        cy.get(Signup.submitMP).click()
        cy.get(Signup.Password).closest('div').find(Signup.errorMessage).should('be.visible')
        .and('contain','Please enter your password.')
        cy.get(Signup.form).find(Signup.errorMessage)
        .should('contain', 'Please enter your email address.');
        cy.url().should('contain','www.linkedin.com/signup') 
        
    })

    it('Email is too long',()=>{
        
        const longEmail = 'a'.repeat(120) + '@example.com';
        cy.get(Signup.Email).type(longEmail); 
        cy.get(Signup.Password).type(Cypress.env('password1'))
        cy.get(Signup.submitMP).click()
        cy.get(Signup.Email).closest('div').find(Signup.errorMessage).should('be.visible')
        .and('contain', 'Email must be between 3 to 128 characters.');
        cy.url().should('contain','www.linkedin.com/signup') 

    })

    it("Sign up via Google", () => { 

        cy.get('iframe[title="Sign in with Google Button"]')
        .should("be.visible")
        .then(($iframe) => {
            const $body = $iframe.contents().find("body");
            cy.wrap($body).find('div[role="button"]').click({ force: true });
        });

        cy.origin(
            "https://accounts.google.com/",
            { 
              args: { 
                email: Cypress.env("email1"), 
                password: Cypress.env("password1") ,
                Signup: Signup
              } 
            },
            ({ email, password, Signup }) => {
              cy.visit("https://accounts.google.com/");
              cy.get(Signup.googleEmail).type(email);
              //cy.get(Signup.googleENext).contains('Next').click()
            }
          );
      
        // cy.origin("https://accounts.google.com/v3/signin", () => {
        //   cy.get(Signup.googleEmail).type("testuser@gmail.com{enter}");
        //   cy.get(Signup.googleENext).click()
        // });
    
        // Ensure redirection back to the app
        // cy.url().should("include", "/dashboard");
        // cy.contains("Welcome").should("be.visible");
      });
    

})




