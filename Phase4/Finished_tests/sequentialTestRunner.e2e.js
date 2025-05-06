import JoinPage from '../pageobjects/join.page.js';
import LoginPage from '../pageobjects/LoginPage.js';
import SignupPageFunctions  from '../pageobjects/SignupPageFunctions.js'; 
import * as Utils from '../utils/utils.js'; 


describe('Sequential LinkedIn Tests', () => {

    it('should complete the signup flow until the email error appears', async () => {
        await SignupPageFunctions.signupWithRegisteredEmail(
            'Youssef', 
            'Hammad', 
            'youssefahmed1819@gmail.com', 
            'YoussefAhmed123'
        );

        await restartApp();
       
    });

    /*
    
    it('should show an error for an invalid email during signup', async () => {
        await restartApp();
        await SignupPageFunctions.signupWithInvalidEmail(
            'Youssef',
            'Hammad',
            'invalidEmail'
        );
        await restartApp();
    });


    
    
    
    
    it('should sign up a new user successfully', async () => {
        await SignupPageFunctions.signupSuccessfully(
            'Rawan', 
            'Yasser', 
            'yousseftest1819@gmail.com', 
            'Abdelbar@1312'
        );

        //await restartApp();  // Restart the app after signup
    });
    */
/*
    it('should fail to login with incorrect email', async () => {
        
        
        await LoginPage.login('youssefahmed1819999@gmail.com', 'Abdelbar1312'); // Incorrect password

        // Locate the error message popup
        const errorMessage = await $('//android.widget.TextView[@resource-id="android:id/message"]');
        await expect(errorMessage).toBeDisplayed();  // Verify error popup appears

        const actualText = await errorMessage.getText();
        console.log('Error Message Text:', actualText); // Debugging line
        expect(actualText).toContain('Wrong username or password.');

        // Click "Try Again" button to close the popup
        const tryAgainButton = await $('//android.widget.Button[@resource-id="android:id/button2"]');
        await tryAgainButton.click();


        await restartApp();  // Restart the app after failed login

    });

    it('should fail to login with incorrect password', async () => {
        
        
        await LoginPage.login('youssefahmed1819@gmail.com', 'WrongPassword123'); // Incorrect password

        // Locate the error message popup
        const errorMessage = await $('//android.widget.TextView[@resource-id="android:id/message"]');
        await expect(errorMessage).toBeDisplayed();  // Verify error popup appears

        const actualText = await errorMessage.getText();
        console.log('Error Message Text:', actualText); // Debugging line
        expect(actualText).toContain('Wrong username or password.');

        // Click "Try Again" button to close the popup
        const tryAgainButton = await $('//android.widget.Button[@resource-id="android:id/button2"]');
        await tryAgainButton.click();


        await restartApp();  // Restart the app after failed login

    });

    it('should login with correct email and password', async () => {
        
        await LoginPage.login('youssefahmed1819@gmail.com', 'Abdelbar1312');
        await LoginPage.verifyLoginSuccess();
    });

*/
    

});

