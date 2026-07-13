import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'pink' | 'mint' | 'lavender'
  className?: string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold',
        {
          'bg-[#F9C4D2] text-[#9b3a52]': variant === 'default' || variant === 'pink',
          'bg-[#C8EFE3] text-[#2d7a5e]': variant === 'mint',
          'bg-[#E8D5F5] text-[#6b3fa0]': variant === 'lavender',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
