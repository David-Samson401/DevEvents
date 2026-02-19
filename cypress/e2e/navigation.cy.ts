/// <reference types="cypress" />

describe("Navigation", () => {
  it("should navigate from homepage to events page", () => {
    cy.visit("/");
    cy.get('a[href="/events"]').first().click();
    cy.url().should("include", "/events");
    cy.get("h1").should("contain", "All Events");
  });

  it("should navigate from homepage to create event page", () => {
    cy.visit("/");
    cy.get('a[href="/events/create"]').first().click();
    cy.url().should("include", "/events/create");
    cy.get("h1").should("contain", "Create Event");
  });

  it("should navigate back to homepage from events page", () => {
    cy.visit("/events");
    cy.get('a[href="/"]').first().click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("should have working navbar on all pages", () => {
    // Check homepage
    cy.visit("/");
    cy.get("header nav").should("be.visible");

    // Check events page
    cy.visit("/events");
    cy.get("header nav").should("be.visible");

    // Check create event page
    cy.visit("/events/create");
    cy.get("header nav").should("be.visible");
  });

  it("should display logo that links to homepage", () => {
    cy.visit("/events");
    cy.get('header a[href="/"]').first().click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});
