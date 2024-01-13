describe("template spec", () => {
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
    ).as("GetMyMeetings");
    cy.intercept(
      "PATCH",
      "https://be-experience-exchange-b6ae91ef3c0f.herokuapp.com/api/v1/meetings/16",
      {
        status: 200,
        fixture: "patchedMeetings",
      }
    )
      .as("PatchMyMeetings")
      .visit("http://localhost:3000/");
    cy.get(".demo-user-btn").should("have.text", "Login as a Demo User");
    cy.get(".demo-user-btn").click();
    cy.url().should("include", "/dashboard/14");
    cy.get(".current-user-dash .meetings-container").should("exist");
  });
  it("should see meeting requests from other users and pending requests I have made", () => {
    // Meetings component
    cy.get(".meetings-container").should("exist");
    cy.get(".meetings-title").should("have.text", "My Meetings");
    cy.get(".meeting-card").should("have.length", 2);
    cy.get(".meeting-card-content").should("exist");
    // Toggle to meeting requests
    cy.get(".meetings-toggle").click();
    cy.get(".meetings-title").should("have.text", "My Meeting Requests");

    // Assert for meeting requests
    cy.get(".meeting-card-request").should("have.length", 1);
    cy.get(".meeting-card-request h3").should("have.text", "REQUEST");
    cy.get(".meeting-card-request p").should(
      "have.text",
      "Feb. 1812:00 PM - 2:00 AMPartner: Buffy Spencer"
    );
    cy.get(".meeting-card-request button").should("have.length", "2");
    cy.get(".meeting-card-btn-accept").should("have.text", "Accept");
    cy.get(".meeting-card-btn-reject").should("have.text", "Decline");

    // Assert for pending meetings
    cy.get(".meeting-card-pending").should("have.length", 2);
    cy.get(".meeting-card-pending")
      .eq(0)
      .within(() => {
        cy.get("h3").should("have.text", "PENDING");
        cy.get("p").eq(0).should("have.text", "Dec. 18");
        cy.get("p").eq(1).should("have.text", "12:00 PM - 2:00 AM");
        cy.get("p").eq(2).should("have.text", "Partner: Buffy Spencer");
        cy.get("a").should("have.attr", "href", "/dashboard/412");
        cy.get("p")
          .eq(3)
          .should(
            "have.text",
            "Meeting pending, waiting on partner to respond"
          );
      });

    // Second pending meeting card
    cy.get(".meeting-card-pending")
      .eq(1)
      .within(() => {
        cy.get("h3").should("have.text", "PENDING");
        cy.get("p").eq(0).should("have.text", "Jan. 6");
        cy.get("p").eq(1).should("have.text", "12:00 PM - 2:00 AM");
        cy.get("p").eq(2).should("have.text", "Partner: Tyrell Wilderman");
        cy.get("a").should("have.attr", "href", "/dashboard/418");
        cy.get("p")
          .eq(3)
          .should(
            "have.text",
            "Meeting pending, waiting on partner to respond"
          );
      });
  });
  it("should update meetings, once request is accepted", () => {
    cy.get(".meeting-card").should("have.length", 2);
    cy.get(".meetings-toggle").click();
    cy.get(".meetings-title").should("have.text", "My Meeting Requests");
    cy.get(".meeting-card-request").should("have.length", 1);
    cy.intercept(
      "GET",
      "https://be-experience-exchange-b6ae91ef3c0f.herokuapp.com/api/v1/users/14/meetings",
      {
        status: 200,
        fixture: "patchedMeetings",
      }
    ).as("GetUpdatedMeetings");
    cy.get(".meeting-card-btn-accept").click();
    cy.get(".meetings-title").should("have.text", "My Meetings");
    cy.get(".meeting-card").should("have.length", 3);
    cy.get(".meeting-card")
      .eq(2)
      .within(() => {
        cy.get("p").eq(0).should("have.text", "Feb. 18");
        cy.get("p").eq(1).should("have.text", "12:00 PM - 2:00 AM");
        cy.get("p").eq(2).should("have.text", "Partner: Buffy Spencer");
        cy.get("a").should("have.attr", "href", "/dashboard/412");
      });
  });
  it("can navigate to meeting partners dashboard from meeting cards", () => {
    cy.get(".meeting-card")
      .eq(1).as("meetingCard");
    cy.get("@meetingCard").within(() => {
        cy.get("p").eq(2).should("have.text", "Partner: Tyler Blackmon");
        cy.get("a").should("have.attr", "href", "/dashboard/15").as("dashboardLink");
      });
    cy.get("@dashboardLink").then(($dashboardLink) => {
    const href = $dashboardLink.attr("href");
    cy.visit(`http://localhost:3000${href}`);
    });
    cy.url().should("include", "/dashboard/15");
    cy.get(".profile-name").should("have.text", "Tyler Blackmon");
    cy.get(".profile-about").should("have.text", "About me");
    cy.get(".profile-about-text").should(
      "have.text",
      "I enjoy long walks on the beach"
    );
    cy.get(".profile-location").should("have.text", "Location");
    cy.get(".profile-location-text").should("have.text", "CO springs, CO");
    cy.get(".profile-email").should("have.text", "Email");
    cy.get(".profile-email-text").should("have.text", "tyler@gmail.com");
    cy.get(".request-meeting-container");
    cy.get(".meetings-title").should("have.text", "Request A Meeting");
  });
});
