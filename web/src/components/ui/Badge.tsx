type BadgeProps = {
  children: React.ReactNode
}

export function Badge({ children }: BadgeProps) {
  return (
    <span className="font-mono text-xs tracking-wide text-muted">{children}</span>
  )
}
