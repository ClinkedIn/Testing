import { $, browser } from '@wdio/globals';

class posts {

    get imageToAddtoPost() {
    return $('android=new UiSelector().resourceId("com.google.android.providers.media.module:id/icon_thumbnail").instance(3)'); }

    get documentToAddtoPost() {
        return $('android=new UiSelector().className("android.widget.LinearLayout").instance(10)'); }
    
    
    get ProfileIcon() { return $('android=new UiSelector().className("android.widget.Button").instance(0)'); }

    get postTextField() { return $('android=new UiSelector().className("android.widget.EditText").instance(1)'); }

    get goToUserProfile() { return $('android=new UiSelector().className("android.view.View").instance(4)'); }
    get goBackToPostsPage() { return $('new UiSelector().className("android.widget.Button").instance(0)'); }

    get addImageButton() { return $('android=new UiSelector().className("android.widget.Button").instance(6)'); }
    get addRecordingButton() { return $('android=new UiSelector().className("android.widget.Button").instance(7)'); }
    get addDocumentScanningButton() { return $('android=new UiSelector().className("android.widget.Button").instance(8)'); }
    get addEmojiButton() { return $('android=new UiSelector().className("android.widget.Button").instance(9)'); }


    get removeChosenImageForPostImage() { return $('android=new UiSelector().className("android.view.View").instance(9)'); }

    get imageAppeared() { return $('android=new UiSelector().className("android.widget.ImageView")'); }


    

    get connectionsPostDisplay() { return $('~Connections'); }
    get AnyonePostDisplay() { return $('~Anyone'); }




    //define element selectors
    get postsPageNavigation() { return $('~Post'); }

    get createPostTitle() { return $('~Create Post'); }



    get postButton() { return $('android=new UiSelector().description("Post")'); }


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


    async selectOtherPostVisibility() {
        let currentSelection = null;
    
        // Try detecting "Connections" up to 5 times
        for (let i = 0; i < 5; i++) {
            if (await this.connectionsPostDisplay.isDisplayed()) {
                currentSelection = this.connectionsPostDisplay;
                break;
            }
            await browser.pause(500); // Short wait between tries
        }
    
        // If not found, try detecting "Anyone" up to 5 times
        if (!currentSelection) {
            for (let i = 0; i < 5; i++) {
                if (await this.AnyonePostDisplay.isDisplayed()) {
                    currentSelection = this.AnyonePostDisplay;
                    break;
                }
                await browser.pause(500);
            }
        }
    
        if (!currentSelection) {
            throw new Error("Could not detect current selection: neither 'Connections' nor 'Anyone' were found.");
        }
    
        // Click on the current option to open the dropdown
        await currentSelection.click();
    
        // Choose the other option
        const otherOption = currentSelection === this.connectionsPostDisplay
            ? this.AnyonePostDisplay
            : this.connectionsPostDisplay;
    
        await otherOption.waitForDisplayed({ timeout: 3000 });
        await otherOption.click();
    }

    async navigateToPostsPage() {
        await this.postsPageNavigation.waitForDisplayed({ timeout: 5000 });
        await this.postsPageNavigation.click();
        await this.createPostTitle.waitForDisplayed({ timeout: 5000 });
    }

    async addPostSuccessfully(PostText , withImage = false) {
        // Navigate to the posts page
        await this.navigateToPostsPage();
       
        //write the post text
        await this.postTextField.waitForDisplayed({ timeout: 5000 });
        await this.postTextField.click();
        await this.postTextField.setValue(PostText);

        if(withImage) {
            //navigate to photos page
            await this.addImageButton.waitForDisplayed({ timeout: 5000 });
            await this.addImageButton.click();

            //add image to the post
            await this.imageToAddtoPost.waitForDisplayed({ timeout: 5000 });
            await this.imageToAddtoPost.click();

            await this.imageAppeared.waitForDisplayed({ timeout: 5000 });
        }
        
        //create the post
        await this.postButton.click();
        //wait for the post to be created
        await browser.pause(2000);
        //refresh
        await this.scroll(400,400,400,1400);
        await browser.pause(1000);


    }

    get UserDocument() { return $('~Youssef hammad CV.pdf'); }

    async addPostSuccessfullywithDocument(PostText , withDocument = false) {
        // Navigate to the posts page
        await this.navigateToPostsPage();
       
        //write the post text
        await this.postTextField.waitForDisplayed({ timeout: 5000 });
        await this.postTextField.click();
        await this.postTextField.setValue(PostText);

        if(withDocument) {
            //navigate to photos page
            await this.addDocumentScanningButton.waitForDisplayed({ timeout: 5000 });
            await this.addDocumentScanningButton.click();

            //add image to the post
            await this.documentToAddtoPost.waitForDisplayed({ timeout: 5000 });
            await this.documentToAddtoPost.click();

            await this.UserDocument.waitForDisplayed({ timeout: 5000 });
        }
        
        //create the post
        await this.postButton.click();
        //wait for the post to be created
        await browser.pause(2000);
        //refresh
        await this.scroll(400,400,400,1400);
        await browser.pause(1000);


    }

    get PostOptions() { return $('android=new UiSelector().className("android.widget.Button").instance(5)'); }

    get editPostButton() { return $('~Edit post'); }

    get deletePostButton() { return $('~Delete post'); }

    get editPostTextField() { return $('android=new UiSelector().className("android.widget.EditText")'); }
    get saveEditPostButton() { return $('~Save'); }

    get postUpdatedSuccessfully() { return $('~Post updated successfully'); }

    get deletePostButtonConfirmation() { return $('~Delete'); }

    get deletePostSuccessfully() { return $('~Post deleted successfully'); }

    async addPostSuccessfullyWithStates(PostText , editedText , withImage = false  ) {


        await this.PostOptions.waitForDisplayed({ timeout: 5000 });
        await this.PostOptions.click();

        await this.editPostButton.waitForDisplayed({ timeout: 5000 });
        await this.editPostButton.click();
        await this.editPostTextField.waitForDisplayed({ timeout: 5000 });
        await this.editPostTextField.click();
        await this.editPostTextField.setValue(editedText);

        await this.saveEditPostButton.waitForDisplayed({ timeout: 5000 });
        await this.saveEditPostButton.click();

        await this.postUpdatedSuccessfully.waitForDisplayed({ timeout: 5000 });

        await browser.pause(2000);

        // Navigate to the posts page
        await this.navigateToPostsPage();

        await this.selectOtherPostVisibility();

       
        //write the post text
        await this.postTextField.waitForDisplayed({ timeout: 5000 });
        await this.postTextField.click();
        await this.postTextField.setValue(PostText);

        if(withImage) {
            //navigate to photos page
            await this.addImageButton.waitForDisplayed({ timeout: 5000 });
            await this.addImageButton.click();

            //add image to the post
            await this.imageToAddtoPost.waitForDisplayed({ timeout: 5000 });
            await this.imageToAddtoPost.click();

            await this.imageAppeared.waitForDisplayed({ timeout: 5000 });
        }
        
        //create the post
        await this.postButton.click();
        //wait for the post to be created
        await browser.pause(2000);
        //refresh
        await this.scroll(400,400,400,1400);
        await browser.pause(1000);



        await this.PostOptions.waitForDisplayed({ timeout: 5000 });
        await this.PostOptions.click();

        await this.deletePostButton.waitForDisplayed({ timeout: 5000 });
        await this.deletePostButton.click();

        await this.deletePostButtonConfirmation.waitForDisplayed({ timeout: 5000 });
        await this.deletePostButtonConfirmation.click();


        await this.deletePostSuccessfully.waitForDisplayed({ timeout: 5000 });






    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //comment post
    get commentButton() { return $('android=new UiSelector().description("Comment").instance(0)'); }
    get likeButton() { return $('android=new UiSelector().description("Like").instance(0)'); }
    get commentTextField() { return $('android=new UiSelector().className("android.widget.EditText")'); }
    get postCommentButton() { return $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.widget.Button'); }
    get likePostButton() { return $('android=new UiSelector().description("Like").instance(0)'); }
    get likeFirstComment() { return $('android=new UiSelector().description("Like").instance(1)'); }
    get replyFirstCommentButton() { return $('android=new UiSelector().description("Reply").instance(0)'); }

    
    //indicator onlyyy
    get commentIndicator() { return $('android=new UiSelector().description("Like").instance(2)'); }

    get replyField() { return $('//android.widget.EditText[@text="@youssef ahmed "]'); }

    get replyButton() { return $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.widget.Button[2]'); }

    get commentAddedsuccessfully() { return $('~Comment posted successfully'); }
    


    async commentPostUnsuccessfully() {
        await this.commentButton.waitForDisplayed({ timeout: 5000 });
        await this.commentButton.click();
        await browser.pause(2000);
    }

    async commentPostSuccessfully(commentContent , reply) {

        await this.commentButton.waitForDisplayed({ timeout: 5000 });
        await this.commentButton.click();
        await browser.pause(500);

        await this.scroll(400, 1400, 400, 400);



        //write the comment text
        await this.commentTextField.waitForDisplayed({ timeout: 5000 });
        await this.commentTextField.click();
        await this.commentTextField.setValue(commentContent);




        //create the post
        await this.postCommentButton.click();

        await this.commentAddedsuccessfully.waitForDisplayed({ timeout: 5000 });
        //wait for the post to be created
        await this.scroll(400, 1400, 400, 400);
        //add like to the post

        
        await this.commentIndicator.waitForDisplayed({ timeout: 5000 });
        await this.commentIndicator.click();
        await browser.pause(100);

        await this.commentIndicator.click();
        await browser.pause(1000);



        await this.likeFirstComment.waitForDisplayed({ timeout: 5000 });
        await this.likeFirstComment.click();

        await this.replyFirstCommentButton.waitForDisplayed({ timeout: 5000 });
        await this.replyFirstCommentButton.click();

        

        await this.replyField.waitForDisplayed({ timeout: 5000 });
        await this.replyField.click();
        await this.replyField.addValue(reply);

        await browser.pause(500);
        await this.replyButton.waitForDisplayed({ timeout: 5000 });
        await this.replyButton.click();

        

        await this.commentAddedsuccessfully.waitForDisplayed({ timeout: 5000 });


        await this.scroll(400, 1400, 400, 400);





        await this.postCommentButton.click();

    }

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


    async tryingMostOfThings() {

        await this.searchBar.waitForDisplayed({ timeout: 5000 });
        await this.searchBar.click();

        await this.searchBar.setValue("testing module 4");

        await browser.pause(1000);
        await this.clickAtCoordinates(450,650);

        await this.optionsForOtherUSerPost.waitForDisplayed({ timeout: 5000 });
        await this.optionsForOtherUSerPost.click();

        await this.savePostForLater.waitForDisplayed({ timeout: 5000 });
        await this.savePostForLater.click();


        await this.postSaveForLaterSuccessfully.waitForDisplayed({ timeout: 5000 });


        await this.LikePost.waitForDisplayed({ timeout: 5000 });
        await this.LikePost.click();


        await this.otherUserCommentField.waitForDisplayed({ timeout: 5000 });
        await this.otherUserCommentField.click();
        await this.otherUserCommentField.setValue("testing comment on other user post @youssef");

        await this.choosingInstance.waitForDisplayed({ timeout: 5000 });
        await this.choosingInstance.click();

        await this.instanceIsAdded.waitForDisplayed({ timeout: 5000 });

        await this.postCommentButton.click();

        await browser.pause(1000);

        await this.goBackToPostsPage.waitForDisplayed({ timeout: 5000 });
        await this.goBackToPostsPage.click();

        await this.Settings.waitForDisplayed({ timeout: 5000 });
        await this.Settings.click();   
        
        await this.SignOut.waitForDisplayed({ timeout: 5000 });
        await this.SignOut.click();



        await this.EmailField.waitForDisplayed({ timeout: 5000 });
        await this.EmailField.click();
        await this.EmailField.setValue("youssefahmed1819@gmail.com");

        await this.PasswordField.waitForDisplayed({ timeout: 5000 });
        await this.PasswordField.click();
        await this.PasswordField.setValue("Abdelbar123");

        await this.SignInButton.waitForDisplayed({ timeout: 5000 });
        await this.SignInButton.click();


        await this.Notifications.waitForDisplayed({ timeout: 5000 });
        await this.Notifications.click();







        











    }



    
}

export default new posts();

