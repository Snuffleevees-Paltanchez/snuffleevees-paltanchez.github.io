import type { BooksResponse } from './types'

export type BookInfo = {
  title: string
  authors: string[]
  description: string
  image: string
  publishedDate: string
}

/**
 * Methods to modify the data from the requests into the desired format
 * @returns An object with methods to transform the data
 */
export const useBookInfoTransforms = () => {
  const mapBookInfo = (data: BooksResponse) => {
    const bookInfo = data.items[0]
    return {
      title: bookInfo.volumeInfo.title,
      authors: bookInfo.volumeInfo.authors,
      description: bookInfo.volumeInfo.description,
      image: bookInfo.volumeInfo.imageLinks.thumbnail,
      publishedDate: bookInfo.volumeInfo.publishedDate,
    }
  }

  return {
    mapBookInfo,
  }
}
