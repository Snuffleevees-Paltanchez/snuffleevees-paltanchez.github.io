describe('Should test search bar E2E', () => {
  before(() => {
    cy.visit('/')
  })
  it('Should show navbar', () => {
    cy.getById('navbar').should('exist')
  })

  it('Should show search bar', () => {
    cy.getById('search-bar').should('exist')
  })

  it('Should search a book', () => {
    cy.getById('search-bar').type('Harry Potter')
    cy.getById('search-button').click()
    cy.getById('results-search').should('be.visible')
    cy.getById('search-bar').clear()
  })

  it('Should show no results when no book title matches input', () => {
    cy.getById('search-bar').type((Math.random() + 1).toString(36).substring(7))
    cy.getById('search-button').click()
    cy.getById('results-search').should('not.exist')
    cy.getById('no-search-results').should('be.visible')
  })
})
