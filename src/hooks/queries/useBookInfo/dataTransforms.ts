import type { BooksResponse, BookInfo } from './types'

/**
 * Methods to modify the data from the requests into the desired format
 * @returns An object with methods to transform the data
 */
export const useBookInfoTransforms = () => {
  const mapBookInfo = (data: BooksResponse): BookInfo => {
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
