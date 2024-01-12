describe('It should allow a user to toggle between light and dark mode', () => {
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
      " https://be-experience-exchange-b6ae91ef3c0f.herokuapp.com/api/v1/search_skills?query=piano&user_id=14",
      {
        status: 200,
        fixture: "searchResults",
      }
    ).as("searchPiano")
   
    cy.intercept(
      "GET",
      "https://be-experience-exchange-b6ae91ef3c0f.herokuapp.com/api/v1/users/14/meetings",
      {
        status: 200,
        fixture: "MyMeetings",
      }
    ).as("GetMyMeetings")
    cy.intercept(
      "GET",
      'https://be-experience-exchange-b6ae91ef3c0f.herokuapp.com/api/v1/users/15',
      {
        status: 200,
        fixture: "TylerInfo",
      }
    ).as("GetTylerProfile")
    
  })
   
  it('toggles to dark mode from every page', () => {

    cy.visit("http://localhost:3000/")
    cy.get('.demo-user-btn').click()
    cy.wait('@GetCurrentUser')
    cy.wait('@GetMyMeetings')
    cy.url().should("include", "/dashboard/14");
    // dark-mode checks for current user profile
    cy.get('.dashboard-outermost-wrapper').should('have.css', 'background-color', 'rgb(18, 21, 27)')
    cy.get('.profile-name').should('have.text', 'Jackson Williams');
    cy.get('.profile-name').should('have.css', 'color', 'oklch(0.746477 0.0216 264.436)')
    cy.get('.profile-left').should('have.css', 'background-color', 'rgb(73, 80, 87)')
    cy.get('.profile-left').should('have.css', 'color', 'rgb(222, 226, 230)')
    cy.get('.profile-right').should('have.css', 'background-color', 'rgb(73, 80, 87)')
    cy.get('.profile-right').should('have.css', 'color', 'rgb(222, 226, 230)')
    cy.get('.meetings-container').should('have.css', 'background-color', 'rgb(73, 80, 87)')
    cy.get('.meetings-container').should('have.css', 'color', 'oklch(0.746477 0.0216 264.436)')
    cy.get('main.dark').should('exist')
    cy.get('main.light').should('not.exist')
    cy.get('.toggle').click()
    cy.get('main.light').should('exist')
    cy.get('main.dark').should('not.exist')
    // light-mode checks for current user profile
    cy.get('.dashboard-outermost-wrapper').should('have.css', 'background-color', 'rgb(229, 231, 235)')
    cy.get('.profile-name').should('have.css', 'color', 'oklch(0.278078 0.029596 256.848)')
    cy.get('.profile-left').should('have.css', 'background-color', 'rgb(255, 255, 255)')
    cy.get('.profile-left').should('have.css', 'color', 'oklch(0.278078 0.029596 256.848)')
    cy.get('.profile-right').should('have.css', 'background-color', 'rgb(255, 255, 255)')
    cy.get('.profile-right').should('have.css', 'color', 'oklch(0.278078 0.029596 256.848)')
    cy.get('.meetings-container').should('have.css', 'background-color', 'rgb(255, 255, 255)')
    cy.get('.meetings-container').should('have.css', 'color', 'oklch(0.278078 0.029596 256.848)')
   /// Go to Search Page while in light-mode
    cy.get('[href="/search"] > .nav-bar-text'). click()
    cy.url().should("include", "/search");
    // Switch from light to dark-mode on Search Page
    cy.get('.toggle').click()
    cy.get('main.dark').should('exist')
    cy.get('main.light').should('not.exist')
   cy.get('.react-autosuggest__input').type('piano')
   cy.get('.search-submit-btn').click()
   cy.wait('@searchPiano')
   cy.url().should("include", "/search/piano")
   cy.get('main.dark').should('exist')
   cy.get('main.light').should('not.exist')
   // Switch from dark to light-mode on Search Page
   cy.get('.toggle').click()
    cy.get('main.light').should('exist')
    cy.get('main.dark').should('not.exist')
    // Navigate to another user's profile while in light-mode
    cy.get('[href="/dashboard/15"] > .result-card').click()
    cy.wait('@GetTylerProfile')
    cy.url().should("include", "/dashboard/15")
    cy.get('.profile-name').should('have.text', 'Tyler Blackmon');
    cy.get('main.light').should('exist')
    cy.get('main.dark').should('not.exist')
    cy.get('.profile-name').should('have.css', 'color', 'oklch(0.278078 0.029596 256.848)')
    cy.get('.profile-left').should('have.css', 'background-color', 'rgb(255, 255, 255)')
    cy.get('.profile-left').should('have.css', 'color', 'oklch(0.278078 0.029596 256.848)')
    cy.get('.profile-right').should('have.css', 'background-color', 'rgb(255, 255, 255)')
    cy.get('.profile-right').should('have.css', 'color', 'oklch(0.278078 0.029596 256.848)')
    cy.get('.request-meeting-container').should('have.css', 'background-color', 'rgb(255, 255, 255)')
    cy.get('.request-meeting-container').should('have.css', 'color', 'oklch(0.278078 0.029596 256.848)')
    // Switch from light to dark mode on another user's profile
    cy.get('.toggle').click()
    cy.get('main.dark').should('exist')
    cy.get('main.light').should('not.exist')
    cy.get('.profile-name').should('have.css', 'color', 'oklch(0.746477 0.0216 264.436)')
    cy.get('.profile-left').should('have.css', 'background-color', 'rgb(73, 80, 87)')
    cy.get('.profile-left').should('have.css', 'color', 'rgb(222, 226, 230)')
    cy.get('.profile-right').should('have.css', 'background-color', 'rgb(73, 80, 87)')
    cy.get('.profile-right').should('have.css', 'color', 'rgb(222, 226, 230)')
    cy.get('.request-meeting-container').should('have.css', 'background-color', 'rgb(255, 255, 255)')
    cy.get('.request-meeting-container').should('have.css', 'color', 'oklch(0.746477 0.0216 264.436)')
  })
})