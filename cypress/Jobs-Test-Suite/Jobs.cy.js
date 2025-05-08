import { jobs } from '../support/selectors';

describe('Jobs Test Suite',()=>{
    beforeEach(() => {
            cy.login(Cypress.env('email'), Cypress.env('password'), { log: false });
            cy.get(jobs.jobIcon).click()
        });

    it('Search for jobs by industry',()=>{

        cy.get(jobs.searchIndustry).type("Marketing{enter}")
        cy.get(jobs.firstJob)
        .invoke('text')
        .then((name) => {
         expect(industryText).to.include('Marketing');
        })

    })

    it.skip('Save job for later',()=>{

        cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(102) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)").click()
        cy.get(jobs.saveJob).click()
        cy.on('window:alert', (text) => {
            expect(text).to.equal('Job saved!');
          });
        cy.go('back');
        //Get the saved job's name
        cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(102) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)")
        .invoke('text')
        .then((savedJobName) => {
        //Loop through job cards and look for matching title
        let matchFound = false;
        cy.get(jobs.myJobs).click()

        //cy.get('.flex.items-start.justify-between.bg-white').each(($jobCard) => {
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
    })

    it.skip('Save an already saved job for later',()=>{

        cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)").click()
        cy.get(jobs.saveJob).click()
        cy.on('window:alert', (text) => {
            expect(text).to.equal('This job is already in your saved list');
          });

    })

    it.skip('Remove job from saved', () => {
        cy.get(jobs.myJobs).click();
        cy.get(jobs.deleteFirst).click();
    
        cy.get(jobs.firstJob)
          .invoke('text')
          .then((savedJobName) => {
            const trimmedName = savedJobName.trim();
    
            cy.get('.space-y-4.pl-6.pr-6 p.text-blue-600')
              .then(($titles) => {
                const allTitles = [...$titles].map(el => el.innerText.trim());
                expect(allTitles, `Job titled "${trimmedName}" should NOT appear in job list`).to.not.include(trimmedName);
              });
          });
    });

    it('Apply for a job',()=>{

        cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(102) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)").click()
        cy.wait(2000)
        cy.get('.mr-4').click()
        cy.get(jobs.email).type(Cypress.env('email'))
        cy.get(jobs.countryCode).select(0)
        cy.get(jobs.mobile).type("01097526779")
        cy.get(jobs.next1).click()
        cy.get(jobs.remote).type("anth")
        cy.get(jobs.customQuestion).type("anthh")
        cy.get(jobs.expertise).type("anthhh")
        cy.get(jobs.onsite).type("anthhh")
        cy.get(jobs.apply).click()
        cy.get(jobs.jobIcon).click()
        cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(102) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)")
        .invoke('text')
        .then((savedJobName) => {
        //Loop through job cards and look for matching title
        let matchFound = false;
        cy.get(jobs.myJobs).click()
        cy.get('.space-x-3 > :nth-child(2)').click()

        //cy.get('.flex.items-start.justify-between.bg-white').each(($jobCard) => {
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


    })
    

})


// cy.get("div.flex-1.bg-white.shadow-md.rounded-lg.p-6.mr-\\[315px\\]")
// .each(($jobCard) => {
//     cy.wrap($jobCard)
//     .find("p.text-blue-600.font-semibold.hover\\:underline")
//     .then(($p) => {
//         const jobTitle = $p.text().trim();
//         cy.log("Found job title: " + jobTitle);

//         // Example: click on a specific job
//         if (jobTitle.includes("UX")) {
//         cy.wrap($p).click();
//         }

//         // You can also do assertions here
//         // expect(jobTitle).to.include("Engineer");
//     });
// });