import { $, browser } from '@wdio/globals';

class privacy {


    async scroll(startX, startY, endX, endY) {
        // Perform a swipe from start (startX, startY) to end (endX, endY)
        await driver.performActions([
            {
                type: 'pointer',
                id: 'pointer1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y: startY }, // Start from start point
                    { type: 'pointerDown', button: 0 }, // Press down
                    { type: 'pointerMove', duration: 1000, x: endX, y: endY }, // Move to the end point (duration can be adjusted for speed)
                    { type: 'pointerUp', button: 0 } // Release the touch
                ]
            }
        ]);
    }

    async clickAtCoordinates(x, y) {
        await driver.performActions([
            {
                type: 'pointer',
                id: 'pointer1', 
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: x, y: y },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
    }

    get profileButton() { return $('android=new UiSelector().className("android.widget.Button").instance(0)'); }
    get settingsButton() { return $('~Settings'); }

    get ConnectionEveryOne() { return $('~Everyone'); }
    get ConnectionMutualConnections() { return $('~Mutual Connections Only'); }

    get ConnectionPrivacyUpdatedSuccessfully() { return $('~Connection request settings updated successfully'); }

    get backToHomePage() { return $('android=new UiSelector().className("android.widget.Button").instance(0)'); }




    get searchBar() { return $('android=new UiSelector().className("android.widget.EditText")'); }
    get optionsForOtherUSerPost() { return $('android=new UiSelector().className("android.widget.Button").instance(2)'); }

    get savePostForLater() { return $('~Save for later'); }

    get postSaveForLaterSuccessfully() { return $('~✅ Post saved for later'); }

    get otherUserCommentField() { return $('android=new UiSelector().className("android.widget.EditText")'); }

    get choosingInstance() { return $('android=new UiSelector().description("youssef ahmed").instance(2)'); }

    get instanceIsAdded() { return $('android=new UiSelector().description("youssef ahmed")'); }

    get postCommentButton() { return $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.widget.Button'); }

    get goBackToPostsPage() { return $('android=new UiSelector().className("android.widget.Button").instance(0)'); }

    get LikePost() { return $('android=new UiSelector().description("Like").instance(0)'); }

    get Settings() { return $('android=new UiSelector().className("android.widget.Button").instance(3)'); }


    get SignOut() { return $('~Sign Out'); }

    get EmailField() { return $('android=new UiSelector().className("android.widget.EditText").instance(0)'); }
    get PasswordField() { return $('android=new UiSelector().className("android.widget.EditText").instance(1)'); }

    get SignInButton() { return $('//android.widget.Button[@content-desc="Sign in"]'); }

    get Notifications() { return $('~Notifications'); }


    get ReportPost() { return $('~Report this post'); }

    get Harassment() { return $('~Harassment'); }
    get Misinformation() { return $('~Misinformation'); }

    get optionsInsideOtherProfile() { return $('android=new UiSelector().className("android.widget.Button").instance(1)'); }

    get ReportProfile() { return $('~Report'); }


    get SubmitReport() { return $('~Submit Report'); }

    async privacyFunction() {

        await this.profileButton.waitForDisplayed({ timeout: 5000 });
        await this.profileButton.click();

        await this.settingsButton.waitForDisplayed({ timeout: 5000 });
        await this.settingsButton.click();

        await browser.pause(200);

        await this.clickAtCoordinates(922, 1478); 

        await this.ConnectionEveryOne.waitForDisplayed({ timeout: 5000 });
        await this.ConnectionEveryOne.click();

        await this.ConnectionPrivacyUpdatedSuccessfully.waitForDisplayed({ timeout: 5000 });

        await this.backToHomePage.waitForDisplayed({ timeout: 5000 });
        await this.backToHomePage.click();

        await this.searchBar.waitForDisplayed({ timeout: 5000 });
        await this.searchBar.click();

        await this.searchBar.setValue("testing module 4");


        await browser.pause(1000);
        await this.clickAtCoordinates(450,650);

        await this.optionsForOtherUSerPost.waitForDisplayed({ timeout: 5000 });
        await this.optionsForOtherUSerPost.click();

        await this.ReportPost.waitForDisplayed({ timeout: 5000 });
        await this.ReportPost.click();

        await this.Harassment.waitForDisplayed({ timeout: 5000 });
        await this.Harassment.click();

        await browser.pause(1000);

        await this.clickAtCoordinates(209,332);

        await this.optionsInsideOtherProfile.waitForDisplayed({ timeout: 5000 });
        await this.optionsInsideOtherProfile.click();


        await this.ReportProfile.waitForDisplayed({ timeout: 5000 });
        await this.ReportProfile.click();

        await this.SubmitReport.waitForDisplayed({ timeout: 5000 });
        await this.SubmitReport.click();


        await browser.pause(1000);















       

    }

    
}

export default new privacy();