from selenium.webdriver.common.by import By

# Login Page Selectors
LOGIN_BUTTON = (By.CLASS_NAME, "btn__primary--large")  # Correct
USERNAME_FIELD = (By.ID, "username")  # Correct
PASSWORD_FIELD = (By.ID, "password")  # Correct
SIGNIN_BUTTON = (By.CSS_SELECTOR, ".nav__button-secondary")  # FIXED (use CSS selector)

# Signup Page Selectors
SIGNUP_BUTTON = (By.CLASS_NAME, "sign-in-form__join-cta")
USERNAME = (By.NAME, "email-address")  
PASSWORD = (By.NAME, "password") 
SUBMIT_SIGNUP_BUTTON = (By.CLASS_NAME, "join-form-submit") 
