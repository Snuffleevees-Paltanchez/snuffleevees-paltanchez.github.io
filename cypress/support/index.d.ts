declare namespace Cypress {
  interface Chainable {
    /**
     * @param selector The data-test-id attribute value
     * @example cy.getByTestId('book-detail')
     */
    getById(selector: string): Chainable<JQuery<HTMLElement>>
  }
}
