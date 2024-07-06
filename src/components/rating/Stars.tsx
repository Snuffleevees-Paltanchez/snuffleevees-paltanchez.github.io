import colors from 'tailwindcss/colors'
import { Star } from 'lucide-react'

export default function Stars({ rating, dataTestId }: { rating: number; dataTestId: string }) {
  const renderStars = () => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      const starColor = i < rating ? colors.yellow[500] : colors.gray[300]
      stars.push(<Star key={i} size={20} fill={starColor} color={starColor} />)
    }
    return stars
  }
  return (
    <div className={'flex items-center'} data-test-id={dataTestId}>
      {renderStars()}
    </div>
  )
}
