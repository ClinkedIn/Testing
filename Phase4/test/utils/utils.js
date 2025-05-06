export async function restartApp() {
    console.log('Restarting the app...');
    
    try {
        await driver.terminateApp('com.example.lockedin');  // Close LinkedIn App
        await driver.activateApp('com.example.lockedin');   // Reopen LinkedIn App
    } catch (error) {
        console.error('Error restarting app:', error);
    }

    await browser.pause(5000); // Allow time for restart
}




async function scroll(direction) {
    await driver.execute('mobile: scroll', { direction });
}
