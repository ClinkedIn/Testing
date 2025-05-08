
import SignInPageFunctions from '../pageobjects/SignInPageFunctions.js';
import editProfile from '../pageobjects/editProfile.js';
import posts from '../pageobjects/posts.js';
//import { restartApp }  from '../utils';
import passwordRelated from '../pageobjects/passwordRelated.js';
import SignupPageFunctions from '../pageobjects/SignupPageFunctions.js';

describe('Sequential LinkedIn Tests', () => {

    

    /*
    it('Sign up with valid email and password', async () => {
        await SignupPageFunctions.signupWithValidEmailAndPassword(
            'youssef',
            'hammad',
            'youssef.hammadd333@gmail.com',
            'Abdelbar123'
        );
        await browser.pause(2000);
    });
    */



    /*
    it('Sign up with invalid email', async () => {

        await SignupPageFunctions.signupWithInvalidEmailAndPassword(
            'youssef',
            'ahmed',
            'youssefahmed@hot,co',
            'youssef.hammadd03@gmail.com',
            'Aa12345678');

        
        
        await browser.pause(2000);
    });
    */

/*
    it('Sign in with valid email and password', async () => {

        await SignInPageFunctions.loginSuccessfully(
            'Sidney55@gmail.com',
            'password123'
        );

        
        
        await browser.pause(2000);
    });
    */

    /*
    it('Sign in with invalid email', async () => {

        await SignInPageFunctions.loginWithWrongEmailOrPassword(
            'Sidney55@gmail.com',
            'password1234'
        );

        
        
        await browser.pause(2000);
    });
    */


    /*
    it('Sign in with valid email and password and sign out successfully', async () => {

        await SignInPageFunctions.loginSuccessfully(
            'Sidney55@gmail.com',
            'password123'
        );

        
        await browser.pause(1000);
        await SignInPageFunctions.resetPasswordAllCases('password123', 'password1234', 'Abdelbar@123123' , '12345678');
        await browser.pause(2000);
    });
    */

    /*
    it('Trying Forgeting password', async () => {

        await passwordRelated.ForgetPasswordWithValidEmail(
            'youssef.hammadd03@gmail.com',
            'Password123'
        );

        /*await SignInPageFunctions.loginSuccessfully(
            'youssef.hammadd03@gmail.com',
            'Password123'
        );
        
        
    });
    */



    /*signupWithValidEmailAndPassword
    it('test posing with image', async () => {
        await posts.addPostSuccessfullyWithStates('test posting for my connections only', false );
        await browser.pause(2000);

        //await posts.navigateToPostsPage();
        
        await posts.scroll(400, 400, 400, 1400);
        await browser.pause(2000);
    });*/

    /*
    it('test commenting on post', async () => {
        await posts.commentPostUnsuccessfully('test comment on my post');
        await browser.pause(2000);
    
    });
    */

    /*
   it('add comment to post successfully', async () => {
        await posts.scroll(400, 2140, 400, 250);
        await browser.pause(100);
        await posts.scroll(400, 2100, 400, 1100);
        await browser.pause(100);
       
        await posts.commentPostSuccessfully('test comment on my post' , " hello youssef");
        await browser.pause(2000);
    });
    */

    /*
    it('should sign up with valid email and password', async () => {

        await SignupPageFunctions.signupWithInvalidEmailAndPassword(
            'youssef',
            'ahmed',
            'youssefahmed@hot,co',
            'youssefahmed1819@hotmail.com',
            'Aa12345678'
        );

        await browser.pause(2000);

        await SignupPageFunctions.checkIfSignInPageIsDisplayed();
        //await restartApp();

    });
    */

    /*
    it('Forget My password with valid email', async () => {
            await passwordRelated.ForgetPasswordWithValidEmail(
                'Porter.Hodkiewicz@hotmail.com'
            );

            await browser.pause(2000);

            await passwordRelated.checkIfSignInPageIsDisplayed();
            //await restartApp();
    });
    */

    /*
    it('should log in successfully', async () => {
        await browser.pause(500);
        await LinkedInLoginPage.checkIfSignInPageIsDisplayed();
        await browser.pause(500);
        await LinkedInLoginPage.loginSuccessfully('youssefahmed1819@gmail.com', 'Passwordd1');
        await browser.pause(3000);
    });
    
    
   

    it('should sign out successfully', async () => {
        await browser.pause(500);
        await LinkedInLoginPage.signOutSuccessfully();
        
    });

    it('should log in successfully', async () => {
        await LinkedInLoginPage.checkIfSignInPageIsDisplayed();
        await browser.pause(500);
        await LinkedInLoginPage.loginSuccessfully('Porter.Hodkiewicz@hotmail.com', 'Aa12345678');
        await browser.pause(500);
    });
    */

    /*

    it('update password successfully', async () => {
        await LinkedInLoginPage.resetPasswordAllCases('Abdelbar123', 'Abdelbar1234', 'Abdelbar123123' , '12345678');
        await browser.pause(2000);
    });
    */
    
    /*
    it("change profile picture successfully", async () => {
        await profile.changeProfilePictureSuccesfullyUsingPhotos();
        await browser.pause(2000);
    });
    */
/*
    it('change profile picture using camera successfully', async () => {
        await profile.changeProfilePictureSuccesfullyUsingCamera();
        await browser.pause(2000);
    });

    */
   /*
    it("test changing cover page successfully", async () => {
        await editProfilePhotos.changeCoverPhotoSuccesfullyUsingCamera();
        await browser.pause(2000);
    });
    */

    /*

    it(' profile picture deleted successfully', async () => {
        await profile.deleteProfilePictureSuccesfully();
        await browser.pause(2000);
    });

    
*/

    
   /*

    it('Forget My password with valid email', async () => {
        await passwordRelated.ForgetPasswordWithEmptyEmailField(
            'Porter.Hodkiewicz@hotma',
            'PorterHodkiewicz@hotmail.com'
        );

        await browser.pause(2000);

        //await passwordRelated.checkIfSignInPageIsDisplayed();
    });
    */



    /*
    it('log in with wrong password', async () => {
        await LinkedInLoginPage.checkIfSignInPageIsDisplayed();
        await browser.pause(2000);
        await LinkedInLoginPage.loginWithWrongEmailOrPassword('Porter.Hodkiewicz@hotmail.com', 'WrongPassword123');
        await browser.pause(3000);
    });
    */

    /*
    it('log in with invalid email', async () => {
        await LinkedInLoginPage.checkIfSignInPageIsDisplayed();
        await browser.pause(2000);
        await LinkedInLoginPage.loginWithWrongEmailOrPassword('Porter.Hodkiewicz', 'WrongPassword123');
        await browser.pause(3000);
    });
    */


    

    
        

    

    /*
    it('should log in successfully', async () => {
        await LinkedInLoginPage.login('yousseftest1819@gmail.com', 'Abdelbar@1312');
       // expect(success).toBeTruthy();
    });*/
    
    
    /*
    it('should successfully change password', async () => {
        const email = 'youssefahmed1819@gmail.com';
        const
        password = 'Abdelbar1312';

        //await LinkedInLoginPage.login(email, password);

        //await LoginPage.verifyLoginSuccess();

        const oldPassword = 'Abdelbar1312';
        const newPassword = 'Abdelbar@1312';

        await passwordRelated.changePasswordSuccessfully(oldPassword, newPassword);

        await Utils.restartApp();
    });

    it('should fail with weak password and retry with strong password', async () => {
        const oldPassword = 'Abdelbar@1312';
        const weakPassword = '12345';
        const strongPassword = 'Abdelbar1312';

        await passwordRelated.changePasswordWithWeakAttempt(oldPassword, weakPassword, strongPassword);
    });*/
    

});
