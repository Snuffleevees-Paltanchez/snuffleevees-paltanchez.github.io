describe('Test not found page', () => {
  it('Should show not found page', () => {
    cy.visit(`/${(Math.random() + 1).toString(36).substring(7)}`)
    cy.get('[data-test-id="not-found"]').should('exist')
  })
})
