import { $, browser } from '@wdio/globals';

class admin {


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

    get adminJobsPage() { return $('android='); }
    get allJobs() { return $('~All Jobs'); }
    get Active() { return $('android=new UiSelector().description("Active")'); }
    get InActive() { return $('android=new UiSelector().description("Inactive")'); }

    get ActivateInActiveJob() { return $('android=new UiSelector().description("Activate").instance(0)'); }

    get DeactivateActiveJob() { return $('android=new UiSelector().description("Deactivate").instance(0)'); }


    get ConfirmChanges() { return $('android=new UiSelector().description("Confirm").instance(0)'); }

    get deleteJob() { return $('android=new UiSelector().description("Delete").instance(0)'); }

    async adminFunction(){
        await this.scroll(500, 2100 , 500 , 200); 
        await browser.pause(1000); 
        await this.scroll(500, 2100, 500, 200); 
        await browser.pause(1000); 
        await this.scroll(500, 2100, 500, 200); 
        await browser.pause(1000);
        await this.scroll(500, 2100, 500, 200);
        await browser.pause(1000);
        await this.scroll(500, 2000, 500, 2000);
        await browser.pause(1000);

        //adminJobsPage.click();

        await this.clickAtCoordinates(900, 2250); // Click on the admin jobs page button
        await browser.pause(1000);
        
        await this.InActive.waitForDisplayed({ timeout: 5000 });
        await this.InActive.click();

        await browser.pause(500);

        await this.ActivateInActiveJob.waitForDisplayed({ timeout: 5000 });
        await this.ActivateInActiveJob.click();

        await this.ConfirmChanges.waitForDisplayed({ timeout: 5000 });
        await this.ConfirmChanges.click();
        await browser.pause(500);

        await this.deleteJob.waitForDisplayed({ timeout: 5000 });
        await this.deleteJob.click();

        await this.ConfirmChanges.waitForDisplayed({ timeout: 5000 });
        await this.ConfirmChanges.click();
        await browser.pause(500);

        await this.Active.waitForDisplayed({ timeout: 5000 });
        await this.Active.click();

        await this.DeactivateActiveJob.waitForDisplayed({ timeout: 5000 });
        await this.DeactivateActiveJob.click();

        await this.ConfirmChanges.waitForDisplayed({ timeout: 5000 });
        await this.ConfirmChanges.click();
        await browser.pause(500);


    }



    

    
}

export default new admin();