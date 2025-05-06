import { $, browser } from '@wdio/globals';

class SignupPageFunctions {
    // Define element selectors

    get signInPageTitle() { return $('~Locked '); }
    get signInJoinLocedInButton() { return $('~Join lockedIn'); }
    get signupFirstNameField() { return $('android=new UiSelector().className("android.widget.EditText").instance(0)'); }
    get signupLastNameField() { return $('android=new UiSelector().className("android.widget.EditText").instance(1)'); }

    get signupContinueButton() { return $('~Continue'); }


    get signupEmailField() { return $('android=new UiSelector().className("android.widget.EditText")'); }
    get signupPasswordField() { return $('android=new UiSelector().className("android.widget.EditText").instance(1)'); }


    get CodeField() { return $('android=new UiSelector().className("android.widget.EditText")'); }

    get NextButton() { return $('~Next'); }

    get signupWithInvalidEmailMessage() { return $('~❌ Invalid input. Please enter a valid email.'); }


    
    


    async checkIfSignInPageIsDisplayed() {
        try {
            return await this.signInPageTitle.waitForDisplayed({ timeout: 5000 });
        } catch (error) {
            console.error("Not on the Home Page!");
            return false;
        }
    }

    async signupWithValidEmailAndPassword(firstName, lastName, email, password) {
        //check if the sign in page is displayed
        await this.checkIfSignInPageIsDisplayed();
        
        // Click on "Join lockedIn" 
        await this.signInJoinLocedInButton.click();

        // Wait for the email field to be displayed
        await this.signupFirstNameField.waitForDisplayed({ timeout: 5000 });
        await this.signupFirstNameField.click();
        // Enter email
        await this.signupFirstNameField.setValue(firstName);


        await this.signupLastNameField.click();
        await this.signupLastNameField.setValue(lastName);

        //click next button
        await this.signupContinueButton.click();
        
        await this.signupEmailField.waitForDisplayed({ timeout: 5000 });
        await this.signupEmailField.click();
        // Enter email
        await this.signupEmailField.setValue(email);
        
        //click next button
        await this.signupContinueButton.click();

        await this.signupPasswordField.waitForDisplayed({ timeout: 5000 });
        
        await this.signupPasswordField.waitForDisplayed({ timeout: 5000 });
        await this.signupPasswordField.click();
        // Enter email
        await this.signupPasswordField.setValue(password);
        
        //click next button
        await this.signupContinueButton.click();

        await browser.pause(5000);

        //await this.CodeField.waitForDisplayed({ timeout: 5000 });
        await this.CodeField.click();
        await browser.pause(3000);

        await this.NextButton.click();
        await browser.pause(3000);


        await this.NextButton.click();
        
    }



    async signupWithValidEmailAndPassword(firstName, lastName, email, password) {
        //check if the sign in page is displayed
        await this.checkIfSignInPageIsDisplayed();
        
        // Click on "Join lockedIn" 
        await this.signInJoinLocedInButton.click();

        // Wait for the email field to be displayed
        await this.signupFirstNameField.waitForDisplayed({ timeout: 5000 });
        await this.signupFirstNameField.click();
        // Enter email
        await this.signupFirstNameField.setValue(firstName);


        await this.signupLastNameField.click();
        await this.signupLastNameField.setValue(lastName);

        //click next button
        await this.signupContinueButton.click();
        
        await this.signupEmailField.waitForDisplayed({ timeout: 5000 });
        await this.signupEmailField.click();
        // Enter email
        await this.signupEmailField.setValue(email);
        
        //click next button
        await this.signupContinueButton.click();

        await this.signupPasswordField.waitForDisplayed({ timeout: 5000 });
        
        await this.signupPasswordField.waitForDisplayed({ timeout: 5000 });
        await this.signupPasswordField.click();
        // Enter email
        await this.signupPasswordField.setValue(password);
        
        //click next button
        await this.signupContinueButton.click();

        await browser.pause(5000);

        
        
    }



    async signupWithInvalidEmailAndPassword(firstName, lastName,invalidEmail, email, password) {
        //check if the sign in page is displayed
        await this.checkIfSignInPageIsDisplayed();
        
        // Click on "Join lockedIn" 
        await this.signInJoinLocedInButton.click();

        // Wait for the email field to be displayed
        await this.signupFirstNameField.waitForDisplayed({ timeout: 5000 });
        await this.signupFirstNameField.click();
        // Enter email
        await this.signupFirstNameField.setValue(firstName);

        await this.signupLastNameField.click();
        await this.signupLastNameField.setValue(lastName);

        //click next button
        await this.signupContinueButton.click();
        
        await this.signupEmailField.waitForDisplayed({ timeout: 5000 });
        await this.signupEmailField.click();
        // Enter email
        await this.signupEmailField.setValue(invalidEmail);
        
        //click next button
        await this.signupContinueButton.click();

        await this.signupWithInvalidEmailMessage.waitForDisplayed({ timeout: 5000 });

        await browser.pause(1000); 

        await this.signupEmailField.clearValue(invalidEmail);

        await this.signupEmailField.setValue(email);
        
        //click next button
        await this.signupContinueButton.click();


        

        
        await this.signupPasswordField.waitForDisplayed({ timeout: 5000 });
        await this.signupPasswordField.click();
        // Enter email
        await this.signupPasswordField.setValue(password);
        
        //click next button
        await this.signupContinueButton.click();
        
    }


}

export default new SignupPageFunctions();

