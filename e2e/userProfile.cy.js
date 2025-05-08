import { profile, settings } from "../support/selectors";

describe('User Profile Test Suite',()=>{
    

    beforeEach(() => {
        cy.login(Cypress.env('email'), Cypress.env('password'), { log: false });
        cy.wait(4500)
        cy.visit("http://localhost:5173/profile")
        cy.wait(3000)
    });

    it('Edit Name',()=>{   

      
        cy.get(profile.editName).click()
        cy.get(profile.firstName).type("Alia")
        cy.get(profile.lastName).type("Tarek")
        cy.get(profile.saveName).click()
        cy.get(profile.name).should('have.text','Alia Tarek')
    
    
    })

    it('Edit About and Contact Info',()=>{   
        //Edit contact info
        cy.get(profile.editAbout).click()
        cy.get(profile.aboutDescription).clear().type('New Desciption')
        cy.get(profile.phone).clear().type("01097426448")
        cy.get(profile.phoneType).select('Mobile')
        cy.get(profile.address).clear().type('jersey')
        cy.get(profile.websiteURL).clear().type('https://anth.com')
        cy.get(profile.websiteType).select('Portfolio')
        cy.get(profile.save).click()
        //Check it's saved
        cy.get(profile.finalDescription).should('have.text','New Desciption')
        cy.get(profile.finalPhone).should('have.text',"01097426448")
        cy.get(profile.finalPhoneType).should('have.text','Mobile')
        cy.get(profile.finalAddress).should('have.text','jersey')
        cy.get(profile.finalWebsite).should('have.text','https://anth.com')
        cy.get(profile.finalWebsiteTypeabout).should('have.text','Portfolio Website')


    })

    it('Edit Contact info with invalid url',()=>{  

        cy.get(profile.editAbout).click()
        cy.get(profile.websiteURL).clear().type('https://anth@anth.com') 
        cy.get(profile.save).click()
        cy.get(profile.urlError).should('have.text',"Please enter a valid website URL")
        cy.get(profile.CancelURL).click()
        cy.get(profile.finalWebsite).invoke('text').should('not.have.text','https://anth@anth.com')
    })

    it('Add Experience with future start date',()=>{  
        cy.get(profile.addExperience).click()
        cy.get(profile.jobTitle).select('Data Scientist')
        cy.get(profile.company).select('IBM')
        cy.get(profile.employmentType).select('Full Time')
        cy.get(profile.location).type('New York')
        cy.get(profile.locationType).select('Onsite')
        cy.get(profile.startMonth).select('December')       
        cy.get(profile.startYear).select('2025')
        cy.get(profile.currentlyWorking).check()
       
        cy.get(profile.jobDescription).clear().type('anth')
        cy.get(profile.foundVia).select('LinkedIn') 
        cy.get(profile.saveExperience).click()
        cy.get(profile.expOkay).click()

        //check it's saved
        cy.get(profile.newJobTitle).should('have.text','Data Scientist')
        cy.get(profile.newCompany).should('have.text','IBM')
        cy.get(profile.newJobType).should('have.text','Full Time')
        cy.get(profile.newLocation).should('have.text',' New York')
        //cy.get(profile.newDate).should('have.text','2025 - Present')
        cy.get(profile.newDescription).should('have.text','anth')
        cy.get(profile.newFoundVia).should('have.text','LinkedIn')

    })
  
    it('Add Education',()=>{ 

        //Add education
        cy.wait(4000)
        cy.get(profile.newEducation).click()
        cy.get(profile.school).select('Cairo University')
        cy.get(profile.degree).select("Master's")
        cy.get(profile.fieldOfStudy).select('Biology')
        cy.get(profile.startMonthe).select('January')
        cy.get(profile.startYeare).select('2021')
        cy.get(profile.currentlyStudying).check()
        cy.get(profile.grade).type('GPA 3.5')
        cy.get(profile.activities).type('Debate team')
        cy.get(profile.educationDescription).type('anth')
        cy.get(profile.saveEd).click()
        cy.get(profile.edOkay).click()

        //check it's correct
        cy.get(profile.actualSchool).should('have.text','Cairo University')
        cy.get(profile.actualDegreeandField).should('have.text',"Master's, Biology")
        cy.get(profile.actualDate).should('have.text','2021 - Present')
        cy.get(profile.actualGrade).should('have.text','Grade: GPA 3.5')
        cy.get(profile.actualDescription).should('have.text','anth')

    })

    it('Type skill',()=>{

        cy.get(profile.addSkills).click()
        cy.get(profile.writeSkill).type('Python')
        cy.get(profile.save).click()
        cy.get(profile.addedSkill).should('have.text','Python')

    })

    it('Add an existing skill',()=>{ 
        cy.get(profile.addSkills).click()
        cy.get(profile.writeSkill).type('Python')
        cy.get(profile.save).click()
        cy.get(profile.save).should('be.visible')

    })

    it('Add a common skill',()=>{ 

        cy.get(profile.addSkills).click()
        cy.get(profile.commonSkill).click()
        cy.get(profile.save).click()
        cy.get(profile.addedSkill).should('have.text','CSS')

    })

    it("View a user's profile / endorse a skill",()=>{  
        cy.visit('http://localhost:5173/user/680d2019fac27f2584052db8');
        cy.wait(6000)

        cy.get(profile.endorsmentCount)
          .invoke('text')
          .then((text) => {
            const initialCount = parseInt(text.trim().charAt(0), 10);
        
            // Click the endorse button
            cy.get(profile.endorse).click();
        
            // Check if the count increased by 1
            cy.get(profile.endorsmentCount)
              .invoke('text')
              .then((newText) => {
                const newCount = parseInt(newText.trim(), 10);
             
              });
          });
          cy.get(profile.endorsmentCount).click()
          cy.wait(4000)
          cy.get(profile.endorser).invoke('text').should('contain','Mohamed Elsayed')

    })

    it('Private visibility',()=>{ 

        cy.visit('http://localhost:5173/settings')
        cy.get(settings.visibility).select('Private')
        cy.login('Zion.Reinger@gmail.com', 'password123', { log: false });
        cy.get(profile.searchName).type('Mohamed Elsayed{enter}')
        cy.get(profile.visibilityText).should('have.text','This profile has restricted access. This profile is private')
    })


    
})

