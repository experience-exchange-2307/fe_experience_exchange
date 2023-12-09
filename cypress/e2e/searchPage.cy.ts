describe("a user should be able to search by keyword", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://be-experience-exchange-b6ae91ef3c0f.herokuapp.com/api/v1/users/14",
      {
        status: 200,
        fixture: "currentUser",
      }
    )
    cy.intercept(
      "GET",
      "https://be-experience-exchange-b6ae91ef3c0f.herokuapp.com/api/v1/search_skills?query=piano&user_id=14",
      {
        status: 200,
        fixture: "searchResults",
      }
    ).as('searchPiano').visit("http://localhost:3000/search");
  });

  it("should have a controlled search form that displays results when submit button is clicked", () => {
    cy.get('.search-title').contains('p', 'Find people near you')
    cy.get('.search-input').type('piano')
    cy.get('.search-submit-btn').click()
    .wait('@searchPiano')
    cy.get('.search-results-qty').contains('h1', 'Showing 2 Results for piano')
    cy.get('.result-card').should('have.length', 2)
    .get('.result-card').first().contains('p', 'Tyler Blackmon')
    .get('.result-card').first().contains('p', 'Skills:')
    .get('.result-card').first().contains('p', 'Ruby')
    .get('.result-card').first().contains('p', 'Piano')
    .get('.result-card').first().contains('p', '1 miles away')
    .get('.result-card').last().contains('p', 'Jen Ziel')
    .get('.result-card').last().contains('p', 'Skills:')
    .get('.result-card').last().contains('p', 'piano')
    .get('.result-card').last().contains('p', 'knitting')
    .get('.result-card').last().contains('p', 'juggling')
    .get('.result-card').last().contains('p', 'Remote')
    cy.get('#remote').click()
    cy.get('.result-card').should('have.length', 1)
    .get('.result-card').last().contains('p', 'Jen Ziel')
    .get('.result-card').last().contains('p', 'Skills:')
    .get('.result-card').last().contains('p', 'piano')
    .get('.result-card').last().contains('p', 'knitting')
    .get('.result-card').last().contains('p', 'juggling')
    cy.get('.result-card').first().contains('p', 'Remote')
    cy.get('#remote').click()
    cy.get('.result-card').should('have.length', 2)
  });

});
