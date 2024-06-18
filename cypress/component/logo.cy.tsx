import Logo from '@/components/Logo'

/**
 * This just a example of a test file.
 * You can use it to test other components
 */

describe('logo.cy.tsx', () => {
  it('playground', () => {
    cy.mount(<Logo />)
  })
})
