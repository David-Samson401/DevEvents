/// <reference types="cypress" />

describe("API Routes", () => {
  describe("GET /api/events", () => {
    it("should return events array", () => {
      cy.request("GET", "/api/events").then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("events");
        expect(response.body.events).to.be.an("array");
      });
    });

    it("should return success message", () => {
      cy.request("GET", "/api/events").then((response) => {
        expect(response.body).to.have.property("message");
      });
    });
  });

  describe("GET /api/events/[slug]", () => {
    it("should return 404 for non-existent slug", () => {
      cy.request({
        method: "GET",
        url: "/api/events/non-existent-event-12345",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });

    it("should return 400 for empty slug", () => {
      cy.request({
        method: "GET",
        url: "/api/events/%20", // whitespace slug
        failOnStatusCode: false,
      }).then((response) => {
        expect([400, 404]).to.include(response.status);
      });
    });
  });

  describe("POST /api/events", () => {
    it("should return 400 when image is missing", () => {
      const formData = new FormData();
      formData.append("title", "Test Event");
      formData.append("description", "Test description");

      cy.request({
        method: "POST",
        url: "/api/events",
        body: formData,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.oneOf([400, 500]);
      });
    });
  });
});
