describe("Page Load", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://be-experience-exchange-b6ae91ef3c0f.herokuapp.com/api/v1/users/14",
      {
        status: 200,
        fixture: "currentUser",
      }
    ).as("GetCurrentUser");
    cy.intercept(
      "GET",
      "https://be-experience-exchange-b6ae91ef3c0f.herokuapp.com/api/v1/users/15",
      {
        status: 200,
        fixture: "TylerInfo",
      }
    ).as("GetTyler");
    cy.intercept(
      "GET",
      "https://be-experience-exchange-b6ae91ef3c0f.herokuapp.com/api/v1/users/14/meetings",
      {
        status: 200,
        fixture: "MyMeetings",
      }
    )
      .as("GetMyMeetings")
      .visit("http://localhost:3000/");
  });
  it("should navigate to the home page, and see a form and button to create a profile, and a button to use the App as a demo user", () => {
    cy.get(".sign-up-container");
    cy.get("h2").should(
      "have.text",
      "Let’s get you started with an Experience Exchange account"
    );
    cy.get('.create-account-input[name="first_name"]').should(
      "have.attr",
      "placeholder",
      "First name"
    );
    cy.get('.create-account-input[name="last_name"]').should(
      "have.attr",
      "placeholder",
      "Last name"
    );
    cy.get('.create-account-input[name="email"]').should(
      "have.attr",
      "placeholder",
      "Email"
    );
    cy.get('.create-account-input[name="street"]').should(
      "have.attr",
      "placeholder",
      "Street"
    );
    cy.get('.create-account-input[name="city"]').should(
      "have.attr",
      "placeholder",
      "City"
    );
    cy.get('.create-account-input[name="state"]').should(
      "have.attr",
      "placeholder",
      "State"
    );
    cy.get('.create-account-input[name="zipcode"]').should(
      "have.attr",
      "placeholder",
      "Zip Code"
    );
    cy.get('label[for="about"]').contains("Tell us about yourself");
    cy.get(".create-account-checkbox").should("exist");
    cy.get(".create-account-checkbox").should("not.be.checked");
    cy.get(".post-user-btn").should("have.text", "Create Account");
    cy.get(".demo-user-btn").should("have.text", "Login as a Demo User");
  });
  it("should have a demo user profile that can use the app", () => {
    cy.get(".demo-user-btn").should("have.text", "Login as a Demo User");
    cy.get(".demo-user-btn").click();
    cy.url().should("include", "/dashboard/14");
    cy.get(".current-user-dash .meetings-container").should("exist");
    cy.get(".profile-name").should("have.text", "Jackson Williams");
    cy.get(".profile-about").should("have.text", "About me");
    cy.get(".profile-about-text").should(
      "have.text",
      `Hey there! I'm Jackson, and life's a garden – dig it! 🌱 When I'm not tending to my plants, you can find me crafting something beautiful with wood or tickling the ivories on the piano. 🪚🎶`
    );
    cy.get(".profile-location").should("have.text", "Location");
    cy.get(".profile-location-text").should("have.text", "Brooklyn, New York");
    cy.get(".profile-email").should("have.text", "Email");
    cy.get(".profile-email-text").should("have.text", "jwilliams@gmail.com");
    // skills component
    cy.get(".skills-section .skill-list").should("have.length", 3);
    cy.get(".tag-removal").should("have.length", 3);
    cy.get(".skill-input").should("have.attr", "type", "text");
    cy.get(".skill-input").should(
      "have.attr",
      "placeholder",
      "Type skill name"
    );
    cy.get(".proficiency-input").should("have.attr", "name", "proficiency");
    cy.get(".proficiency-input").should("have.value", "0");
    cy.get(".add-skill-btn").should("exist");
    cy.get(".add-skill-btn").should("have.text", "Add Skill");

    const userSkills = [
      { name: "Ruby", proficiency: 5 },
      { name: "Rails", proficiency: 5 },
      { name: "knitting", proficiency: 1 },
    ];

    userSkills.forEach((skill, index) => {
      cy.get(`.skills-section .skill-list:eq(${index}) .skill-text`)
        .invoke("text")
        .invoke("trim")
        .should("eq", skill.name.trim());
    });
    // Meetings component
    cy.get(".meetings-container").should("exist");
    cy.get(".meetings-title").should("have.text", "My Meetings");
    cy.get(".meeting-card").should("have.length", 2);
    cy.get(".meetings-toggle").click();
    cy.get(".meetings-title").should("have.text", "My Meeting Requests");
    cy.get(".meeting-card-request").should("have.length", 2);
  });
});
