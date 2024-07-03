import { createBook } from '../factories/bookFactory'

const book = createBook()
describe('Test book detail page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/books/isbn/*', book).as('getBook')
    cy.visit(`/books/${book.isbn}`)
    cy.wait('@getBook')
  })
  it('Should show book details', () => {
    cy.get('[data-test-id="book-detail"]').should('be.visible')
    cy.get('[data-test-id="book-detail"]').within(() => {
      cy.get('[data-test-id="book-image-details"]').should('be.visible')
      cy.get('[data-test-id="rating"]').should('be.visible')
      cy.get('[data-test-id="title"]').should('have.text', book.title)
      cy.get('[data-test-id="publication-date"]').should(
        'have.text',
        book.publicationDate ? book.publicationDate : 'No date registered',
      )
      cy.get('[data-test-id="author-name"]').should('have.text', book.author.name)
      cy.get('[data-test-id="description"]').should('have.text', book.description)
    })
  })

  it('Should show price table', () => {
    cy.get('table').should('be.visible')
    cy.get('table').within(() => {
      cy.get('thead').within(() => {
        cy.get('tr')
          .first()
          .within(() => {
            cy.get('th').should('have.length', 2)
            cy.get('th').eq(0).should('have.text', 'Website')
            cy.get('th').eq(1).should('have.text', 'Price')
          })
      })
      cy.get('tbody').within(() => {
        cy.get('tr').should('have.length', book.prices.length)
        book.prices.forEach((price, index) => {
          cy.get('tr')
            .eq(index)
            .within(() => {
              cy.get('td').eq(0).should('be.visible')
              cy.get('td').eq(1).should('have.text', `$${price.price}`)
            })
        })
      })
    })
  })
})
