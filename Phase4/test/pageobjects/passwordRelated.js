import { $, browser } from '@wdio/globals';

class passwordRelated {
    // Define element selectors

    get signInPageTitle() { return $('~Locked '); }
    get sigInForgetPasswordButton() { return $('~Forgot password?'); }
    get forgetPageEmailField() { return $('android=new UiSelector().className("android.widget.EditText")'); }

    get forgetPageEmptyField() { return $('~Field cannot be empty'); }
    get forgetPageInvalidEmail() { return $('~Enter a valid email address or phone number'); }

    get forgetPageFailedtoResetPassword() { return $('~Error: Exception: Failed to reset password'); }

    get forgetPageNextButton() { return $('~Next'); }

    get forgetPageResetOTPisSent() { return $('~Reset password link sent successfully'); }

    get OTP_Field() { return $('android=new UiSelector().className("android.widget.EditText")'); }
    get OTP_NextButton() { return $('~Submit'); }

    get OTP_sendSuccessfully() { return $('~Verification code sent successfully, please check your email'); }

    get OTP_VerificationSuccessfully() { return $('~Verification successful'); }


    get FirstPasswordField() { return $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText[1]'); }
    get SecondPasswordField() { return $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText[2]'); }

    get SubmitButton() { return $('~Submit'); }







    async checkIfSignInPageIsDisplayed() {
        try {
            return await this.signInPageTitle.waitForDisplayed({ timeout: 5000 });
        } catch (error) {
            console.error("Not on the Home Page!");
            return false;
        }
    }


    async ForgetPasswordWithValidEmail(email , newPassword) {
        
        //check if the sign in page is displayed
        await this.checkIfSignInPageIsDisplayed();
        
        // Click on "Forgot password?" 
        await this.sigInForgetPasswordButton.click();

        // Wait for the email field to be displayed
        await this.forgetPageEmailField.waitForDisplayed({ timeout: 5000 });
        await this.forgetPageEmailField.click();
        // Enter email
        await this.forgetPageEmailField.setValue(email);

        //click next button
        await this.forgetPageNextButton.click();
        // Check for success message
        try {
            await this.OTP_sendSuccessfully.waitForDisplayed({ timeout: 5000 });
            //return true;
        } catch (error) {
            console.error("Reset password link not sent successfully.");
            return false;
        }

        await browser.pause(10000);
        await browser.waitUntil(async () => {
            const value = await this.OTP_Field.getText();
            return value.length === 6;
        }, {
            timeout: 10000, // maximum wait time in milliseconds
            timeoutMsg: 'Expected OTP field to have 6 characters'
        });
        
        // Once the condition is satisfied, click the Submit button
        await this.OTP_NextButton.click();

        await this.OTP_VerificationSuccessfully.waitForDisplayed({ timeout: 5000 });

        await this.FirstPasswordField.waitForDisplayed({ timeout: 5000 });
        await this.FirstPasswordField.click();
        // Enter password
        await this.FirstPasswordField.setValue(newPassword);

        await this.SecondPasswordField.click();
        // Enter password
        await this.SecondPasswordField.setValue(newPassword);


        await this.SubmitButton.click();
        // Check for success message




    }




    async ForgetPasswordWithInvalidEmail(email) {
        
        //check if the sign in page is displayed
        await this.checkIfSignInPageIsDisplayed();
        
        // Click on "Forgot password?" 
        await this.sigInForgetPasswordButton.click();

        // Wait for the email field to be displayed
        await this.forgetPageEmailField.waitForDisplayed({ timeout: 5000 });
        await this.forgetPageEmailField.click();
        // Enter email
        await this.forgetPageEmailField.setValue(email);

        //click next button
        await this.forgetPageNextButton.click();

        // Check for error message
        try {
            await this.forgetPageInvalidEmail.waitForDisplayed({ timeout: 5000 });
            return true;
        } catch (error) {
            console.error("Error message not displayed for invalid email.");
            return false;
        }
    }


    async ForgetPasswordWithEmptyEmailField(email , wrongEmail) {
        
        //check if the sign in page is displayed
        await this.checkIfSignInPageIsDisplayed();
        
        // Click on "Forgot password?" 
        await this.sigInForgetPasswordButton.click();

        // Wait for the email field to be displayed
        await this.forgetPageNextButton.waitForDisplayed({ timeout: 5000 });
        
        //click next button
        await this.forgetPageNextButton.click();

        // Check for error message
        try {
            await this.forgetPageEmptyField.waitForDisplayed({ timeout: 5000 });
            
        } catch (error) {
            console.error("Error message not displayed for invalid email.");
            
        }

        await browser.pause(1000); 

        // Wait for the email field to be displayed
        await this.forgetPageEmailField.waitForDisplayed({ timeout: 5000 });
        await this.forgetPageEmailField.click();

        // Enter email
        await this.forgetPageEmailField.setValue(email);

        //click next button
        await this.forgetPageNextButton.click();

        // Check for error message
        try {
            await this.forgetPageInvalidEmail.waitForDisplayed({ timeout: 5000 });
  
        } catch (error) {
            console.error("Error message not displayed for invalid email.");
            
        }

        await browser.pause(1000); 

        await this.forgetPageEmailField.click();
        await this.forgetPageEmailField.clearValue(); // Clear the email field

        // Enter email
        await this.forgetPageEmailField.setValue(wrongEmail);

        //click next button
        await this.forgetPageNextButton.click();

        // Check for error message
        try {
            await this.forgetPageFailedtoResetPassword.waitForDisplayed({ timeout: 5000 });
  
        } catch (error) {
            console.error("Error message not displayed for invalid email.");
            
        }

    }
}


export default new passwordRelated();
