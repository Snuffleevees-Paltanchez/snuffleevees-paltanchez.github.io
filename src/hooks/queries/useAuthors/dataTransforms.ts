import { Author, AuthorsResponse } from './types'

/**
 * Methods to modify the data from the requests into the desired format
 * @returns An object with methods to transform the data
 */
export const useAuthorsTransforms = () => {
  const mapAuthors = (response: AuthorsResponse) => {
    return {
      ...response,
      data: response.data
        .filter((author: Author) => author.name !== '')
        .map((author) => ({ ...author, name: capitalizeNames(author.name) })),
    }
  }

  return {
    mapAuthors,
  }
}

/**
 * Function to capitalize the initials of a name
 * @param name The name
 * @example
 * const name = 'joHn DoE'
 * const initials = capitalizeNames(name)
 * console.log(initials) // John Doe
 */
const capitalizeNames = (name: string) => {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
