/// <reference types="cypress" />

describe("Create Event Page", () => {
  beforeEach(() => {
    cy.visit("/events/create");
  });

  it("should load the create event page successfully", () => {
    cy.get("h1").should("contain", "Create Event");
    cy.get("form").should("be.visible");
  });

  it("should display all required form fields", () => {
    // Text inputs
    cy.get('input[name="title"]').should("be.visible");
    cy.get('textarea[name="description"]').should("be.visible");
    cy.get('textarea[name="overview"]').should("be.visible");
    cy.get('input[name="venue"]').should("be.visible");
    cy.get('input[name="location"]').should("be.visible");
    cy.get('input[name="date"]').should("be.visible");
    cy.get('input[name="time"]').should("be.visible");
    cy.get('select[name="mode"]').should("be.visible");
    cy.get('input[name="audience"]').should("be.visible");
    cy.get('input[name="organizer"]').should("be.visible");
    cy.get('input[name="tags"]').should("be.visible");
    cy.get('textarea[name="agenda"]').should("be.visible");

    // File input
    cy.get('input[type="file"]').should("be.visible");

    // Submit button
    cy.get('button[type="submit"]')
      .should("be.visible")
      .and("contain", "Create Event");
  });

  it("should have mode dropdown with correct options", () => {
    cy.get('select[name="mode"]').within(() => {
      cy.get("option").should("have.length", 3);
      cy.contains("option", "In-Person").should("exist");
      cy.contains("option", "Virtual").should("exist");
      cy.contains("option", "Hybrid").should("exist");
    });
  });

  it("should allow filling in text fields", () => {
    cy.get('input[name="title"]')
      .type("Test Event")
      .should("have.value", "Test Event");
    cy.get('textarea[name="description"]')
      .type("Test description")
      .should("have.value", "Test description");
    cy.get('input[name="venue"]')
      .type("Test Venue")
      .should("have.value", "Test Venue");
    cy.get('input[name="location"]')
      .type("Test City, Country")
      .should("have.value", "Test City, Country");
  });

  it("should allow selecting date and time", () => {
    cy.get('input[name="date"]')
      .type("2026-06-15")
      .should("have.value", "2026-06-15");
    cy.get('input[name="time"]').type("09:00").should("have.value", "09:00");
  });

  it("should allow selecting event mode", () => {
    cy.get('select[name="mode"]')
      .select("Virtual")
      .should("have.value", "Virtual");
    cy.get('select[name="mode"]')
      .select("Hybrid")
      .should("have.value", "Hybrid");
    cy.get('select[name="mode"]')
      .select("In-Person")
      .should("have.value", "In-Person");
  });

  it("should show error when submitting without image", () => {
    // Fill required fields but skip image
    cy.get('input[name="title"]').type("Test Event");
    cy.get('textarea[name="description"]').type("Test description");
    cy.get('textarea[name="overview"]').type("Test overview content");
    cy.get('input[name="venue"]').type("Test Venue");
    cy.get('input[name="location"]').type("Test City");
    cy.get('input[name="date"]').type("2026-06-15");
    cy.get('input[name="time"]').type("09:00");
    cy.get('input[name="audience"]').type("Developers");
    cy.get('input[name="organizer"]').type("Test Org");
    cy.get('input[name="tags"]').type("test, cypress");
    cy.get('textarea[name="agenda"]').type("09:00 - Start, 10:00 - End");

    cy.get('button[type="submit"]').click();

    // Should show error about missing image
    cy.contains("Please select an image").should("be.visible");
  });

  it("should not submit with empty required fields", () => {
    cy.get('button[type="submit"]').click();

    // Form should still be on the same page (HTML5 validation prevents submission)
    cy.url().should("include", "/events/create");
  });
});
