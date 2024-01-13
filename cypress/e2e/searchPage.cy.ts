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
      cy.intercept(
        "GET",
        "https://be-experience-exchange-b6ae91ef3c0f.herokuapp.com/api/v1/search_skills?query=juggling&user_id=*",
        {
          status: 200,
          fixture: "jugglers",
        }
      )
        .as("searchJuggling")
      cy.intercept(
        "GET",
        "https://be-experience-exchange-b6ae91ef3c0f.herokuapp.com/api/v1/search_skills?query=birdwatching&user_id=14",
        {
          status: 200,
          fixture: "emptyResponse",
        }
      )
        .as("searchBirdwatching")
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
  it("should autosuggest commonly searched skills", () => {
    cy.get('.demo-user-btn').click()
    cy.get('.nav-bar-text').last().click()
    cy.get(".search-title").contains("p", "Find people near you");
    cy.get(".react-autosuggest__input").should('have.attr', "placeholder", 'Click for suggestions')
    cy.get(".react-autosuggest__input").click()
    cy.get('.react-autosuggest__suggestions-container--open').should('have.length', 1)
    cy.get('#react-autowhatever-1--item-0').should('have.text', "knitting")
    cy.get('#react-autowhatever-1--item-1').should('have.text', "piano")
    cy.get('#react-autowhatever-1--item-2').should('have.text', "juggling")
    cy.get('#react-autowhatever-1--item-3').should('have.text', "birdwatching")
    cy.get('#react-autowhatever-1--item-4').should('have.text', "crochet")
    cy.get('#react-autowhatever-1--item-5').should('have.text', "sewing")
    cy.get('#react-autowhatever-1--item-1').click()
    cy.get(".search-submit-btn").click()
    .wait("@searchPiano");
    cy.url().should("include", "/search/piano");
    cy.get(".search-results-qty").contains("h2", "Showing 2 Results for piano");
    // Check that autosuggest can display common search queries based on what a user has typed
    cy.get(".react-autosuggest__input").clear().type('ju')
    cy.get('#react-autowhatever-1--item-0').should('have.text', "juggling").click()
    cy.get(".search-submit-btn").click()
    cy.wait("@searchJuggling")
    cy.get(".search-results-qty").contains("h2", "Showing 1 Results for juggling")
    cy.get('.result-card-title').should('have.text', 'Jen Ziel')
  })
  it("Should be able to provide informative feedback if no users are found with a searched skill", () => {
      cy.get('.demo-user-btn').click()
      cy.get('.nav-bar-text').last().click()
      cy.get(".search-title").contains("p", "Find people near you");
      cy.get(".react-autosuggest__input").should('have.attr', "placeholder", 'Click for suggestions')
      cy.get(".react-autosuggest__input").click()
      cy.get('.react-autosuggest__suggestions-container--open').should('have.length', 1)
      cy.get('#react-autowhatever-1--item-3').click()
      cy.get(".search-submit-btn").click()
      cy.wait('@searchBirdwatching')
      cy.url().should("include", "/search/birdwatching");
      cy.get(".no-results-msg").should('have.text', 'No Results for your search. Try searching for something else.');
    })
});
