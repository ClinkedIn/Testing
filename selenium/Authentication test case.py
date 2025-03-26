from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
import Locators
import config


driver = webdriver.Chrome() 

# Open LinkedIn and login
driver.get("https://www.linkedin.com/home")
driver.find_element(*Locators.SIGNIN_BUTTON).click()
driver.find_element(*Locators.USERNAME_FIELD).send_keys(config.USERNAME)
driver.find_element(*Locators.PASSWORD_FIELD).send_keys(config.PASSWORD)
driver.find_element(*Locators.LOGIN_BUTTON).click()

driver.execute_script("window.open('about:blank');")


window_handles = driver.window_handles
driver.switch_to.window(window_handles[1]) 


driver.get("https://www.linkedin.com/signup") #this is sufficient instead of logging out and attempting to log in

current_url = driver.current_url
print("Current URL:", current_url)

if "feed" in current_url:
    print("Linkedin Successfuly block signup attempt while login")
else:
    print("Redirection failed.")

driver.quit()
