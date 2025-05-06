import { $, browser } from '@wdio/globals';

class company {


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
    get CreateCompanyPage() { return $('~Create company'); }
    get MyCompaniesPage() { return $('~My Companies'); }

    get NameOfTheCompany() { return $('android=new UiSelector().className("android.widget.EditText").instance(0)'); }
    get AddressOfTheCompany() { return $('android=new UiSelector().className("android.widget.EditText").instance(1)'); }
    get IndustryOfTheCompany() { return $('android=new UiSelector().className("android.widget.EditText").instance(2)'); }
    get OrganizationSize() { return $('~Organization Size'); }
    get OrganizationSizeOption() { return $('~501-1000'); }

    get OrganizationType() { return $('~Organization Type'); }
    get OrganizationTypeOption() { return $('~Educational'); }

    get Tagline() { return $('android=new UiSelector().className("android.widget.EditText").instance(3)'); }

    get CreateCompanyButton() { return $('//android.widget.Button[@content-desc="Create Company"]'); }

    get failedMessage() { return $('~Failed to create company.'); }

    get companyName() { return $('~Location: testing-company-address\nIndustry: Testing Company Industry\nTagline: Testing Company Tagline\nWebsite: Testing Company Website'); }

    get OptionMenu() { return $('android=new UiSelector().className("android.widget.Button").instance(1)'); }


    get EditCompanyDetails() { return $('~Edit Company'); }

    get EditCompanyName() { return $('android=new UiSelector().className("android.widget.EditText").instance(0)'); }
    get EditCompanyAddress() { return $('android=new UiSelector().className("android.widget.EditText").instance(1)'); }
    get EditComanyWebsite() { return $('android=new UiSelector().className("android.widget.EditText").instance(2)'); }
    get EditCompanyIndustry() { return $('android=new UiSelector().className("android.widget.EditText").instance(3)'); }
    get EditCompanyOrganizationSize() { return $('android=new UiSelector().className("android.widget.EditText").instance(4)'); }
    get EditCompanyOrganizationType() { return $('android=new UiSelector().className("android.widget.EditText").instance(5)'); }
    get EditCompanyTagline() { return $('android=new UiSelector().className("android.widget.EditText").instance(6)'); }
    get EditCompanyLocation() { return $('android=new UiSelector().className("android.widget.EditText").instance(7)'); }


    get SaveChangesOnEditCompany() { return $('~Save Changes'); }

    get ChangeLogoOFTheCompany() { return $('android=new UiSelector().className("android.view.View").instance(6)'); }

    get chosenImage() { return $('android=new UiSelector().resourceId("com.google.android.providers.media.module:id/icon_thumbnail").instance(0)'); }

    get Back() { return $('~Back'); }

    get CompanyDetailsUpdatedSuccessfully() { return $('~Company updated successfully!'); }


    get PostAJob() { return $('~Post a job for free'); }

    get CreateJobJobTitle() { return $('android=new UiSelector().className("android.widget.EditText").instance(0)'); }
    get CreateJobIndustry() { return $('android=new UiSelector().className("android.widget.EditText").instance(1)'); }
    get CreateJobLocation() { return $('android=new UiSelector().className("android.widget.EditText").instance(2)'); }
    get CreateJobJobDescription() { return $('android=new UiSelector().className("android.widget.EditText").instance(3)'); }
    get CreateJobApplicationEmail() { return $('android=new UiSelector().className("android.widget.EditText").instance(4)'); }
    get SubmitNewJob() { return $('~Submit'); }

    async CreateJob() {

        await this.profileButton.waitForDisplayed({ timeout: 5000 });
        await this.profileButton.click();

        await this.MyCompaniesPage.waitForDisplayed({ timeout: 5000 });
        await this.MyCompaniesPage.click();

        await browser.pause(1000);

        //await this.companyName.waitForDisplayed({ timeout: 5000 });
        //await this.companyName.click();
        await this.clickAtCoordinates(500, 400); 

        await this.PostAJob.waitForDisplayed({ timeout: 5000 });
        await this.PostAJob.click();

        await this.CreateJobJobTitle.waitForDisplayed({ timeout: 5000 });
        await this.CreateJobJobTitle.click();
        await this.CreateJobJobTitle.setValue("Testing Job Title");

        await this.CreateJobIndustry.waitForDisplayed({ timeout: 5000 });
        await this.CreateJobIndustry.click();
        await this.CreateJobIndustry.setValue("Testing Job Industry");

        await this.CreateJobLocation.waitForDisplayed({ timeout: 5000 });
        await this.CreateJobLocation.click();
        await this.CreateJobLocation.setValue("Testing Job Location");

        await this.CreateJobJobDescription.waitForDisplayed({ timeout: 5000 });
        await this.CreateJobJobDescription.click();
        await this.CreateJobJobDescription.setValue("Testing Job Description");

        await this.CreateJobApplicationEmail.waitForDisplayed({ timeout: 5000 });
        await this.CreateJobApplicationEmail.click();
        await this.CreateJobApplicationEmail.setValue("Testing Job Application Email");

        await this.SubmitNewJob.waitForDisplayed({ timeout: 5000 });
        await this.SubmitNewJob.click();













    }

    async UpdateCompanyDetails() {

        await this.profileButton.waitForDisplayed({ timeout: 5000 });
        await this.profileButton.click();

        await this.MyCompaniesPage.waitForDisplayed({ timeout: 5000 });
        await this.MyCompaniesPage.click();

        await this.companyName.waitForDisplayed({ timeout: 5000 });
        await this.companyName.click();

        await this.OptionMenu.waitForDisplayed({ timeout: 5000 });
        await this.OptionMenu.click();

        await this.EditCompanyDetails.waitForDisplayed({ timeout: 5000 });
        await this.EditCompanyDetails.click();

        await this.ChangeLogoOFTheCompany.waitForDisplayed({ timeout: 5000 });
        await this.ChangeLogoOFTheCompany.click();

        await this.chosenImage.waitForDisplayed({ timeout: 5000 });
        await this.chosenImage.click();

        await this.EditCompanyName.waitForDisplayed({ timeout: 5000 });
        await this.EditCompanyName.click();
        await this.EditCompanyName.setValue("Testing Company Name");

        await this.EditCompanyAddress.waitForDisplayed({ timeout: 5000 });
        await this.EditCompanyAddress.click();
        await this.EditCompanyAddress.setValue("Testing Company Address");

        await this.EditComanyWebsite.waitForDisplayed({ timeout: 5000 });
        await this.EditComanyWebsite.click();
        await this.EditComanyWebsite.setValue("Testing Company Website");

        await this.EditCompanyIndustry.waitForDisplayed({ timeout: 5000 });
        await this.EditCompanyIndustry.click();
        await this.EditCompanyIndustry.setValue("Testing Company Industry");

        await this.EditCompanyOrganizationSize.waitForDisplayed({ timeout: 5000 });
        await this.EditCompanyOrganizationSize.click();
        await this.EditCompanyOrganizationSize.setValue("501-1000");

        await this.EditCompanyOrganizationType.waitForDisplayed({ timeout: 5000 });
        await this.EditCompanyOrganizationType.click();
        await this.EditCompanyOrganizationType.setValue("Public");


        await this.EditCompanyTagline.waitForDisplayed({ timeout: 5000 });
        await this.EditCompanyTagline.click();
        await this.EditCompanyTagline.setValue("Testing Company Tagline");

        await this.EditCompanyLocation.waitForDisplayed({ timeout: 5000 });
        await this.EditCompanyLocation.click();
        await this.EditCompanyLocation.setValue("Testing Company Location");

        await this.SaveChangesOnEditCompany.waitForDisplayed({ timeout: 5000 });
        await this.SaveChangesOnEditCompany.click();


        await this.Back.waitForDisplayed({ timeout: 5000 });
        await this.Back.click();

        await this.CompanyDetailsUpdatedSuccessfully.waitForDisplayed({ timeout: 5000 });



    }


    async CreateCompnany() {

        await this.profileButton.waitForDisplayed({ timeout: 5000 });
        await this.profileButton.click();

        await this.CreateCompanyPage.waitForDisplayed({ timeout: 5000 });
        await this.CreateCompanyPage.click();

        await this.NameOfTheCompany.waitForDisplayed({ timeout: 5000 });
        await this.NameOfTheCompany.click();
        await this.NameOfTheCompany.setValue("Testing Company");

        await this.AddressOfTheCompany.waitForDisplayed({ timeout: 5000 });
        await this.AddressOfTheCompany.click();
        await this.AddressOfTheCompany.setValue("Testing Address");

        await this.IndustryOfTheCompany.waitForDisplayed({ timeout: 5000 });
        await this.IndustryOfTheCompany.click();
        await this.IndustryOfTheCompany.setValue("Testing Industry");

        await this.OrganizationSize.waitForDisplayed({ timeout: 5000 });
        await this.OrganizationSize.click();

        await this.OrganizationSizeOption.waitForDisplayed({ timeout: 5000 });
        await this.OrganizationSizeOption.click();

        await this.OrganizationType.waitForDisplayed({ timeout: 5000 });
        await this.OrganizationType.click();
        await this.OrganizationTypeOption.waitForDisplayed({ timeout: 5000 });
        await this.OrganizationTypeOption.click();

        await this.Tagline.waitForDisplayed({ timeout: 5000 });
        await this.Tagline.click();
        await this.Tagline.setValue("Testing Tagline");

        await this.CreateCompanyButton.waitForDisplayed({ timeout: 5000 });
        await this.CreateCompanyButton.click();

        await this.failedMessage.waitForDisplayed({ timeout: 5000 });
        await this.failedMessage.click();


        await browser.pause(2000);



    }
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

export default new company();