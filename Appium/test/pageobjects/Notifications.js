import { $, browser } from '@wdio/globals';

class Notifications {

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

    get NotificationsButton() { return $('~Notifications'); }
    get OptioninstanceNumeber12_markedAsSeen() { return $('android=new UiSelector().className("android.widget.Button").instance(12)'); }
    get OptioninstanceNumeber1_unmarkedAsSeen() { return $('android=new UiSelector().className("android.widget.Button").instance(8)'); }

    get DeleteNotificationButton() { return $('~Delete notification'); }

    get notificationDeleted() { return $('~Notification deleted.'); }
    get closeUndoPopup() { return $('~✖'); }

    get BackToNotificationsButton() { return $('~Back'); }

    get NotificationUnSeen(){ return $('~Mohamed Elsayed reacted with celebrate to your post\n1h'); }

    async Notifications() {
        await this.clickAtCoordinates(769, 2228); 

        await this.OptioninstanceNumeber12_markedAsSeen.waitForDisplayed({ timeout: 5000 });
        await this.OptioninstanceNumeber12_markedAsSeen.click(); 

        await this.DeleteNotificationButton.waitForDisplayed({ timeout: 5000 });
        await this.DeleteNotificationButton.click();

        await this.notificationDeleted.waitForDisplayed({ timeout: 5000 });

        await this.closeUndoPopup.waitForDisplayed({ timeout: 5000 });
        await this.closeUndoPopup.click();

        //await this.NotificationUnSeen.waitForDisplayed({ timeout: 5000 });
        await this.clickAtCoordinates(500,500);

        await this.BackToNotificationsButton.waitForDisplayed({ timeout: 5000 });
        await this.BackToNotificationsButton.click();

        await browser.pause(2000); 

        

    }

    
}

export default new Notifications();