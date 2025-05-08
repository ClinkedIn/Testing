import { company } from '../support/selectors'; 

describe('Company Test Suite', () => {

  it('Create company profile', () => { //preview, backend, make test reusable

    cy.visit('http://localhost:5173/company/setup/new')  //visit it from for business icon
    cy.get(company.name).type('alia')
    cy.get(company.address).type('anth')
    cy.get(company.website).type('http://bake.com')
    cy.get(company.industry).type("catering")
    //changes in preview
    cy.get(company.organizationSize).select("1-10 employees")
    cy.get(company.organizationType).select("Self-employed")
    //image is visible here and in preview
    const uploadedImage = 'test-images/bakery.jpg';
    const placeholder = '/Images/CompanyLogo.png'; 


    cy.get(company.uploadButton).click();
    cy.get(company.uploadImage).attachFile(uploadedImage);

    // // Check that image has changed and equals expected upload URL
    // cy.get(company.imagePreview)
    // .should('have.attr', 'src')
    // .and('include', uploadedImage);
    cy.get(company.imagePreview).should('have.attr', 'src').and('match', /^blob:/);

    cy.get(company.reset).click();

    // Assert it’s back to the dummy image
    cy.get(company.imagePreview)
      .should('have.attr', 'src')
      .and('include', placeholder); 
    
    cy.get(company.uploadImage).attachFile(uploadedImage);
    cy.get(company.tagline).type("A bakery")
    cy.get(company.checkbox).check()
    cy.get(company.createProfile).click()

  })
})