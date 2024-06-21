import type { BooksResponse, BookResponse, PriceResponse } from './types'

/**
 * Methods to modify the data from the requests into the desired format
 * @returns An object with methods to transform the data
 */
export const useBooksTransforms = () => {
  const mapBooks = (response: BooksResponse) => {
    const totalPages = Math.ceil(response.total / response.limit)
    return {
      ...response,
      data: response.data.map(mapBook),
      totalPages,
    }
  }

  const mapBook = (book: BookResponse) => {
    return {
      ...book,
      publicationDate: parseDate(book.publicationDate),
      prices: book.prices.map((price) => ({
        ...price,
        price: parsePrice(price.price),
      })),
      bestPrice: parsePrice(getBestPrice(book.prices).price),
    }
  }

  return {
    mapBooks,
    mapBook,
  }
}

const parsePrice = (price: number) => {
  let priceString = price.toString()
  // if price has leq than 3 digits, add a K
  if (priceString.length <= 4) {
    priceString = priceString + 'K'
  }
  return priceString
}

const getBestPrice = (prices: PriceResponse[]) => {
  return prices.reduce((acc, curr) => (acc.price < curr.price ? acc : curr))
}

/**
 * Parse the date from the ISO format to the format DD/MM/YYYY
 * @param date - Date in ISO format
 * @returns The date in the format DD/MM/YYYY
 */
const parseDate = (date?: string | null) => {
  if (!date) return 'No date registered'
  const [year, month, day] = date.split('T')[0].split('-')
  return `${day}/${month}/${year}`
}
