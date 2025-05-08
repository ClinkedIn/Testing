import { $, browser } from '@wdio/globals';

class jobs {

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

    get jobsButton() { return $('~Jobs'); }
    get searchBar() { return $('android=new UiSelector().className("android.widget.EditText").instance(1)'); }

    get FilterBylocation() { return $('~Location'); }

    get ChosenLocation() { return $('~test location'); }

    get ResetFiltering() { return $('android=new UiSelector().description("Jobs")'); }

    get FilterByIndustry() { return $('~Industry'); }

    get ChosenIndustry() { return $('~Information Technology'); }

    get SaveFirstJob() { return $('android=new UiSelector().className("android.widget.Button").instance(8)'); }

    get ListOfSavedJobs() { return $('android=new UiSelector().className("android.widget.Button").instance(4)'); }

    get CheckSavedJob() { return $('~dhidhfdaihfhfdufdu\ntesting company • vasjjidfvjfdsughdsv'); }

    get EasyApplyButton() { return $('~Easy Apply'); }

    get emailField() { return $('android=new UiSelector().className("android.widget.EditText").instance(1)'); }
    get phoneField() { return $('android=new UiSelector().className("android.widget.EditText").instance(2)'); }

    get ApplicationAppliedSuccessfully() { return $('android=new UiSelector().className("android.widget.EditText").instance(1)'); }

    get SumbitButton() { return $('~Submit'); }


    async applyForJob() {

        await this.jobsButton.waitForDisplayed({ timeout: 5000 });
        await this.jobsButton.click(); // Click on the jobs button

        await this.searchBar.waitForDisplayed({ timeout: 5000 });
        await this.searchBar.click(); // Click on the search bar
        await this.searchBar.setValue("Drivers"); // Enter the job title

        await browser.pause(1000); // Wait for 2 seconds


        await this.clickAtCoordinates(350, 1050); // Click on the jobs button

        await this.EasyApplyButton.waitForDisplayed({ timeout: 5000 });
        await this.EasyApplyButton.click(); // Click on the easy apply button

        await this.emailField.waitForDisplayed({ timeout: 5000 });
        await this.emailField.click(); // Click on the email field

        await this.emailField.setValue("youssefahmed1819@gmail.com"); // Enter the email

        await this.phoneField.waitForDisplayed({ timeout: 5000 });
        await this.phoneField.click(); // Click on the phone field
        await this.phoneField.setValue("01000000000"); // Enter the phone number

        await this.SumbitButton.waitForDisplayed({ timeout: 5000 });
        await this.SumbitButton.click(); // Click on the submit button

        await this.ApplicationAppliedSuccessfully.waitForDisplayed({ timeout: 5000 });









    }

    get GetJob() { return $('~indrive\ncars'); }

    get ApplicatentAccepted() { return $('android=new UiSelector().className("android.widget.Button").instance(1)'); }



    async AcceptApplicatent() {

        await this.GetJob.waitForDisplayed({ timeout: 5000 });
        await this.GetJob.click(); // Click on the jobs button

        await this.scroll(500, 2000, 500, 100); // Scroll down to the easy apply button

        await this.clickAtCoordinates(500, 1800); // Click on the easy apply button

        await this.ApplicatentAccepted.waitForDisplayed({ timeout: 5000 });
        await this.ApplicatentAccepted.click(); // Click on the easy apply button


        await browser.pause(100); // Wait for 2 seconds
        await this.clickAtCoordinates(772, 1534); // Click on the easy apply button


 
        
    }

    async SaveJobAndREturnToIt() {

        await this.jobsButton.waitForDisplayed({ timeout: 5000 });
        await this.jobsButton.click(); // Click on the jobs button


        await this.SaveFirstJob.waitForDisplayed({ timeout: 5000 });
        await this.SaveFirstJob.click(); // Click on the save first job button

        await this.ListOfSavedJobs.waitForDisplayed({ timeout: 5000 });
        await this.ListOfSavedJobs.click(); // Click on the list of saved jobs button

        await this.CheckSavedJob.waitForDisplayed({ timeout: 5000 });


        









    }


    async SearchForJobs() {
        //await this.clickAtCoordinates(769, 2228); // Click on the jobs button
        await this.jobsButton.waitForDisplayed({ timeout: 5000 });
        await this.jobsButton.click(); // Click on the jobs button
        await this.searchBar.waitForDisplayed({ timeout: 5000 });
        await this.searchBar.click(); // Click on the search bar
        await this.searchBar.setValue("test"); // Enter the job title

        await browser.pause(2000); // Wait for 2 seconds
        await this.searchBar.clearValue(); // Clear the search bar

        await this.ResetFiltering.waitForDisplayed({ timeout: 5000 });
        await this.ResetFiltering.click(); // Click on the reset filtering button

        await this.FilterBylocation.waitForDisplayed({ timeout: 5000 });
        await this.FilterBylocation.click(); // Click on the location filter

        

        await this.ChosenLocation.waitForDisplayed({ timeout: 5000 });
        await this.ChosenLocation.click(); // Click on the chosen location

        await browser.pause(2000); // Wait for 2 seconds

        await this.ResetFiltering.waitForDisplayed({ timeout: 5000 });
        await this.ResetFiltering.click(); // Click on the reset filtering button

        await this.FilterByIndustry.waitForDisplayed({ timeout: 5000 });
        await this.FilterByIndustry.click(); // Click on the industry filter

        await this.ChosenIndustry.waitForDisplayed({ timeout: 5000 });
        await this.ChosenIndustry.click(); // Click on the chosen industry


        await browser.pause(2000); // Wait for 2 seconds
        await this.ResetFiltering.waitForDisplayed({ timeout: 5000 });





    }





    
}

export default new jobs();