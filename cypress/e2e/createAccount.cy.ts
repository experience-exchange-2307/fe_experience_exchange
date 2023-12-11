describe('create account form', () => {
  beforeEach(() => {
    cy.intercept("POST", "https://be-experience-exchange-b6ae91ef3c0f.herokuapp.com/api/v1/users/", {
      statusCode: 201,
      body: {
        "data": {
          "attributes": {
            "about": "Hey there! I'm Jackson, and life's a garden – dig it! 🌱 When I'm not tending to my plants, you can find me crafting something beautiful with wood or tickling the ivories on the piano. 🪚🎶",
            "address": {
              "street": "402 Clinton St.",
              "city": "Brooklyn",
              "state": "New York",
              "zipcode": "11217"
            },
            "email": "jwilliams@gmail.com",
            "first_name": "Jackson",
            "is_remote": true,
            "last_name": "Williams",
            "lat": 40.6782,
            "lon": 73.9442,
            "skills": [
              { "name": "Woodworking", "proficiency": 5 },
              { "name": "Gardening", "proficiency": 4 },
              { "name": "Bird watching", "proficiency": 2 },
              { "name": "Piano", "proficiency": 3 },
              { "name": "Origami", "proficiency": 1 },
              { "name": "Poetry", "proficiency": 3 }
            ]
          }
        },
        "id": "55231",
        "type": "user"
      }
    })
    .as("postNewUser");

    cy.visit('http://localhost:3000/');
  });

  it('should display create account form elements and allow a user to sign up', () => {
    cy.get('.sign-up-container').find("h2").should("have.text", "Let’s get you started with an Experience Exchange account");
    cy.get('.first-name-label').should("have.text", "First Name");
    cy.get('input[name="first_name"]').type("Jackson").should("have.value", "Jackson");
    cy.get('.last-name-label').should("have.text", "Last Name");
    cy.get('input[name="last_name"]').type("Williams").should("have.value", "Williams");
    cy.get('.email-label').should("have.text", "Email");
    cy.get('input[name="email"]').type("jwilliams@gmail.com").should("have.value", "jwilliams@gmail.com");
    cy.get('.street-label').should("have.text", "Street");
    cy.get('input[name="street"]').type("402 Clinton St.").should("have.value", "402 Clinton St.");
    cy.get('.city-label').should("have.text", "City");
    cy.get('input[name="city"]').type("Brooklyn").should("have.value", "Brooklyn");
    cy.get('.state-label').should("have.text", "State");
    cy.get('input[name="state"]').type("New York").should("have.value", "New York");
    cy.get('.zip-code-label').should("have.text", "Zip Code");
    cy.get('input[name="zipcode"]').type("11217").should("have.value", "11217");
    cy.get('.about-label').should("have.text", "Tell us about yourself");
    cy.get('textarea').type("Hey there! I'm Jackson, and life's a garden – dig it! 🌱 When I'm not tending to my plants, you can find me crafting something beautiful with wood or tickling the ivories on the piano. 🪚🎶").should("have.value", "Hey there! I'm Jackson, and life's a garden – dig it! 🌱 When I'm not tending to my plants, you can find me crafting something beautiful with wood or tickling the ivories on the piano. 🪚🎶");
    cy.get('.remote-label').should("have.text", "Remote");
    cy.get('input[name="is_remote"]').check().should('be.checked');
    cy.get(".demo-user-btn").should("exist");
    // cy.get(".create-account-btn").should("exist").click();

    // cy.wait("@postNewUser");
    // cy.url().should('eq', 'http://localhost:3000/dashboard/55231');
    // cy.url().should('eq', 'http://localhost:3000/loading');
  });
});
