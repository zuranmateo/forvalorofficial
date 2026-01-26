describe('check', ()=>{
    it('login and logout', ()=>{
        cy.visit('http://localhost:3000')

        cy.get('a[href*="login"]').click()

        //registracija
        //cy.get('a[href*="register"]').click()
        //cy.get('input[type="text"]').type("EEmma");
        //cy.get('input[type="email"]').type("emask1111@gmail.com");
        //cy.get('input[placeholder="Password"]').type("111");
        //cy.get('input[placeholder="Repeat Password"]').type("111");
        //cy.get('button[type="submit"][name="reg"]').click();

        cy.url({timeout: 10000}).should('include', '/login')

        cy.get('input[type="email"]').type("emask1111@gmail.com");

        cy.get('input[type="password"]').type("111");

        cy.get('button[type="submit"][name="login"]').click();

        cy.get('a[href*="updates"]').first().click()

        cy.get('a[href*="updates/update"]').first().click()

        cy.get('a[href="/"]').first().click()

        cy.get('a[href="/getgame"]').first().click()

        cy.get('button[type="submit"][name="btn"]').click(); 

        cy.get('a[href="/comments"]').first().click()

        cy.get('a[href*="/CreateComment"]').first().click()

        //komentiranje
        //cy.get('input[id="title"]').type("comment");
        //cy.get('button[type="submit"][name="subm"]').click()

        cy.get('a[href*="/user"]').first().click()

        cy.url().should('include', '/user/')

        cy.get('.profile-card').should('exist')

        cy.get('[data-cy="edit-profile"]').click()
        
        cy.get('button[type="submit"][name="logout"]').click();
    })
})