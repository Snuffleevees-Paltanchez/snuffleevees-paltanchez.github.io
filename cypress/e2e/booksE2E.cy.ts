describe('Should test book detail page E2E', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Should show books on landing page', () => {
    cy.get('[data-test-id="Recently added"]').within(() => {
      cy.get('[data-test-id="book-card"]').should('exist')
    })
    cy.get('[data-test-id="Most popular"]').within(() => {
      cy.get('[data-test-id="book-card"]').should('exist')
    })
  })

  it('Should navigate to book detail page', () => {
    cy.get('[data-test-id="Recently added"]').within(() => {
      cy.get('[data-test-id="title-card"]').first().click()
    })
    cy.get('[data-test-id="book-detail"]').should('exist')
    cy.get('[data-test-id="book-detail"]').within(() => {
      cy.get('[data-test-id="title"]').should('exist')
      cy.get('[data-test-id="publication-date"]').should('exist')
      cy.get('[data-test-id="author-name"]').should('exist')
      cy.get('[data-test-id="description"]').should('exist')
    })

    cy.get('table').should('be.visible')
  })
})
