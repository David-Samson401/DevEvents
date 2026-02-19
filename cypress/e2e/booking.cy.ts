/// <reference types="cypress" />

describe("Booking Flow", () => {
  it("should show email input in booking form", () => {
    cy.visit("/events");

    cy.get("body").then(($body) => {
      if ($body.find(".events li a").length > 0) {
        cy.get(".events li a").first().click();

        cy.get("#book-event").within(() => {
          cy.get('input[type="email"]').should("be.visible");
          cy.get('label[for="email"]').should("contain", "Email");
        });
      }
    });
  });

  it("should validate email format", () => {
    cy.visit("/events");

    cy.get("body").then(($body) => {
      if ($body.find(".events li a").length > 0) {
        cy.get(".events li a").first().click();

        cy.get("#book-event").within(() => {
          // Try invalid email
          cy.get('input[type="email"]').type("invalid-email");
          cy.get('button[type="submit"]').click();

          // Form should show validation error or stay on page
          cy.get('input[type="email"]').then(($input) => {
            // Check HTML5 validation
            expect(($input[0] as HTMLInputElement).validity.valid).to.be.false;
          });
        });
      }
    });
  });

  it("should allow entering valid email", () => {
    cy.visit("/events");

    cy.get("body").then(($body) => {
      if ($body.find(".events li a").length > 0) {
        cy.get(".events li a").first().click();

        cy.get("#book-event").within(() => {
          cy.get('input[type="email"]')
            .clear()
            .type("test@example.com")
            .should("have.value", "test@example.com");
        });
      }
    });
  });

  it("should show submit button with correct text", () => {
    cy.visit("/events");

    cy.get("body").then(($body) => {
      if ($body.find(".events li a").length > 0) {
        cy.get(".events li a").first().click();

        cy.get("#book-event button[type='submit']").should("contain", "Submit");
      }
    });
  });
});
