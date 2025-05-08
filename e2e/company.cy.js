import { company } from '../support/selectors'; 

describe('Company Test Suite', () => {
  beforeEach(() => {
    cy.login(Cypress.env('email'), Cypress.env('password'), { log: false });
    cy.wait(7000)
  });


  it('Create company profile', () => {  
 
    cy.visit('http://localhost:5173/company/setup/new')  
    cy.get(company.name).type("alia's company 3.0")
    cy.get(company.address).type('trial501134456e45656')
    cy.get(company.location).type('Cairo, Egypt')
    cy.get(company.website).type('http://healthcare.com')
    cy.get(company.industry).type("tutoring services or something")
    //changes in preview
    cy.get(company.organizationSize).select("11-50 employees")
    cy.get(company.organizationType).select("Educational")
    //image is visible here and in preview
    const uploadedImage = 'test-images/bakery.jpg';
    const placeholder = '/Images/CompanyLogo.png'; 


    cy.get(company.uploadButton).click();
    cy.get(company.uploadImage).attachFile(uploadedImage);


    cy.get(company.imagePreview).should('have.attr', 'src').and('match', /^blob:/);
    cy.get(company.reset).click();

    // Assert it’s back to the dummy image
    cy.get(company.imagePreview)
      .should('have.attr', 'src')
      .and('include', placeholder); 
    
    cy.get(company.uploadImage).attachFile(uploadedImage);
    cy.get(company.tagline).type("A tutoring business")
    cy.get(company.checkbox).check()
    cy.get(company.createProfile).click()
    cy.wait(14000)

    //check company is created
    cy.get(company.actualName).should('have.text',"alia's company 3.0")
    cy.get(company.actualLocation).should('have.text',"Cairo, Egypt")
    cy.get(company.actualIndustry).should('have.text',"tutoring services or something")
    cy.get(company.actualSize).should('have.text',"11-50 employees")

  })

  it('Edit company information',()=>{ 

    cy.visit('http://localhost:5173/company/6818c450ff2bc14ef687c6de/admin/Feed')
    cy.wait(7000)
    cy.get(company.editInfo).click()
    cy.get(company.name).clear().type("alia's company edited")
    cy.get(company.location).type('Cairo, Egypt')
    cy.get(company.organizationType).select("Educational")
    cy.get(company.updateInfo).click()
    cy.get(company.actualName).should('have.text',"alia's company edited")

  })

  it('Post a job',()=>{ 

    cy.visit('http://localhost:5173/company/6818c450ff2bc14ef687c6de/admin/Feed')
    cy.wait(7000)
    cy.get(company.postJob).click()
    cy.get(company.jobTitle).type('chef manager assistant')
    cy.get(company.company).type("alia's company edited{enter}")
    cy.get(company.continueOnMyOwn).click()
    cy.wait(3000)
    cy.get(company.editJobRequirements).click()
    cy.get(company.editJobType).select('Contract')
    cy.get(company.continue).click()
    cy.get(company.editScreening).click()
    cy.get(company.degreeQuestion).type('Culinary arts')
    cy.get(company.mustHaveQualification).check()
    cy.get(company.addScreeningQustion).click()
    cy.get(company.backgrounsCheck).click()
    cy.get(company.mustHaveCheck).click()
    cy.get(company.continuetwo).click()
    cy.get(company.actualedAnswer).should('have.text','Culinary arts')
    cy.get(company.actualbackAnswer).should('have.text','Yes')
    cy.get(company.continuethree).click()
    cy.get(company.actualJobTitle).should('have.text','chef manager')
    //checking job is in jobs manually

  })

  it.skip('Apply for a job',()=>{

    cy.login('Sidney55@gmail.com', 'password123', { log: false });
    cy.visit('http://localhost:5173/company/6818c450ff2bc14ef687c6de')
    cy.wait(5000)
    cy.get(company.jobs).click()
    cy.get(company.applyJob).click()
    cy.wait(4000)
    cy.get(company.email).type('Zion.Reinger@mailinator.com')
    cy.get(company.phoneNumber).type('01087946537')
    cy.get(company.firstNext).click()
    cy.get(company.educationField).type('Culinary Arts')
   // cy.get(company.backgroundCheckField).type('Yes')
    cy.get(company.submit).click()
    
    cy.login(Cypress.env('email'), Cypress.env('password'), { log: false });
    cy.visit('http://localhost:5173/company/6818c450ff2bc14ef687c6de')
    cy.get(company.showasAdmin).click()
    cy.get(company.jobs).click()
    cy.get(company.manageJob).click()
    cy.get(company.applicantCount).should('have.text','2 applicants')

  })

  it.skip("Apply for a job while not meeting it's requirements (autoreject on)",()=>{ 
    cy.login('Sidney55@gmail.com', 'password123', { log: false });
    cy.visit('http://localhost:5173/company/6815f8926923d7dbff04dd93')
    cy.wait(5000)
    cy.get(company.jobs).click()
    cy.get(company.applyjob2).click()
    //cy.get(company.email).type('Sidney55@gmail.com')
    cy.get(company.phoneNumber).type('01087946537')
    cy.get(company.firstNext).click()
    //cy.get(company.educationField).type('Culinary Arts')
   // cy.get(company.backgroundCheckField).type('Yes')
    cy.get(company.submit).click()
    
    cy.login(Cypress.env('email'), Cypress.env('password'), { log: false });
    cy.visit('http://localhost:5173/company/6815f8926923d7dbff04dd93')
    cy.get(company.showasAdmin).click()
    cy.get(company.jobs).click()
    cy.get(company.manageJob2).click()
    cy.get(company.applicantCount).should('have.text','2 applicants')
    cy.get(company.status).should('have.text','rejected')

  })

  it.skip('Accept applicant',()=>{ 
    cy.visit('http://localhost:5173/company/6815f8926923d7dbff04dd93')
    cy.get(company.showasAdmin).click()
    cy.get(company.jobs).click()
    cy.get(company.manageJob2).click()
    cy.get(company.clickApplicant).click()
    cy.get(company.acceptTest).click()
    cy.get(company.acceptTest).should('have.text','accepted')
  })

  it.skip('Manage jobs/ analytics',()=>{ 

    cy.visit('http://localhost:5173/company/6815f8926923d7dbff04dd93')
    cy.get(company.showasAdmin).click()
    cy.get(company.analytics).click()
    cy.get(company.firstDate).invoke('val', '02/06/2025').trigger('change');
    cy.get(company.lastDate).invoke('val', '02/07/2025').trigger('change');
    cy.get(company.totalFollowers).should('have.text','0')

  })

})



//empty fields, invalid url


//bugs:
//should tell user if they leave a required field empty


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//didnt do
//-change rejection settings
//edit job


//module is missing:
//-updates and announcements