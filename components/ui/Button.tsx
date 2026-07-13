import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
          {
            'bg-[#d4768a] text-white hover:bg-[#c4687c] active:scale-95 shadow-md hover:shadow-lg':
              variant === 'primary',
            'bg-[#E8D5F5] text-[#7c5fa0] hover:bg-[#dcc8f0] active:scale-95':
              variant === 'secondary',
            'border-2 border-[#d4768a] text-[#d4768a] hover:bg-[#fdf0f3] active:scale-95':
              variant === 'outline',
            'text-[#d4768a] hover:bg-[#fdf0f3] active:scale-95': variant === 'ghost',
          },
          {
            'text-sm px-4 py-2': size === 'sm',
            'text-base px-6 py-3': size === 'md',
            'text-lg px-8 py-4': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
