// Page Object File: LinkedInLoginPage.js
import { $, browser } from '@wdio/globals';

class SignInPageFunctions {

    //signIn page elements
    get signInPageTitle() { return $('~Locked '); }
    get signInJoinLocedInButton() { return $('~Join lockedIn'); }
    get signInEmailField() { return $('android=new UiSelector().className("android.widget.EditText").instance(0)'); }
    get signInPasswordField() { return $('android=new UiSelector().className("android.widget.EditText").instance(1)'); }
    get sigInForgetPasswordButton() { return $('~Forgot password?'); }
    get signInButton() { return $('//android.widget.Button[@content-desc="Sign in"]'); }
    get signInUsingGoogleButton() { return $('~Sign in with Google'); }


    //Home Page elements
    get signInUserIcon() { return $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.Button[1]'); }
    get homePageProfileIcon() { return $('android=new UiSelector().className("android.widget.Button").instance(0)'); }
    get homePageSetting() { return $('android=new UiSelector().className("android.widget.Button").instance(2)'); }

    //inside settings page
    get settingPageUpdateEmail() { return $('android=new UiSelector().description("Update Email")'); }
    get settingPageChangePassword() { return $('android=new UiSelector().description("Update Password")'); }
    get settingPageSignOut() { return $('android=new UiSelector().description("Sign Out")'); }
    get settingPageDeleteAccount() { return $('android=new UiSelector().description("Delete Account")'); }

    //update password page elements
    get updatePasswordPageTitle() { return $('~Change Password'); }

    get updatePasswordPageCurrentPasswordField() { return $('android=new UiSelector().className("android.widget.EditText").instance(0)'); }
    get updatePasswordPageNewPasswordField() { return $('android=new UiSelector().className("android.widget.EditText").instance(1)'); }
    get updatePasswordPageConfirmNewPasswordField() { return $('android=new UiSelector().className("android.widget.EditText").instance(2)'); }
    get updatePasswordPageViewCurrentPasswordField() { return $('android=new UiSelector().className("android.widget.Button").instance(3)'); }
    get updatePasswordPageViewNewPasswordField() { return $('android=new UiSelector().className("android.widget.Button").instance(4)'); }
    get updatePasswordPageViewConfirmNewPasswordField() { return $('android=new UiSelector().className("android.widget.Button").instance(5)'); }

    get updatePasswordPageSaveButton() { return $('~Save Password'); }
    get updatePasswordPageSuccessMessage() { return $('~✅ Password changed successfully'); }
    get updatePasswordPageInvalidMessage() { return $('~Failed to update password'); }
    get updatePasswordPageErrorMessage() { return $('~❌ Error changing password'); }




    
    
    async checkIfSignInPageIsDisplayed() {
        try {
            return await this.signInPageTitle.waitForDisplayed({ timeout: 5000 });
        } catch (error) {
            console.error("Not on the Home Page!");
            return false;
        }
    }

    

    


    

    
    async loginSuccessfully(email, password) {
        
        
        // Enter credentials
        await this.signInEmailField.click();
        
        
        await this.signInEmailField.setValue(email);
        await this.signInPasswordField.click();
        await this.signInPasswordField.setValue(password);

        /*
        const isKeyboardShown = await driver.isKeyboardShown();
        if (isKeyboardShown) {
            await driver.hideKeyboard();
        } */      
        
        // Submit login form
        await this.signInButton.click();
        
        
       

        try {
            // Verify login success
            await this.signInUserIcon.waitForDisplayed({ timeout: 5000 });
            return true;
            
        } catch (error) {
            console.error("Login failed or user icon not found.");
            return false;
        }
        
    }



    async loginWithWrongEmailOrPassword(email, password) {
        
        
        // Handle autofill popup
        await this.signInEmailField.click();
        
        // Enter credentials
        await this.signInEmailField.setValue(email);
        await this.signInPasswordField.click();
        await this.signInPasswordField.setValue(password);

        /*
        const isKeyboardShown = await driver.isKeyboardShown();
        if (isKeyboardShown) {
            await driver.hideKeyboard();
        }     
            */  
        
        // Submit login form
        await this.signInButton.click();
        
        
       

        await browser.pause(3000);  // Wait for 3 seconds


        try {
            // Check if user is still on the sign-in page (sign-in title displayed)
            const isSignInPage = await this.signInPageTitle.waitForDisplayed({ timeout: 5000 });
            if (isSignInPage) {
                console.log("User is still on the sign-in page.");
                return false; // User is still on the sign-in page 
            }
        } catch (error) {
            console.log("Unable to verify sign-in page title.");
        }

        try {
            // Check if user is redirected to home page 
            const isHomePage = await this.signInUserIcon.waitForDisplayed({ timeout: 5000 });
            if (isHomePage) {
                console.log("User is logged in and on the home page.");
                return true; // User is logged in
            }
        } catch (error) {
            console.log("User is not on the home page, checking if still on sign-in page...");
        }
        
    }




    async signOutSuccessfully() {
        
        
        await this.homePageSetting.click();
        
        // Enter credentials
        await browser.pause(500);
        await this.settingPageSignOut.click();
        await browser.pause(1000);  
             
        
        await this.checkIfSignInPageIsDisplayed();
        
    }

    async resetPasswordSuccessfully(currentPassword , newPassword) {
        await this.homePageSetting.click();
        
        //click on change password
        await this.settingPageChangePassword.waitForDisplayed({ timeout: 5000 });
        await this.settingPageChangePassword.click();

        //wait for change password page to be displayed
        await this.updatePasswordPageTitle.waitForDisplayed({ timeout: 5000 });
        //fill the current password field
        await this.updatePasswordPageCurrentPasswordField.click();
        await this.updatePasswordPageCurrentPasswordField.setValue(currentPassword);
        await this.updatePasswordPageViewCurrentPasswordField.click();
        //fill the new password field
        await this.updatePasswordPageNewPasswordField.click();
        await this.updatePasswordPageNewPasswordField.setValue(newPassword);
        await this.updatePasswordPageViewNewPasswordField.click();
        //fill the confirm new password field
        await this.updatePasswordPageConfirmNewPasswordField.click();
        await this.updatePasswordPageConfirmNewPasswordField.setValue(newPassword);
        await this.updatePasswordPageViewConfirmNewPasswordField.click();

        //click on save button
        await this.updatePasswordPageSaveButton.click();

        //wait for success message to be displayed
        await this.updatePasswordPageSuccessMessage.waitForDisplayed({ timeout: 5000 });
 
    }


    async resetPasswordAllCases(correctCurrentPassword , wrongCurrentPassword , newPassword , invalidNewPassword) {
        await this.homePageSetting.click();
        
        //click on change password
        await this.settingPageChangePassword.waitForDisplayed({ timeout: 5000 });
        await this.settingPageChangePassword.click();

        //wait for change password page to be displayed
        await this.updatePasswordPageTitle.waitForDisplayed({ timeout: 5000 });
        //fill the current password field
        await this.updatePasswordPageCurrentPasswordField.click();
        await this.updatePasswordPageCurrentPasswordField.setValue(wrongCurrentPassword);
        await this.updatePasswordPageViewCurrentPasswordField.click();
        //fill the new password field
        await this.updatePasswordPageNewPasswordField.click();
        await this.updatePasswordPageNewPasswordField.setValue(newPassword);
        await this.updatePasswordPageViewNewPasswordField.click();
        //fill the confirm new password field
        await this.updatePasswordPageConfirmNewPasswordField.click();
        await this.updatePasswordPageConfirmNewPasswordField.setValue(newPassword);
        await this.updatePasswordPageViewConfirmNewPasswordField.click();

        //click on save button
        await this.updatePasswordPageSaveButton.click();

        // Handle result messages
        await this.updatePasswordPageInvalidMessage.waitForDisplayed({ timeout: 3000 });
                 


         await browser.pause(1000);  
        //fill the current password field
        await this.updatePasswordPageCurrentPasswordField.click();
        await this.updatePasswordPageCurrentPasswordField.clearValue();
        await this.updatePasswordPageCurrentPasswordField.setValue(correctCurrentPassword);
        //fill the new password field
        await this.updatePasswordPageNewPasswordField.click();
        await this.updatePasswordPageNewPasswordField.clearValue();
        await this.updatePasswordPageNewPasswordField.setValue(invalidNewPassword);
        //fill the confirm new password field
        await this.updatePasswordPageConfirmNewPasswordField.click();
        await this.updatePasswordPageConfirmNewPasswordField.clearValue();
        await this.updatePasswordPageConfirmNewPasswordField.setValue(invalidNewPassword);
        //click on save button
        await this.updatePasswordPageSaveButton.click();
        // Handle result messages
        
        await this.updatePasswordPageInvalidMessage.waitForDisplayed({ timeout: 3000 });


             
        await browser.pause(1000); 
        //fill the current password field
        await this.updatePasswordPageCurrentPasswordField.click();
        await this.updatePasswordPageCurrentPasswordField.clearValue();
        await this.updatePasswordPageCurrentPasswordField.setValue(correctCurrentPassword);
        //fill the new password field
        await this.updatePasswordPageNewPasswordField.click();
        await this.updatePasswordPageNewPasswordField.clearValue();
        await this.updatePasswordPageNewPasswordField.setValue(newPassword);
        //fill the confirm new password field
        await this.updatePasswordPageConfirmNewPasswordField.click();
        await this.updatePasswordPageConfirmNewPasswordField.clearValue();
        await this.updatePasswordPageConfirmNewPasswordField.setValue(newPassword);
        //click on save button
        await this.updatePasswordPageSaveButton.click();
        // Handle result messages
        
        await this.updatePasswordPageSuccessMessage.waitForDisplayed({ timeout: 5000 });
            
        
         
    
    }





}

export default new SignInPageFunctions();
