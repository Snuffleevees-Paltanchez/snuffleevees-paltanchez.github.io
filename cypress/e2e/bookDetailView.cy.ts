import { createBook } from '../factories/bookFactory'
import { parsePrice } from './utils'

const book = createBook()
describe('Test book detail page', () => {
  before(() => {
    cy.intercept('GET', '/books/isbn/*', book).as('getBook')
    cy.visit(`/books/${book.isbn}`)
    cy.wait('@getBook')
  })
  it('Should show book details', () => {
    cy.getById('book-detail').should('be.visible')
    cy.getById('book-detail').within(() => {
      cy.getById('book-image-details').should('be.visible')
      cy.getById('rating').should('be.visible')
      cy.getById('title').should('have.text', book.title)
      cy.getById('publication-date').should(
        'have.text',
        book.publicationDate ? book.publicationDate : 'No date registered',
      )
      cy.getById('author-name').should('have.text', book.author.name)
      cy.getById('description').should('have.text', book.description)
    })
  })

  it('Should show price table', () => {
    cy.get('table').should('be.visible')
    cy.get('table').within(() => {
      cy.get('thead').within(() => {
        cy.get('tr')
          .first()
          .within(() => {
            cy.get('th').should('have.length', 3)
            cy.get('th').eq(0).should('have.text', 'Website')
            cy.get('th').eq(1).should('have.text', 'Price')
            cy.get('th').eq(2).should('have.text', 'Status')
          })
      })
      cy.get('tbody').within(() => {
        cy.get('tr').should('have.length', book.prices.length)
        book.prices.forEach((price, index) => {
          cy.get('tr')
            .eq(index)
            .within(() => {
              cy.get('td').eq(0).should('be.visible')
              cy.get('td')
                .eq(1)
                .should('have.text', `$${parsePrice(price.price)} CLP`)
              cy.get('td').eq(2).should('have.text', 'Up to date')
            })
        })
      })
    })
  })
})
