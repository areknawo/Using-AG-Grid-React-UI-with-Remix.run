describe("Grid test", () => {
  it("Should contain rows", () => {
    cy.visit("/");
    const element = cy.get("div.ag-center-cols-container");

    element.children().should("have.length.above", 0);
  });
});
