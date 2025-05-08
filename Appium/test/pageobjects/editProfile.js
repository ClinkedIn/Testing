import { $, browser } from '@wdio/globals';


class editProfile {
    

    //home page elements
    get homePageProfileIcon() { return $('android=new UiSelector().className("android.widget.Button").instance(0)'); }
    get homePageSearchEngine() { return $('android=new UiSelector().className("android.widget.EditText")'); }
    get homePageLightOrDarkMode() { return $('android=new UiSelector().className("android.widget.Button").instance(1)'); }
    get homePageSetting() { return $('android=new UiSelector().className("android.widget.Button").instance(2)'); }
    get homePageMessagesIcon() { return $('android=new UiSelector().className("android.widget.Button").instance(3)'); }
    
    get sidePanelProfile() { return $('android.widget.ImageView'); }
    get goToUserProfile() { return $('android=new UiSelector().className("android.view.View").instance(4)'); }
    get UserProfilePicture() { return $('android=new UiSelector().className("android.view.View").instance(5)'); }
    

    
    get editProfileCoverPage() { return $('android=new UiSelector().className("android.widget.Button").instance(4)'); }

    get editUserProfilePicture() { return $('android=new UiSelector().description("Edit")'); }
    get photoLibrary() { return $('android=new UiSelector().description("Photo Library")'); }

    get photoChangedSuccessfully() { return $('~Profile photo updated successfully'); }
    get photoDeletedSuccessfully() { return $('~Profile photo deleted successfully'); }

    get coverPhotoChangedSuccessfully() { return $('~Cover photo updated successfully'); }
    get coverPhotoDeletedSuccessfully() { return $('~Cover photo deleted successfully'); }


    get addCoverPhoto() { return $('android=new UiSelector().description("Add")'); }
    get deleteCoverPhoto() { return $('android=new UiSelector().description("Delete")'); }
    
    get camera() { return $('android=new UiSelector().description("Camera")'); }
    get takePhoto() { return $('~Shutter'); }
    get retakePhoto() { return $('~Retake'); }
    get usePhoto() { return $('~Done'); }
    get cancelPhoto() { return $('~Cancel'); }

    //camera Options
    get cameraOptions() { return $('android=new UiSelector().resourceId("com.android.camera2:id/three_dots")'); }
    get switchCameraOption() { return $('android=new UiSelector().resourceId("com.android.camera2:id/camera_toggle_button")'); }


    get deleteUserProfilePicturePopMessage() { return $('~Delete Profile Photo'); }
    get deleteUserProfilePicture() { return $('~Delete'); }
    get cancelDeletingUserProfilePicture() { return $('~Cancel'); }

    

    get addUserProfilePicture() { return $('android=new UiSelector().description("Add photo")'); }
    get addImageFromThePhotos1() {return $('android=new UiSelector().resourceId("com.google.android.providers.media.module:id/icon_thumbnail").instance(0)'); }
    get addImageFromThePhotos2() {return $('android=new UiSelector().resourceId("com.google.android.providers.media.module:id/icon_thumbnail").instance(4)'); }


    get deleteUserProfilePicture() { return $('android=new UiSelector().description("Delete")'); }
    get exitUserProfilePicture() { return $('android=new UiSelector().className("android.widget.Button")'); }
    get addSection() { return $('~Add section'); }

    async rotateCamera(){

        await this.cameraOptions.waitForDisplayed({ timeout: 5000 });
        await this.cameraOptions.click();
        await this.switchCameraOption.waitForDisplayed({ timeout: 5000 });
        await this.switchCameraOption.click();

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

    async navigateToUserProfile() {
        await this.homePageProfileIcon.waitForDisplayed({ timeout: 5000 });
        await this.homePageProfileIcon.click();

        await this.sidePanelProfile.waitForDisplayed({ timeout: 5000 });
        await this.goToUserProfile.click();


    }


    async changeCoverPhotoSuccesfully() {

        await this.navigateToUserProfile();

        await this.editProfileCoverPage.waitForDisplayed({ timeout: 5000 });
        await this.editProfileCoverPage.click();

        await this.editUserProfilePicture.waitForDisplayed({ timeout: 5000 });
        await this.editUserProfilePicture.click();

        await this.photoLibrary.waitForDisplayed({ timeout: 5000 });
        await this.photoLibrary.click();

        await this.addImageFromThePhotos1.waitForDisplayed({ timeout: 5000 });
        await this.addImageFromThePhotos1.click();


        await browser.pause(2000); 

        while (!(await this.coverPhotoChangedSuccessfully.isDisplayed()))
        {await browser.pause(500); }

        //await this.scroll(400,400,400,1400);

        //await browser.pause(1000);

        //await this.navigateToUserProfile();

        //await this.editProfileCoverPage.waitForDisplayed({ timeout: 5000 });
       // await this.editProfileCoverPage.click();

        //await browser.pause(500);

        await this.exitUserProfilePicture.waitForDisplayed({ timeout: 5000 });
        await this.exitUserProfilePicture.click();
    }




    async changeCoverPhotoSuccesfullyUsingCamera() {

        await this.navigateToUserProfile();

        await this.editProfileCoverPage.waitForDisplayed({ timeout: 5000 });
        await this.editProfileCoverPage.click();

        await this.editUserProfilePicture.waitForDisplayed({ timeout: 5000 });
        await this.editUserProfilePicture.click();

        await this.camera.waitForDisplayed({ timeout: 5000 });
        await this.camera.click();

        await this.takePhoto.waitForDisplayed({ timeout: 5000 });
        await this.takePhoto.click();


        await this.usePhoto.waitForDisplayed({ timeout: 5000 });
        await this.usePhoto.click();



        await browser.pause(2000); 

        while (!(await this.coverPhotoChangedSuccessfully.isDisplayed()))
        {await browser.pause(500); }


        await this.exitUserProfilePicture.waitForDisplayed({ timeout: 5000 });
        await this.exitUserProfilePicture.click();
    }

    async changeProfilePictureSuccesfullyUsingCamera() {
        await this.navigateToUserProfile();

        await this.UserProfilePicture.waitForDisplayed({ timeout: 5000 });

        do {
            await this.UserProfilePicture.click();
            await this.clickAtCoordinates(137, 476); 
            await browser.pause(500); 
        } while (!(await this.editUserProfilePicture.isDisplayed()));

        //await this.addUserProfilePicture.waitForDisplayed({ timeout: 5000 });
        await this.editUserProfilePicture.click();

        await this.camera.waitForDisplayed({ timeout: 5000 });
        await this.camera.click();

        if(await this.cameraOptions.isDisplayed()) {
            await this.rotateCamera();
        }

        await this.takePhoto.waitForDisplayed({ timeout: 5000 });
        await this.takePhoto.click();

        await this.usePhoto.waitForDisplayed({ timeout: 5000 });
        await this.usePhoto.click();



        await browser.pause(2000); 

        while (!(await this.photoChangedSuccessfully.isDisplayed()))
        {await browser.pause(500); }

        

        await browser.pause(1000);
        await this.photoChangedSuccessfully.waitForDisplayed({ timeout: 5000 });
        await this.exitUserProfilePicture.waitForDisplayed({ timeout: 5000 });
        await this.exitUserProfilePicture.click();
    }



    


    async changeProfilePictureSuccesfullyUsingPhotos() {
       await this.navigateToUserProfile();


        await this.UserProfilePicture.waitForDisplayed({ timeout: 5000 });

        do {
            await this.UserProfilePicture.click();
            await this.clickAtCoordinates(137, 476); 
            await browser.pause(500); 
        } while (!(await this.addUserProfilePicture.isDisplayed()));

        //await this.addUserProfilePicture.waitForDisplayed({ timeout: 5000 });
        await this.addUserProfilePicture.click();

        await this.addImageFromThePhotos1.waitForDisplayed({ timeout: 5000 });
        await this.addImageFromThePhotos1.click();

        //await browser.pause(10000); 

        while (!(await this.photoChangedSuccessfully.isDisplayed()));

        //await this.scroll(400,400,400,1400);

        await browser.pause(1000);
        await this.photoChangedSuccessfully.waitForDisplayed({ timeout: 5000 });

        await this.exitUserProfilePicture.waitForDisplayed({ timeout: 5000 });
        await this.exitUserProfilePicture.click();
    }


    ///////////////////////////////////////////////////////////////////////////////////
    async deleteProfilePictureSuccesfully() {
        await this.navigateToUserProfile();


        await this.UserProfilePicture.waitForDisplayed({ timeout: 5000 });

        do {
            await this.UserProfilePicture.click();
            await this.clickAtCoordinates(137, 476); 
            await browser.pause(500); 
        } while (!(await this.deleteUserProfilePicture.isDisplayed()));

        //await this.addUserProfilePicture.waitForDisplayed({ timeout: 5000 });
        await this.deleteUserProfilePicture.click();

        await this.deleteUserProfilePicturePopMessage.waitForDisplayed({ timeout: 5000 });
        await this.deleteUserProfilePicture.click();

        await browser.pause(1000); 

        while (!(await this.photoDeletedSuccessfully.isDisplayed()));

        //await this.scroll(400,400,400,1400);

        await browser.pause(1000);
        //await this.photoChangedSuccessfully.waitForDisplayed({ timeout: 5000 });
    }

    /////////////////////////////////////////////////////////////////////////////////////
    // edit profile button
    get editProfile() { return $('android=new UiSelector().className("android.widget.Button").instance(5)'); }

    //elements  inside edit profile page
    get basicInfo() { return $('~Basic Information'); }
    get contactInfo() { return $('~Contact Information'); }
    get About() { return $('~About'); }
    get Recommended() { return $('~Recommended'); }
    get Resume () { return $('~resume'); }


    get UploadresumeField() { return $('~Click to select a PDF file\nMaximum size: 5MB'); }
    get chosenResume() { return $('android=new UiSelector().className("android.widget.LinearLayout").instance(10)'); }
    get selectChosenResume() { return $('android=new UiSelector().resourceId("com.google.android.documentsui:id/action_menu_select")'); }

    get uploadResumeButton() { return $('~Upload Resume'); }




    //fields inside basic info
    get firstName() { return $('android=new UiSelector().className("android.widget.EditText").instance(0)'); }
    get lastName() { return $('android=new UiSelector().className("android.widget.EditText").instance(1)'); }
    get AdditionalName() { return $('android=new UiSelector().className("android.widget.EditText").instance(2)'); }
    get headline() { return $('android=new UiSelector().className("android.widget.EditText").instance(3)'); }
    get website() { return $('android=new UiSelector().className("android.widget.EditText").instance(4)'); }
    get location() { return $('android=new UiSelector().className("android.widget.EditText").instance(5)'); }
    get mainEducation() { return $('android=new UiSelector().className("android.widget.EditText").instance(6)'); }
    get industry() { return $('android=new UiSelector().className("android.widget.EditText").instance(7)'); }

    //fields inside About
    get aboutDescriptionField() { return $('android=new UiSelector().className("android.widget.EditText").instance(0)'); }
    get aboutSkillsField() { return $('android=new UiSelector().className("android.widget.EditText").instance(1)'); }



    get SubmitBasicInfo() { return $('~Submit'); }
    get BackToProfile() { return $('~Back'); }

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    


    /////////////////////////////////////////////////////////////////////////////////////////////////////

    //part for add  education
    get addSection() { return $('~Add section'); }
    get addSectionEducation() { return $('~Add education'); }
    get addSectionPosition() { return $('~Add position'); }


    get addEductionSchool() { return $('android=new UiSelector().className("android.widget.EditText").instance(0)'); }
    get addEductionDegree() { return $('android=new UiSelector().className("android.widget.EditText").instance(1)'); }
    get addEductionFieldOfStudy() { return $('android=new UiSelector().className("android.widget.EditText").instance(2)'); }

    get addEductionStartDate() { return $('android=new UiSelector().description("Select date").instance(0)'); }
    get addEductionEndDate() { return $('android=new UiSelector().description("Select date")'); }

    get addEductionGrade() { return $('android=new UiSelector().className("android.widget.EditText").instance(3)'); }

    get addEductionActivities() { return $('android=new UiSelector().className("android.widget.EditText").instance(4)'); }
    get addEductionDescription() { return $('android=new UiSelector().className("android.widget.EditText").instance(5)'); }

    get DatePopUp() { return $('android=new UiSelector().className("android.view.View").instance(3)'); }
    get modifyDateManually() { return $('android=new UiSelector().className("android.widget.Button").instance(0)'); }

    get dateField() { return $('android=new UiSelector().className("android.widget.EditText")'); }

    get invalidDateEntered() { return $('~Invalid format.'); }

    get saveDateButton() { return $('~OK'); }

    get MoveRightinDate() { return $('android=new UiSelector().className("android.widget.Button").instance(3)'); }

    get ChooseDate() { return $('android=new UiSelector().description("17, Thursday, July 17, 2025")'); }

    get saveEducationButton() { return $('~Save Education'); }

    get checkIfEducationAdded() { return $('~Education added successfully'); }


    get UploadResume() { return $('android=new UiSelector().className("android.widget.Button").instance(6)'); }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////


    get titleInsideAddposition() { return $('android=new UiSelector().className("android.widget.EditText").instance(0)'); }
    get empolymentType() { return $('android=new UiSelector().className("android.widget.Button").instance(1)'); }
    get employmentTypeInAddPosition() { return $('~Internship'); }
    get companyOrOrganization() { return $('android=new UiSelector().className("android.widget.EditText").instance(1)'); }
    get locationTypeInAddPosition() { return $('android=new UiSelector().className("android.widget.Button").instance(2)'); }
    get LocationTypeOption() { return $('~Onsite'); }

    get locationField() { return $('android=new UiSelector().className("android.widget.EditText").instance(2)'); }

    get DescriptionFieldInAddPosition() { return $('android=new UiSelector().className("android.widget.EditText").instance(3)'); }

    get startDateInAddPosition() { return $('android=new UiSelector().description("Select date").instance(0)'); }
    get endDateInAddPosition() { return $('android=new UiSelector().description("Select date").instance(1)'); }

    get whereDidYouFindThisPosition() { return $('android=new UiSelector().className("android.widget.Button").instance(2)'); }

    get LinkedIn() { return $('~LinkedIn'); }
    
    get AddSkillsInAddPosition() { return $('~Add Skill'); }

    get addSkillTextField() { return $('android=new UiSelector().className("android.widget.EditText")'); }

    get  AddSkillButton() { return $('~Add'); }

    get savePositionButton() { return $('~Save Position'); }

    get PositionSavedSuccessfully() { return $('~Position added successfully'); }

    get exitAddSectionToProfile() { return $('////android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.Button'); }

    get viewMoreExperience() { return $('~View more'); }



    async addPositionFeature(title , companyName ,startDate , endDate=null , location , description) {
        await this.navigateToUserProfile();
        await this.addSection.waitForDisplayed({ timeout: 5000 });
        await this.addSection.click();


        await this.addSectionPosition.waitForDisplayed({ timeout: 5000 });
        await this.addSectionPosition.click();




        await this.titleInsideAddposition.waitForDisplayed({ timeout: 5000 });
        await this.titleInsideAddposition.click();
        await this.titleInsideAddposition.setValue(title);

        await this.empolymentType.waitForDisplayed({ timeout: 5000 });
        await this.empolymentType.click();

        await this.employmentTypeInAddPosition.waitForDisplayed({ timeout: 5000 });
        await this.employmentTypeInAddPosition.click();

        await this.companyOrOrganization.waitForDisplayed({ timeout: 5000 });
        await this.companyOrOrganization.click();
        await this.companyOrOrganization.setValue(companyName);


        await this.addEductionStartDate.waitForDisplayed({ timeout: 5000 });
        await this.addEductionStartDate.click();

        await this.DatePopUp.waitForDisplayed({ timeout: 5000 });
        await this.modifyDateManually.click();
        await this.dateField.waitForDisplayed({ timeout: 5000 });
        await this.dateField.click();

        await this.dateField.setValue(startDate);

        if(await this.invalidDateEntered.isDisplayed()) {
            pause(1000);
            await this.dateField.setValue("01/01/2000");
        }

        await this.saveDateButton.waitForDisplayed({ timeout: 5000 });
        await this.saveDateButton.click();

        await this.addEductionEndDate.waitForDisplayed({ timeout: 5000 });
        await this.addEductionEndDate.click();

        await this.DatePopUp.waitForDisplayed({ timeout: 5000 });
        
        await this.MoveRightinDate.click();
        await browser.pause(100);

        await this.MoveRightinDate.click();
        await browser.pause(100);

        await this.ChooseDate.waitForDisplayed({ timeout: 5000 });
        await this.ChooseDate.click();

        await this.saveDateButton.waitForDisplayed({ timeout: 5000 });
        await this.saveDateButton.click();

        await this.locationTypeInAddPosition.waitForDisplayed({ timeout: 5000 });
        await this.locationTypeInAddPosition.click();

        await this.LocationTypeOption.click();

        await this.locationField.waitForDisplayed({ timeout: 5000 });
        await this.locationField.click();
        await this.locationField.setValue(location);


        await this.DescriptionFieldInAddPosition.waitForDisplayed({ timeout: 5000 });
        await this.DescriptionFieldInAddPosition.click();
        await this.DescriptionFieldInAddPosition.setValue(description);


        await this.scroll(400,2000,400,1000);

        await browser.pause(100);

        await this.whereDidYouFindThisPosition.waitForDisplayed({ timeout: 5000 });
        await this.whereDidYouFindThisPosition.click();


        await this.LinkedIn.waitForDisplayed({ timeout: 5000 });
        await this.LinkedIn.click();


        await this.AddSkillsInAddPosition.waitForDisplayed({ timeout: 5000 });
        await this.AddSkillsInAddPosition.click();

        await this.addSkillTextField.waitForDisplayed({ timeout: 5000 });
        await this.addSkillTextField.click();
        await this.addSkillTextField.setValue("Backend Developer");



        await this.AddSkillButton.waitForDisplayed({ timeout: 5000 });
        await this.AddSkillButton.click();

        await this.scroll(400,1300,400,1000);

        await this.savePositionButton.waitForDisplayed({ timeout: 5000 });
        await this.savePositionButton.click();



        await this.PositionSavedSuccessfully.waitForDisplayed({ timeout: 5000 });
        await this.PositionSavedSuccessfully.click();

        await this.exitAddSectionToProfile.waitForDisplayed({ timeout: 5000 });
        await this.exitAddSectionToProfile.click();
        

        await this.scroll(400,2200,400,1000);

        await this.viewMoreExperience.waitForDisplayed({ timeout: 5000 });
        await this.viewMoreExperience.click();

        await browser.pause(1000);
        
    }




    async uploadResume() {
        await this.navigateToUserProfile();
        await this.addSection.waitForDisplayed({ timeout: 5000 });
        await this.addSection.click();

        await this.Recommended.waitForDisplayed({ timeout: 5000 });
        await this.Recommended.click();


        await this.Resume.waitForDisplayed({ timeout: 5000 });
        await this.Resume.click();


        await this.UploadresumeField.waitForDisplayed({ timeout: 5000 });
        await this.UploadresumeField.click();


       // await this.UploadResume.waitForDisplayed({ timeout: 5000 });
       // await this.UploadResume.click();


        await this.chosenResume.waitForDisplayed({ timeout: 5000 });
        await this.chosenResume.click();

        //await this.selectChosenResume.waitForDisplayed({ timeout: 5000 });
        //await this.selectChosenResume.click();

        await this.uploadResumeButton.waitForDisplayed({ timeout: 5000 });
        await this.uploadResumeButton.click();



    }


    async editUserProfile(firstName, lastName, headline, website, location , industry) {

        await this.navigateToUserProfile();
        await this.editProfile.waitForDisplayed({ timeout: 5000 });
        await this.editProfile.click();


        await this.basicInfo.waitForDisplayed({ timeout: 5000 });
        await this.basicInfo.click();


        await this.firstName.waitForDisplayed({ timeout: 5000 });
        await this.firstName.click();
        await this.firstName.setValue(firstName);

        await this.lastName.waitForDisplayed({ timeout: 5000 });
        await this.lastName.click();
        await this.lastName.setValue(lastName);

        await this.headline.waitForDisplayed({ timeout: 5000 });
        await this.headline.click();
        await this.headline.setValue(headline);

        await this.website.waitForDisplayed({ timeout: 5000 });
        await this.website.click();
        await this.website.setValue(website);

        await this.location.waitForDisplayed({ timeout: 5000 });
        await this.location.click();
        await this.location.setValue(location);

        await this.industry.waitForDisplayed({ timeout: 5000 });
        await this.industry.click();
        await this.industry.setValue(industry);


        await this.SubmitBasicInfo.waitForDisplayed({ timeout: 5000 });
        await this.SubmitBasicInfo.click();


        await this.BackToProfile.waitForDisplayed({ timeout: 5000 });
        await this.BackToProfile.click();


    }

    async addAbout(description , skills) {
        await this.navigateToUserProfile();
        await this.editProfile.waitForDisplayed({ timeout: 5000 });

        await this.editProfile.click();
        await this.About.waitForDisplayed({ timeout: 5000 });

        await this.About.click();
        await this.aboutDescriptionField.waitForDisplayed({ timeout: 5000 });
        await this.aboutDescriptionField.click();
        await this.aboutDescriptionField.setValue(description);


        await this.aboutSkillsField.waitForDisplayed({ timeout: 5000 });
        await this.aboutSkillsField.click();
        await this.aboutSkillsField.setValue(skills);

        await this.SubmitBasicInfo.waitForDisplayed({ timeout: 5000 });
        await this.SubmitBasicInfo.click();

        await this.BackToProfile.waitForDisplayed({ timeout: 5000 });
        await this.BackToProfile.click();

    }




   async addFullEduction(school , degree , fieldOfStudy , startDate=null , endDate=null , grade , activities , description) {

        await this.navigateToUserProfile();
        await this.addSection.waitForDisplayed({ timeout: 5000 });
        await this.addSection.click();
        await this.addSectionEducation.waitForDisplayed({ timeout: 5000 });
        await this.addSectionEducation.click();

        await this.addEductionSchool.waitForDisplayed({ timeout: 5000 });
        await this.addEductionSchool.click();
        await this.addEductionSchool.setValue(school);

        await this.addEductionDegree.waitForDisplayed({ timeout: 5000 });
        await this.addEductionDegree.click();
        await this.addEductionDegree.setValue(degree);

        await this.addEductionFieldOfStudy.waitForDisplayed({ timeout: 5000 });
        await this.addEductionFieldOfStudy.click();
        await this.addEductionFieldOfStudy.setValue(fieldOfStudy);

        await this.addEductionStartDate.waitForDisplayed({ timeout: 5000 });
        await this.addEductionStartDate.click();

        await this.DatePopUp.waitForDisplayed({ timeout: 5000 });
        await this.modifyDateManually.click();
        await this.dateField.waitForDisplayed({ timeout: 5000 });
        await this.dateField.click();

        await this.dateField.setValue(startDate);

        if(await this.invalidDateEntered.isDisplayed()) {
            pause(1000);
            await this.dateField.setValue("01/01/2000");
        }

        await this.saveDateButton.waitForDisplayed({ timeout: 5000 });
        await this.saveDateButton.click();

        await this.addEductionEndDate.waitForDisplayed({ timeout: 5000 });
        await this.addEductionEndDate.click();

        await this.DatePopUp.waitForDisplayed({ timeout: 5000 });
        
        await this.MoveRightinDate.click();
        await browser.pause(100);

        await this.MoveRightinDate.click();
        await browser.pause(100);

        await this.ChooseDate.waitForDisplayed({ timeout: 5000 });
        await this.ChooseDate.click();

        await this.saveDateButton.waitForDisplayed({ timeout: 5000 });
        await this.saveDateButton.click();


        await this.addEductionGrade.waitForDisplayed({ timeout: 5000 });
        await this.addEductionGrade.click();


        await this.addEductionGrade.setValue(grade);

        await this.addEductionActivities.waitForDisplayed({ timeout: 5000 });
        await this.addEductionActivities.click();
        await this.addEductionActivities.setValue(activities);

        await this.addEductionDescription.waitForDisplayed({ timeout: 5000 });
        await this.addEductionDescription.click();
        await this.addEductionDescription.setValue(description);

        await this.scroll(400,2000,400,1200);

        await browser.pause(100);
        await this.saveEducationButton.waitForDisplayed({ timeout: 5000 });
        await this.saveEducationButton.click();

        await this.checkIfEducationAdded.waitForDisplayed({ timeout: 5000 });



   }


   async addWrongEduction(school , degree , fieldOfStudy , startDate=null , endDate=null , grade , activities , description) {

    await this.navigateToUserProfile();
    await this.addSection.waitForDisplayed({ timeout: 5000 });
    await this.addSection.click();
    await this.addSectionEducation.waitForDisplayed({ timeout: 5000 });
    await this.addSectionEducation.click();

    /*
    await this.addEductionSchool.waitForDisplayed({ timeout: 5000 });
    await this.addEductionSchool.click();
    await this.addEductionSchool.setValue(school);
*/
    await this.addEductionDegree.waitForDisplayed({ timeout: 5000 });
    await this.addEductionDegree.click();
    await this.addEductionDegree.setValue(degree);

    await this.addEductionFieldOfStudy.waitForDisplayed({ timeout: 5000 });
    await this.addEductionFieldOfStudy.click();
    await this.addEductionFieldOfStudy.setValue(fieldOfStudy);

    await this.addEductionStartDate.waitForDisplayed({ timeout: 5000 });
    await this.addEductionStartDate.click();

    await this.DatePopUp.waitForDisplayed({ timeout: 5000 });
    await this.modifyDateManually.click();
    await this.dateField.waitForDisplayed({ timeout: 5000 });
    await this.dateField.click();

    await this.dateField.setValue(startDate);

    if(await this.invalidDateEntered.isDisplayed()) {
        pause(1000);
        await this.dateField.setValue("01/01/2000");
    }

    await this.saveDateButton.waitForDisplayed({ timeout: 5000 });
    await this.saveDateButton.click();

    await this.addEductionEndDate.waitForDisplayed({ timeout: 5000 });
    await this.addEductionEndDate.click();

    await this.DatePopUp.waitForDisplayed({ timeout: 5000 });
    
    await this.MoveRightinDate.click();
    await browser.pause(100);

    await this.MoveRightinDate.click();
    await browser.pause(100);

    await this.ChooseDate.waitForDisplayed({ timeout: 5000 });
    await this.ChooseDate.click();

    await this.saveDateButton.waitForDisplayed({ timeout: 5000 });
    await this.saveDateButton.click();


    await this.addEductionGrade.waitForDisplayed({ timeout: 5000 });
    await this.addEductionGrade.click();


    await this.addEductionGrade.setValue(grade);

    await this.addEductionActivities.waitForDisplayed({ timeout: 5000 });
    await this.addEductionActivities.click();
    await this.addEductionActivities.setValue(activities);

    await this.addEductionDescription.waitForDisplayed({ timeout: 5000 });
    await this.addEductionDescription.click();
    await this.addEductionDescription.setValue(description);

    await this.scroll(400,2000,400,1200);

    await browser.pause(100);
    await this.saveEducationButton.waitForDisplayed({ timeout: 5000 });
    await this.saveEducationButton.click();

    await this.checkIfEducationAdded.waitForDisplayed({ timeout: 5000 });



}

//////////////////////////////////////////////////////////////////////////////////////////////////////////


get ProfilePrivacy() { return $('~Profile Privacy\nConnections Only\nOnly your connections can view your profile'); }
get PublicOptions() { return $('~Public'); }

get SuccessfulChangePrivacy() { return $('~Privacy settings updated successfully'); }


    async changeProfilePrivacy() {
        
        await this.homePageSetting.waitForDisplayed({ timeout: 5000 });
        await this.homePageSetting.click();


        await this.ProfilePrivacy.waitForDisplayed({ timeout: 5000 });
        await this.ProfilePrivacy.click();


        await this.PublicOptions.waitForDisplayed({ timeout: 5000 });
        await this.PublicOptions.click();


        await this.SuccessfulChangePrivacy.waitForDisplayed({ timeout: 5000 });


    }



    get MyNetworksPage() { return $('~My Network'); }
    get ArlieHarriesPage(){ return $('~Arlie Harris\nSenior Infrastructure Coordinator'); }

    get arileHarriesProfilePage() { return $('~Arlie Harris'); }

    async navigateToArlieHarriesPage() {
        await this.MyNetworksPage.waitForDisplayed({ timeout: 5000 });
        await this.MyNetworksPage.click();

        await this.scroll(400, 1800, 400, 1000);

        await this.ArlieHarriesPage.waitForDisplayed({ timeout: 5000 });
        await this.ArlieHarriesPage.click();


        await this.arileHarriesProfilePage.waitForDisplayed({ timeout: 5000 });
        await this.scroll(400, 2000, 400, 1000);


    }
    
    
    
}

export default new editProfile();
