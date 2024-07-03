const createPrices = (
  overrides = {
    platformId: 1,
    price: 13000,
    productUrl: 'https://www.antartica.cl/unicornios-enlatados-9789877978889.html',
  },
) => {
  return [
    {
      ...overrides,
    },
  ]
}

export const createBook = (
  overrides = {
    id: '1',
    title: 'Test book',
    authorId: '1',
    description: 'Test description',
    isbn: '9789877978889',
    imgUrl: null,
    category: 'Fiction',
    publicationDate: null,
    minPrice: 10000,
    maxPrice: 30000,
    page: 1,
    limit: 10,
    author: {
      name: 'Test author',
    },
    categories: [
      {
        id: 1,
        name: 'Fiction',
        isDeleted: false,
      },
    ],
  },
) => {
  return { ...overrides, prices: createPrices() }
}

export const createBooks = (total: number = 10) => {
  const books = Array.from({ length: total }).map((_, index) => ({
    ...createBook(),
    id: `${index}`,
    isbn: `${index}`,
  }))
  return books
}
