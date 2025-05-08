import { Signup, Login } from '../support/selectors'; 

describe('Successful Signup as an employee',()=>{

    it('Valid signup from homepage',()=>{ 

        cy.visit('http://localhost:5173/')
        cy.get(Signup.joinLink).click()
        cy.url().should('contain','http://localhost:5173/signup') 

        cy.get(Signup.FName).type('Alia')
        cy.get(Signup.LName).type('Tarek')
        cy.Generate_emails().then((email) => {
            cy.get(Signup.Email).type(email); 
        });
        cy.get(Signup.Password).type(Cypress.env('myPassword')) 
        cy.get(Signup.submitMP).click()
 

    })

})

describe('Invalid Signup',()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:5173/')
        cy.get(Signup.joinLink).click()
        cy.url().should('contain','http://localhost:5173/signup') 
    })

    it('Email is already registered',()=>{

        cy.get(Signup.FName).type('Alia')
        cy.get(Signup.LName).type('Tarek')
        cy.get(Signup.Email).type(Cypress.env('myEmail')); 
        cy.get(Signup.Password).type(Cypress.env('myPassword'))
        cy.get(Signup.submitMP).click()
        cy.get(Signup.emailExistsPopup)
        .invoke('text')
        .should('contain',"Oops!")
        cy.url().should('contain','http://localhost:5173/signup') 

    })

    it('Invalid email format',()=>{

        cy.get(Signup.FName).type('Alia')
        cy.get(Signup.LName).type('Tarek')
        cy.get(Signup.Email).type('user.com{enter}');
        cy.get(Signup.Password).type(Cypress.env('myPassword'))
        cy.get(Signup.submitMP).should('be.disabled');
        cy.get(Signup.errorMessage).should('contain', 'Please enter a valid email address.');
        cy.url().should('contain','http://localhost:5173/signup') 

    })

    it('weak password',()=>{

        cy.get(Signup.FName).type('Alia')
        cy.get(Signup.LName).type('Tarek')
        cy.get(Signup.Email).type(Cypress.env('myEmail'));
        cy.get(Signup.Password).type('12345')
        cy.get(Signup.submitMP).should('be.disabled');
        cy.get(Signup.passwordError)
        .invoke('text')
        .should('contain', 'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.');
        cy.url().should('contain','http://localhost:5173/signup') 

    })

    it('Empty fields',()=>{

        //Empty email field
        cy.get(Signup.FName).type('Alia')
        cy.get(Signup.LName).type('Tarek')
        cy.get(Signup.Password).type(Cypress.env('myPassword'),{log: false })
        cy.get(Signup.submitMP).click();
        cy.wait(2000)
        cy.get(Signup.emptyEmail).should('contain', 'Please fill in all fields.');
        cy.get(Signup.passwordError).should('not.exist')
        cy.url().should('contain','http://localhost:5173/signup') 
        cy.reload()

        //Empty password field
        cy.get(Signup.FName).type('Alia')
        cy.get(Signup.LName).type('Tarek')
        cy.get(Signup.Email).type(Cypress.env('myEmail')).blur()
        cy.get(Signup.submitMP).click();
        cy.get(Signup.errorMessage).should('not.exist');
        cy.get(Signup.emptyEmail)
        .should('contain', 'Please fill in all fields.');

        //Both fields are empty
        cy.get(Signup.FName).type('Alia')
        cy.get(Signup.LName).type('Tarek')
        cy.get(Signup.Password).clear()
        cy.get(Signup.Email).clear()
        cy.get(Signup.submitMP).should('be.disabled');
        cy.get(Signup.emptyEmail)
        .should('contain', 'Please fill in all fields.');
        cy.url().should('contain','http://localhost:5173/signup') 
        
    })

    it('Email is too long',()=>{
        
        cy.get(Signup.FName).type('Alia')
        cy.get(Signup.LName).type('Tarek')
        const longEmail = 'a'.repeat(120) + '@example.com';
        cy.get(Signup.Email).type(longEmail); 
        cy.get(Signup.Password).type(Cypress.env('myPassword'))
        cy.get(Signup.submitMP).click()
        cy.get(':nth-child(2) > .go4109123758 > .go2072408551 > .go3958317564').invoke('text')
        .should('contain', 'Oops!');
        cy.url().should('contain','http://localhost:5173/signup') 
        

    })

    it("Sign up via Google", () => { 

        cy.get(Signup.google)
        .click()
        cy.get("#identifierId").type(Cypress.env('myEmail'))

        
      });
    

})



describe('SignIn',()=>{ 
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
        cy.get(Login.signinButton).click()
    });

    it('Valid normal SignIn',()=>{

        cy.url().should('contain','http://localhost:5173/login') 
        cy.get(Login.email).type(Cypress.env('email'))
        cy.get(Login.password).type(Cypress.env('password'),{log: false })
        cy.get(Login.submit).click()
        cy.url().should('contain','http://localhost:5173/feed') 


    })

    //Wrong password (too short or just wrong), right email

    it('invalid normal Signin',(()=>{ 
        
        cy.url().should('contain','http://localhost:5173/login')
        cy.get(Login.email).type(Cypress.env('email'))
        cy.get(Login.password).type("123456@jfl") 
        cy.get(Login.submit).click()
        cy.wait(200)
        cy.get('.go3958317564')
        .invoke('text')
        .should('contain', 'Invalid credentials');
        cy.url().should('contain','http://localhost:5173/login')

    }))

    it('Empty fields',()=>{
    
            //Empty email field
            cy.get(Login.password).type(Cypress.env('password'),{log: false })
            cy.get(Login.submit).click()
            cy.get('.text-red-500')
            .invoke('text')
            .should('contain', 'Email is required');
            cy.url().should('contain','http://localhost:5173/login')
            cy.reload()
    
            //Empty password field
            cy.get(Login.email).type(Cypress.env('email')).blur()
            cy.get(Login.submit).click()
            cy.get(".text-red-500.text-xs.mt-1")
            .invoke('text')
            .should('contain', 'Password is required');
            cy.url().should('contain','http://localhost:5173/login') 
    
            //Both fields are empty
            cy.get(Login.password).clear()
            cy.get(Login.email).clear()
            cy.get(Login.submit).click()
            cy.get('.text-red-500')
            .invoke('text')
            .should('contain', 'Email is required');
            cy.get(".text-red-500.text-xs.mt-1")
            .invoke('text')
            .should('contain', 'Password is required');
            cy.url().should('contain','http://localhost:5173/login')
            
        })

        it('Should lock account after multiple failed login attempts / captcha is triggered', () => {
            for (let i = 0; i < 10; i++) {
                cy.get(Login.email).type(Cypress.env('email'));
                cy.get(Login.password).type('myPassword');
                cy.get(Login.submit).click();

                if (cy.url().should('contain','http://localhost:5173/checkpoint'))
                    break
    
                cy.get('.go3958317564')
                .invoke('text')
                .should('contain', 'Invalid credentials');
            }
            cy.url().should('not.eq','http://localhost:5173/login')
    
        });

        it('Blocks post access without login, redirects back to post after login', () => {
            const jobPostUrl = 'http://localhost:5173/job-board'; 
        
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
            cy.clearLocalStorage();
            cy.reload();
        
            // Verify the user is still logged in
            cy.url().should('include', '/feed');
        });

  })