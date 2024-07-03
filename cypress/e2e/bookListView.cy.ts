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
  beforeEach(() => {
    cy.intercept('GET', '/books*', booksResponse).as('getBooks')
    cy.visit('/')
    cy.wait('@getBooks')
  })

  it('Should show landing page', () => {
    cy.get('[data-test-id="landing-page"]').should('exist')
  })

  it('Should show ten books on each section of the landing page', () => {
    cy.get('[data-test-id="Recently added"]').within(() => {
      cy.get('[data-test-id="book-card"]').should('have.length', 10)
    })
    cy.get('[data-test-id="Most popular"]').within(() => {
      cy.get('[data-test-id="book-card"]').should('have.length', 10)
    })
  })

  it('Should show book summary in each card', () => {
    cy.get('[data-test-id="Recently added"]').within(() => {
      cy.get('[data-test-id="book-card"]').each((element, index) => {
        cy.wrap(element).within(() => {
          cy.get('[data-test-id="title-card"]').should('have.text', books[index].title)
          cy.get('[data-test-id="publication-date-card"]').should(
            'have.text',
            books[index].publicationDate ? books[index].publicationDate : 'No date registered',
          )
          cy.get('[data-test-id="author-name-card"]').should('have.text', books[index].author.name)
          cy.get('[data-test-id="description-card"]').should('have.text', books[index].description)
          cy.get('[data-test-id="best-price-card"]').should('exist')
        })
      })
    })
  })
})
