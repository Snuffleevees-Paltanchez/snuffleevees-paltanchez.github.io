import LandingPageSection from './LandingPageSection'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockData = Array.from({ length: 10 }).map((_i) => ({
  isbn: '9781451673319',
  price: 10000,
}))

export default function LandingPage() {
  return (
    <div className="flex flex-col m-2 my-4 gap-6">
      <LandingPageSection sectionTitle="Recently added" books={mockData} />
      <LandingPageSection sectionTitle="Most viewed" books={mockData} />
    </div>
  )
}