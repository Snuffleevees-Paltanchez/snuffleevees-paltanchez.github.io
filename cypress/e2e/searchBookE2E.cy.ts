describe('Should test search bar E2E', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Should show navbar', () => {
    cy.get('[data-test-id="navbar"]').should('exist')
  })

  it('Should show search bar', () => {
    cy.get('[data-test-id="search-bar"]').should('exist')
  })

  it('Should search a book', () => {
    cy.get('[data-test-id="search-bar"]').type('Harry Potter')
    cy.get('[data-test-id="search-button"]').click()
    cy.get('[data-test-id="results-search"]').should('be.visible')
    cy.get('[data-test-id="search-bar"]').clear()
  })

  it('Should show no results when no book title matches input', () => {
    cy.get('[data-test-id="search-bar"]').type((Math.random() + 1).toString(36).substring(7))
    cy.get('[data-test-id="search-button"]').click()
    cy.get('[data-test-id="results-search"]').should('not.exist')
    cy.get('[data-test-id="no-search-results"]').should('be.visible')
  })
})
