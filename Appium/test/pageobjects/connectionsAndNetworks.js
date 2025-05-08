import { $, browser } from '@wdio/globals';

class Connections {
    


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


    
    get MyNetworksPage() { return $('~My Network'); }
    get ArlieHarriesPage(){ return $('~Arlie Harris\nSenior Infrastructure Coordinator'); }

    get arileHarriesProfilePage() { return $('~Arlie Harris'); }
    get SearchBarInsideNetworksPage() { return $('android=new UiSelector().className("android.widget.EditText")'); }
    get YoussefAhmedPage() { return $('~youssef ahmed'); }
    get ConnectToYoussefPage() { return $('~Connect'); }

    get backToMyNetworkPage() { return $('~Back'); }

    get SettingPage() { return $('android=new UiSelector().className("android.widget.Button").instance(3)'); }

    get SignoutButton() { return $('~Sign Out'); }

    get LoginEmailField() { return $('android=new UiSelector().className("android.widget.EditText").instance(0)'); }

    get PasswordField() { return $('android=new UiSelector().className("android.widget.EditText").instance(1)'); }

    get SignInButton() { return $('//android.widget.Button[@content-desc="Sign in"]'); }


    get ConnectionRequestIsSent() { return $('~Connection request sent'); }

    get FailedToSendRequest() { return $('~Failed to send request'); }


    get connectionRequestFromJulius() { return $('~Julius Caesar\nConnect\nRecently'); }

    get acceptConnectionRequest() { return $('android=new UiSelector().className("android.widget.Button").instance(5)'); }
    get ignoreConnectionRequest() { return $('android=new UiSelector().className("android.widget.Button").instance(4)'); }

    get InvitationAccepted() { return $('~Invitation accepted'); }


    get notificationIcon() { return $('~Notifications'); }


    get manageMyNetowrk() { return $('~Manage my network'); }

    get ConnectionsList() { return $('~Connections'); }

    get OptionForAConnectedUser() { return $('android=new UiSelector().className("android.widget.Button").instance(3)'); }


    get removeConnectionButton() { return $('~Remove connection'); }
    get Removeconnection() { return $('~Remove'); }


    get BackToManageMyNetwork() { return $('android=new UiSelector().className("android.widget.Button").instance(0)'); }

    get backToMyNetworkPage() { return $('android=new UiSelector().className("android.widget.Button").instance(0)'); }

    //get navigateToJuliusPage() { return $('android=new UiSelector().className("android.widget.Button").instance(1)'); }

    get optionsInsideJuliusPage() { return $('android=new UiSelector().className("android.widget.Button").instance(1)'); }

    get BackToNotificationPage() { return $('~Back'); }


    get BlockUser() { return $('~Block'); }

    get BlockUserBottom() { return $('~Block'); }

    get SettingOptions() { return $('android=new UiSelector().className("android.widget.Button").instance(2)'); }


    get ManageBlockButton() { return $('~Manage Blocklist'); }

    get UnblockUser() { return $('~Unblock'); }

    get UnblockedSuccessfully() { return $('~Julius Caesar has been unblocked'); }

    get UserBlockedSuccessfully() { return $('~User blocked successfully'); }

    get BackToSettingsPage() { return $('android=new UiSelector().className("android.widget.Button")'); }
    get BackToHomePage() { return $('android=new UiSelector().className("android.widget.Button").instance(0)'); }



    async BlockAndUnblockUser() {
        await this.notificationIcon.waitForDisplayed({ timeout: 5000 });
        await this.notificationIcon.click();

        await this.clickAtCoordinates(453,453); 

        await this.optionsInsideJuliusPage.waitForDisplayed({ timeout: 5000 });
        await this.optionsInsideJuliusPage.click();

        await this.BlockUser.waitForDisplayed({ timeout: 5000 });
        await this.BlockUser.click();

        await browser.pause(500);

        await this.BlockUserBottom.waitForDisplayed({ timeout: 5000 });
        await this.BlockUserBottom.click();

        await this.UserBlockedSuccessfully.waitForDisplayed({ timeout: 5000 });

        await this.clickAtCoordinates(453, 453);

        await browser.pause(1000);

        
        await this.BackToNotificationPage.waitForDisplayed({ timeout: 5000 });
        await this.BackToNotificationPage.click();

        await this.SettingOptions.waitForDisplayed({ timeout: 5000 });
        await this.SettingOptions.click();

        await this.ManageBlockButton.waitForDisplayed({ timeout: 5000 });
        await this.ManageBlockButton.click();

        await this.UnblockUser.waitForDisplayed({ timeout: 5000 });
        await this.UnblockUser.click();

        await browser.pause(500);
        
        await this.UnblockUser.waitForDisplayed({ timeout: 5000 });
        await this.UnblockUser.click();

        await this.UnblockedSuccessfully.waitForDisplayed({ timeout: 5000 });

        await this.BackToSettingsPage.waitForDisplayed({ timeout: 5000 });
        await this.BackToSettingsPage.click();

        await this.BackToHomePage.waitForDisplayed({ timeout: 5000 });
        await this.BackToHomePage.click();

        await this.clickAtCoordinates(453, 453);
        
    }




    

    

   

    async ConnectWithOtherUsers(FullName , name , email , password) {

        await this.MyNetworksPage.waitForDisplayed({ timeout: 5000 });
        await this.MyNetworksPage.click();
        //await browser.pause(500);

        //await this.manageMyNetowrk.waitForDisplayed({ timeout: 5000 });
        //await this.manageMyNetowrk.click();

        await browser.pause(100);

        await this.clickAtCoordinates(1008, 408);
        await this.ConnectionsList.waitForDisplayed({ timeout: 5000 });
        await this.ConnectionsList.click();

        await browser.pause(1000);

        await this.OptionForAConnectedUser.waitForDisplayed({ timeout: 5000 });
        await this.OptionForAConnectedUser.click();

        await browser.pause(500);

        await this.removeConnectionButton.waitForDisplayed({ timeout: 5000 });
        await this.removeConnectionButton.click();

        while (await this.Removeconnection.isDisplayed()) {
            try {
                await this.Removeconnection.click();
                // wait a short moment after click
                await browser.pause(500);
            } catch (error) {
                console.warn('Click failed or element disappeared during clicking:', error.message);
                break;
            }
        }
        

        await browser.pause(1000);

        await this.BackToManageMyNetwork.waitForDisplayed({ timeout: 5000 });
        await this.BackToManageMyNetwork.click();

        await this.backToMyNetworkPage.waitForDisplayed({ timeout: 5000 });
        await this.backToMyNetworkPage.click();








        await this.SearchBarInsideNetworksPage.waitForDisplayed({ timeout: 5000 });
        await this.SearchBarInsideNetworksPage.click();
        await this.SearchBarInsideNetworksPage.setValue(FullName);
        await browser.pause(1000);

        await this.SearchBarInsideNetworksPage.setValue(name);

        await browser.pause(1000);

        await this.clickAtCoordinates(450, 450); 

        await this.YoussefAhmedPage.waitForDisplayed({ timeout: 5000 });

        await this.ConnectToYoussefPage.click();
        const isRequestSent = await this.ConnectionRequestIsSent.isDisplayed();
        const isFailedToSend = await this.FailedToSendRequest.isDisplayed();

        if (isRequestSent) {
            console.log("Connection request was sent successfully.");
            await this.backToMyNetworkPage.waitForDisplayed({ timeout: 5000 });
            await this.backToMyNetworkPage.click();

            await this.SettingPage.waitForDisplayed({ timeout: 5000 });
            await this.SettingPage.click();

            await this.SignoutButton.waitForDisplayed({ timeout: 5000 });
            await this.SignoutButton.click();

            await browser.pause(500);

            await this.LoginEmailField.waitForDisplayed({ timeout: 5000 });
            await this.LoginEmailField.click();
            await this.LoginEmailField.setValue(email);

            await this.PasswordField.waitForDisplayed({ timeout: 5000 });
            await this.PasswordField.click();
            await this.PasswordField.setValue(password);
            await browser.pause(100);

            await this.SignInButton.waitForDisplayed({ timeout: 5000 });
            await this.SignInButton.click();

            await this.notificationIcon.waitForDisplayed({ timeout: 5000 });
            await this.notificationIcon.click();

            await browser.pause(2000);

            await this.MyNetworksPage.waitForDisplayed({ timeout: 5000 });
            await this.MyNetworksPage.click();

            await this.connectionRequestFromJulius.waitForDisplayed({ timeout: 5000 });
            //await this.connectionRequestFromJulius.click();
            await this.acceptConnectionRequest.waitForDisplayed({ timeout: 5000 });
            await this.acceptConnectionRequest.click();

            await this.InvitationAccepted.waitForDisplayed({ timeout: 5000 });

            await browser.pause(500);

            await this.clickAtCoordinates(1008, 408);

            await this.ConnectionsList.waitForDisplayed({ timeout: 5000 });
            await this.ConnectionsList.click();

            await browser.pause(2000);



            
        } else if (isFailedToSend) {
            console.log("Failed to send the connection request.");
            // Handle the failure case here
            return;
        } else {
            console.log("Neither success nor failure message appeared.");
        }

    }






    



}
export default new Connections();