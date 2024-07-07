describe('Should test book detail page E2E', () => {
  before(() => {
    cy.visit('/')
  })
  it('Should show books on landing page', () => {
    const sections = [
      'recently-added-section',
      'most-popular-section',
      'young-section',
      'history-section',
      'biography-section',
    ]
    cy.getById('landing-page').should('exist')
    sections.forEach((section) => {
      cy.getById(section).should('exist')
    })
  })

  it('Should navigate to book detail page', () => {
    cy.getById('recently-added-section').within(() => {
      cy.getById('title-card').first().click()
    })
    cy.getById('book-detail').should('exist')
    cy.getById('book-detail').within(() => {
      cy.getById('title').should('exist')
      cy.getById('publication-date').should('exist')
      cy.getById('author-name').should('exist')
      cy.getById('description').should('exist')
    })

    cy.get('table').should('be.visible')
  })
})
