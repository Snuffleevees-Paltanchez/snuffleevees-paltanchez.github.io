import { Star } from 'lucide-react'

export default function Stars({ rating }: { rating: number }) {
  const renderStars = () => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      const starColor = i < rating ? '#FFD700' : '#CCCCCC'
      stars.push(<Star key={i} size={20} fill={starColor} color={starColor} />)
    }
    return stars
  }
  return <div className={'flex items-center'}>{renderStars()}</div>
}
