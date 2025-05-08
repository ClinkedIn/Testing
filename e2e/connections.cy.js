
describe('Connections test suite',()=>{
    

    beforeEach(() => {
        cy.loginLive(Cypress.env('email'), Cypress.env('password'), { log: false });
        cy.wait(4500)
        cy.visit("https://www.lockedin-cufe.me/network")
        cy.wait(3000)
    });

    it('Search for user by name',()=>{
        cy.get("div[class='flex items-center bg-[#edf3f8] rounded-sm ml-2 w-90'] input[placeholder='Search']").type('Amira')
        cy.get("div[class='absolute left-28 mt-2 w-94 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto mx-auto hidden md:block'] li:nth-child(1)").click()
        cy.wait(3000)
        cy.get(".text-2xl.font-bold").should('have.text','Amira Schmelerrrrrr')
    })

    it('Search for user and connect',()=>{
        cy.get("div[class='flex items-center bg-[#edf3f8] rounded-sm ml-2 w-90'] input[placeholder='Search']").type('Amira')
        cy.get("div[class='absolute left-28 mt-2 w-94 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto mx-auto hidden md:block'] li:nth-child(1)").click()
        cy.wait(3000)
        cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > button:nth-child(1)').click()
        cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > button:nth-child(1)").should('have.text','Pending')
    })

    it('unblock user',()=>{
        cy.get("li:nth-child(2) button:nth-child(1)").click()
        cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(3) > button:nth-child(1)").click()
        cy.get("button[class='px-5 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700']").click()
        // cy.wait(3000)
        // cy.get(".text-2xl.font-bold").should('have.text','Amira Schmelerrrrrr')
    })
})