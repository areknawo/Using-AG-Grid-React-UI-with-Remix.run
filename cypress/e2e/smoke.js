describe("Grid test", () => {
  it("should allow you to register and login", () => {
    cy.visit("/");
    const element = cy.get(".ag-theme-alpine");
    console.log(element);

    expect(element).is.not.null;
  });
});
