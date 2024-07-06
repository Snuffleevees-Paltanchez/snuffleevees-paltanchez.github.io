/**
 * @returns The price as a string with dots as thousands separator
 * @example
 * parsePrice(1000000) // '1.000.000'
 */
export const parsePrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
