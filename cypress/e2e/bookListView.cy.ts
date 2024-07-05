import { createBooks } from '../factories/bookFactory'

const books = createBooks()
describe('Test book list page', () => {
  const booksResponse = {
    total: 10,
    page: 1,
    limit: 10,
    hasNextPage: false,
    data: books,
  }
  before(() => {
    cy.intercept('GET', `${Cypress.env('VITE_MIKBOOKS_API_URL')}/books`, booksResponse).as(
      'getBooks',
    )
    cy.visit('/')
    cy.wait('@getBooks')
  })

  it('Should show landing page', () => {
    cy.getById('landing-page').should('exist')
  })

  it('Should show ten books on each section of the landing page', () => {
    cy.getById('recently-added-section').within(() => {
      cy.getById('book-card').should('have.length', 10)
    })
    cy.getById('most-popular-section').within(() => {
      cy.getById('book-card').should('have.length', 10)
    })
  })

  it('Should show book summary in each card', () => {
    cy.getById('recently-added-section').within(() => {
      cy.getById('book-card').each((element, index) => {
        cy.wrap(element).within(() => {
          cy.getById('title-card').should('have.text', books[index].title)
          cy.getById('publication-date-card').should(
            'have.text',
            books[index].publicationDate ? books[index].publicationDate : 'No date registered',
          )
          cy.getById('author-name-card').should('have.text', books[index].author.name)
          cy.getById('description-card').should('have.text', books[index].description)
          cy.getById('best-price-card').should('exist')
        })
      })
    })
  })
})
