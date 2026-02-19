/// <reference types="cypress" />

describe("Responsive Design", () => {
  const viewports: Cypress.ViewportPreset[] = [
    "iphone-6",
    "ipad-2",
    "macbook-15",
  ];

  viewports.forEach((viewport) => {
    describe(`${viewport} viewport`, () => {
      beforeEach(() => {
        cy.viewport(viewport);
      });

      it("should display homepage correctly", () => {
        cy.visit("/");
        cy.get("h1").should("be.visible");
        cy.get("header").should("be.visible");
      });

      it("should display events page correctly", () => {
        cy.visit("/events");
        cy.get("h1").should("be.visible");
      });

      it("should display create event form correctly", () => {
        cy.visit("/events/create");
        cy.get("form").should("be.visible");
        cy.get('input[name="title"]').should("be.visible");
      });
    });
  });
});

describe("Accessibility Basics", () => {
  it("should have proper heading hierarchy on homepage", () => {
    cy.visit("/");
    cy.get("h1").should("have.length.at.least", 1);
  });

  it("should have alt text on images", () => {
    cy.visit("/");
    cy.get("img").each(($img) => {
      cy.wrap($img).should("have.attr", "alt");
    });
  });

  it("should have labels for form inputs on create event page", () => {
    cy.visit("/events/create");
    cy.get("input[required], textarea[required], select[required]").each(
      ($input) => {
        const id = $input.attr("id");
        if (id) {
          cy.get(`label[for="${id}"]`).should("exist");
        }
      },
    );
  });

  it("should have visible focus states", () => {
    cy.visit("/events/create");
    cy.get('input[name="title"]').focus().should("be.focused");
  });
});
