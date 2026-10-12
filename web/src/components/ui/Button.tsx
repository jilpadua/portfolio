import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'default' | 'sm'

type ButtonProps = ComponentPropsWithoutRef<'a'> & {
  variant?: ButtonVariant
  size?: ButtonSize
  href: string
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-accent-foreground hover:bg-accent-hover border border-accent',
  secondary:
    'bg-surface text-foreground hover:bg-background border border-border',
  ghost: 'text-foreground hover:text-accent border border-transparent',
}

const sizes: Record<ButtonSize, string> = {
  default: 'px-4 py-2.5 text-sm',
  sm: 'px-3 py-1.5 text-xs',
}

export function Button({
  variant = 'primary',
  size = 'default',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <Link
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  )
}
