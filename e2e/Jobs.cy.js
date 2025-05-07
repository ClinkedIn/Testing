import { jobs, company, messaging } from '../support/selectors';

describe('Jobs Test Suite', () => {
  beforeEach(() => {
    cy.loginLive(Cypress.env('email'), Cypress.env('password'), { log: false });
    cy.wait(3000)
    cy.get(jobs.jobIcon).click();
  });

  it.skip('Search for jobs by industry', () => {  
    cy.get(jobs.searchIndustry).type("Marketing{enter}");
    cy.get(jobs.firstJob)
      .invoke('text')
      .then((name) => {
        expect(name).to.include('Marketing');
      });
  });

  it.skip('Filter jobs by company',()=>{ 

    cy.get(jobs.searchIndustry).type("Data Scientist{enter}");
    cy.get(jobs.filterByCompany).select("Kilback - Weber");
    cy.wait(4000)
    cy.get(jobs.filteredcompany)
    .invoke('text')
    .then((name) => {
      expect(name).to.include('Kilback - Weber');
    });
    cy.get(jobs.firstJob)
    .invoke('text')
    .then((name) => {
      expect(name).to.include('Data Scientist');
    });

  })

  it.skip('Save job for later', () => {
    cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(87) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)").click();
    cy.get(jobs.saveJob).click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Job saved!');
    });
    cy.go('back');
    // Get the saved job's name
    cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(87) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)")
      .invoke('text')
      .then((savedJobName) => {
        // Loop through job cards and look for matching title
        let matchFound = false;
        cy.get(jobs.myJobs).click();

        
        cy.get("div.flex-1.bg-white.pt-6.pb-6.mx-4.rounded-lg.shadow-md").each(($jobCard) => {
          cy.wrap($jobCard).find('p.text-blue-600').invoke('text').then((jobTitle) => {
            cy.log(`Job Title: ${jobTitle}`);
            if (jobTitle.trim().includes(savedJobName.trim())) {
              expect(jobTitle.trim()).to.include(savedJobName.trim());
              matchFound = true;
            }
          });
        }).then(() => {
          expect(matchFound, `Expected job titled "${savedJobName.trim()}" to appear in job list`).to.be.true;
        });
      });
  });

  it.skip('Save an already saved job for later / unsave', () => { 
    cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)").click();
    cy.get(jobs.saveJob).click();
    cy.wait(2000)
    cy.go('back');
    // Get the saved job's name
    cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)")
      .invoke('text')
      .then((savedJobName) => {
        // Loop through job cards and look for matching title
        let matchFound = false;
        cy.get(jobs.myJobs).click();

      
        cy.get("div.flex-1.bg-white.pt-6.pb-6.mx-4.rounded-lg.shadow-md").each(($jobCard) => {
          cy.wrap($jobCard).find('p.text-blue-600').invoke('text').then((jobTitle) => {
            cy.log(`Job Title: ${jobTitle}`);
            if (jobTitle.trim().includes(savedJobName.trim())) {
              expect(jobTitle.trim()).to.include(savedJobName.trim());
              matchFound = true;
            }
          });
        }).then(() => {
 
          expect(matchFound, `Expected job titled "${savedJobName.trim()}" to appear in job list`).to.be.false;
        });
      });

  });

  it.skip('Remove job from saved', () => { 
    cy.get(jobs.myJobs).click();
    cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)')
      .invoke('text')
      .then((savedJobName) => {
        const trimmedName = savedJobName.trim();
    cy.get(jobs.deleteFirst).click();
    cy.wait(4000)

        cy.get('.space-y-4.pl-6.pr-6 p.text-blue-600')
          .then(($titles) => {
            const allTitles = [...$titles].map(el => el.innerText.trim());
            expect(allTitles, `Job titled "${trimmedName}" should NOT appear in job list`).to.not.include(trimmedName);
          });
      });
  });

  it.skip('Apply for a job', () => { 
    cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(11) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)").click();
    cy.wait(2000);
    cy.get('.mr-4').click();
    cy.get(jobs.email).type(Cypress.env('email'));
    cy.get(jobs.countryCode).select(0);
    cy.get(jobs.mobile).type("01097526779");
    cy.get(jobs.next1).click();
    cy.get("input[placeholder='Your answer']").type('Yes')
    cy.get(jobs.apply).click();
    cy.get(jobs.jobIcon).click();

    cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(102) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)")
      .invoke('text')
      .then((savedJobName) => {
        // Loop through job cards and look for matching title
        let matchFound = false;
        cy.get(jobs.myJobs).click();
        cy.get('.space-x-3 > :nth-child(2)').click();


        cy.get("div.flex-1.bg-white.pt-6.pb-6.mx-4.rounded-lg.shadow-md").each(($jobCard) => {
          cy.wrap($jobCard).find('p.text-blue-600').invoke('text').then((jobTitle) => {
            if (jobTitle.trim() === savedJobName.trim()) {
              matchFound = true;
            }
          });
        }).then(() => {
          expect(matchFound, `Job titled "${savedJobName.trim()}" should appear in job list`).to.be.true;
        });
      });
  });

  it.skip('Post job',()=>{
    cy.get(jobs.postfreeJob).click()
    cy.get(company.jobTitle).type('Lab assistant')
    cy.get(company.company).type("company edited{enter}")
    cy.get(company.continueOnMyOwn).click()
    cy.wait(3000)
    cy.get(company.editJobRequirements).click()
    cy.get(company.editJobType).select('Contract')
    cy.get(company.continue).click()
    cy.wait(3000)
    cy.get(company.editScreening).click()
    cy.get(company.degreeQuestion).type('Biology')
    cy.get(company.mustHaveQualification).check()
    cy.get(company.addScreeningQustion).click()
    cy.get(company.backgrounsCheck).click()
    cy.get(company.mustHaveCheck).click()
    cy.get('.px-6').click()
    cy.wait(3000)
    cy.wait(3000)
    cy.get(jobs.myJobs).click()
    cy.get(jobs.postedJobs).click()
    cy.get(jobs.postedjobslist)
      .invoke('text')
      .then((name) => {
        expect(name).to.include('Lab assistant');
      });

  })

  it('Review application and contact applicant',()=>{
   
    cy.get(jobs.myJobs).click()
    cy.get(jobs.postedJobs).click()
    cy.wait(5000)
    cy.get(jobs.postedjobslist)
    .eq(1)
    .click()
    cy.get(jobs.applicant).click()
    cy.get(jobs.messageButton).click()
    cy.get(messaging.textArea).type('test')
    cy.get(messaging.sendMessage).click()
    cy.wait(4000)
    cy.get(messaging.messageList)
    .last()
    .should('exist')
    .should('be.visible')
    cy.get(messaging.lastMessage)
    .should('contain.text','You: test')

  })

  it.skip('Accept applicant',()=>{  

    cy.get(jobs.postedJobsText).click()
    cy.get(jobs.applicant).click()
    cy.get(jobs.acceptapplicant).click()
    cy.get(company.actualJobTitle)
      .invoke('text')
      .then((savedJobName) => {
        // Loop through job cards and look for matching title
        let matchFound = false;
        cy.get(jobs.myJobs).click();
        cy.get(jobs.acceptedTab).click();

        
        cy.get("div.flex-1.bg-white.pt-6.pb-6.mx-4.rounded-lg.shadow-md").each(($jobCard) => {
          cy.wrap($jobCard).find('p.text-blue-600').invoke('text').then((jobTitle) => {
            cy.log(`Job Title: ${jobTitle}`);
            if (jobTitle.trim().includes(savedJobName.trim())) {
              expect(jobTitle.trim()).to.include(savedJobName.trim());
              matchFound = true;
            }
          });
        }).then(() => {
    
          expect(matchFound, `Expected job titled "${savedJobName.trim()}" to appear in job list`).to.be.true;
        });
      });


  })

});



