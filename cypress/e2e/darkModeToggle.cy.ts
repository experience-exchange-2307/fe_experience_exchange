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
      "https://be-experience-exchange-b6ae91ef3c0f.herokuapp.com/api/v1/users/14/meetings",
      {
        status: 200,
        fixture: "MyMeetings",
      }
    ).as("GetMyMeetings")})
   
  it('toggles to dark mode from every page', () => {
    cy.visit("http://localhost:3000/")
    cy.get('.light').should('have.css', 'background-color', 'rgb(229, 231, 235)')
    cy.get('.toggle').click()
    cy.get('.dark').should('have.css', 'background-color', 'rgb(18, 21, 27)')
    cy.get('.demo-user-btn').click()
    cy.url().should("include", "/dashboard/14");
  })
})