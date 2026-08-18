import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = ComponentPropsWithoutRef<'a'> & {
  variant?: ButtonVariant
  href: string
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-accent-foreground hover:bg-accent-hover border border-accent',
  secondary:
    'bg-surface text-foreground hover:bg-background border border-border',
  ghost: 'text-foreground hover:text-accent border border-transparent',
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <Link
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  )
}
