describe("a user should be able to search by keyword", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://be-experience-exchange-b6ae91ef3c0f.herokuapp.com/api/v1/users/14",
      {
        status: 200,
        fixture: "currentUser",
      }
    ).as("GetCurrentUser")
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
    ).as("GetMyMeetings");
    cy.intercept(
      "GET",
      "https://be-experience-exchange-b6ae91ef3c0f.herokuapp.com/api/v1/search_skills?query=piano&user_id=*",
      {
        status: 200,
        fixture: "searchResults",
      }
    )
      .as("searchPiano")
      .visit("http://localhost:3000/");
  });

  it("should have a controlled search form that displays results when submit button is clicked", () => {
    cy.get('.demo-user-btn').click()
    cy.get('.nav-bar-text').last().click()
    cy.get(".search-title").contains("p", "Find people near you");
    cy.get(".react-autosuggest__input").type("piano");
    cy.get(".search-submit-btn").click()
    .wait("@searchPiano");
    cy.url().should("include", "/search/piano");
    cy.get(".search-results-qty").contains("h2", "Showing 2 Results for piano");
    cy.get(".result-card")
      .should("have.length", 2)
      .get(".result-card")
      .first()
      .contains("p", "Tyler Blackmon")
      .get(".result-card")
      .first()
      .contains("p", "Skills:")
      .get(".result-card")
      .first()
      .contains("p", "Ruby")
      .get(".result-card")
      .first()
      .contains("p", "Piano")
      .get(".result-card")
      .first()
      .contains("p", "1 mi.")
      .get(".result-card")
      .last()
      .contains("p", "Jen Ziel")
      .get(".result-card")
      .last()
      .contains("p", "Skills:")
      .get(".result-card")
      .last()
      .contains("p", "piano")
      .get(".result-card")
      .last()
      .contains("p", "knitting")
      .get(".result-card")
      .last()
      .contains("p", "juggling")
      .get(".result-card")
      .last()
      .contains("p", "Remote");
    cy.get("#remote").click();
    cy.url().should("include", "/search/piano");
    cy.get(".search-results-qty").contains("h2", "Showing 1 Results for piano");
    cy.get(".result-card")
      .should("have.length", 1)
      .get(".result-card")
      .last()
      .contains("p", "Jen Ziel")
      .get(".result-card")
      .last()
      .contains("p", "Skills:")
      .get(".result-card")
      .last()
      .contains("p", "piano")
      .get(".result-card")
      .last()
      .contains("p", "knitting")
      .get(".result-card")
      .last()
      .contains("p", "juggling");
    cy.get(".result-card").first().contains("p", "Remote");
    cy.get("#remote").click();
    cy.get(".result-card").should("have.length", 2);
    cy.get(".search-results-qty").contains("h2", "Showing 2 Results for piano");
    cy.get(".result-card").first().click();
    cy.url().should("include", "/dashboard/15");
    // cy.get('.back-to-search-btn').should('be.visible')
  });
});
