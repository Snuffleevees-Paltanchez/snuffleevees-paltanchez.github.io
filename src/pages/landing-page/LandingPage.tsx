import LandingPageSection from './LandingPageSection'
import { useBooksQuery } from '@/hooks/queries/useBooks'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useEffect, useState } from 'react'
import { type Book } from '@/hooks/queries/useBooks'

export default function LandingPage() {
  const booksQuery = useBooksQuery({})
  const sortedBooksQuery = useBooksQuery({ sortByRatingCount: 'desc' })
  const youngBooksQuery = useBooksQuery({
    category: 'Young adult fiction',
    sortByRatingCount: 'desc',
  })
  const historyBooksQuery = useBooksQuery({ category: 'History', sortByRatingCount: 'desc' })
  const biographyBooksQuery = useBooksQuery({
    category: 'Biography & Autobiography',
    sortByRatingCount: 'desc',
  })

  const categoriesToShow = [
    {
      key: 'youngBooks',
      title: 'Young Adult Fiction',
      dataTestId: 'young-section',
    },
    { key: 'historyBooks', title: 'History', dataTestId: 'history-section' },
    {
      key: 'biographyBooks',
      title: 'Biography and Autobiography',
      dataTestId: 'biography-section',
    },
  ]

  const [bookData, setBookData] = useState<{
    [key: string]: Book[]
  }>({
    youngBooks: [] as Book[],
    historyBooks: [] as Book[],
    biographyBooks: [] as Book[],
  })

  useEffect(() => {
    setBookData({
      youngBooks: youngBooksQuery.data?.data || [],
      historyBooks: historyBooksQuery.data?.data || [],
      biographyBooks: biographyBooksQuery.data?.data || [],
    })
  }, [youngBooksQuery.data, historyBooksQuery.data, biographyBooksQuery.data])

  const books = booksQuery.data?.data || []
  const sortedBooks = sortedBooksQuery.data?.data || []
  if (booksQuery.isLoading) return <LoadingSpinner />
  return (
    <div className="flex flex-col m-2 my-4 gap-6" data-test-id="landing-page">
      <LandingPageSection
        sectionTitle="All Time Most Popular"
        books={sortedBooks}
        dataTestId="most-popular-section"
      />
      {categoriesToShow.map(({ key, title, dataTestId }) => (
        <LandingPageSection
          key={key}
          sectionTitle={title}
          books={bookData[key] as Book[]}
          dataTestId={dataTestId}
        />
      ))}
      <LandingPageSection
        sectionTitle="Recently added"
        books={books}
        dataTestId="recently-added-section"
      />
    </div>
  )
}
