# LockedIn Testing Framework

This repository contains a comprehensive testing framework for end-to-end (E2E) testing of web and mobile applications. It leverages tools like Cypress, Appium, and Selenium to ensure robust and reliable test coverage.

## Tools and Frameworks

- **Cypress**: For web application testing.
- **Appium**: For mobile application testing.
- **Selenium**: For cross-browser testing.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Java (for Selenium and Appium)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ClinkedIn/Testing/
   cd Testing
   ```

2. Install dependencies for Appium:
```bash
  npm install
  cd Appium
  npm install
  cd ..
```
3. Running Tests
  -  Cypress Tests
  -  Configure Cypress in cypress.config.js.
  
4. Run Cypress tests:
   ```bash
   npx cypress open
   ```
5. Run Appium tests:
  -  Appium Tests
  -  Configure WebdriverIO in Appium/wdio.conf.js.
```bash
npx wdio Appium/wdio.conf.js
```
6. Selenium Tests
  -  Configure Selenium in the selenium/ directory.
  -  Run Selenium tests using your preferred setup.
