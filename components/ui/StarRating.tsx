import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  max?: number
}

export default function StarRating({ rating, max = 5 }: StarRatingProps) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? 'fill-[#f59e0b] text-[#f59e0b]' : 'text-gray-300'}
        />
      ))}
    </div>
  )
}
