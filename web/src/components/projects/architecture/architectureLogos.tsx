import type { ReactNode } from 'react'
import type { ArchitectureNodeLogo } from '@/lib/sanity/types'

type IconProps = {
  className?: string
}

function IconFrame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

function FlutterIcon(_: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M12.2 3.2 4.4 11l3.7 3.7L19.6 3.2H12.2Z" />
      <path d="m8.1 14.7 4.1 4.1 7.4-7.4-4.1-4.1z" />
    </svg>
  )
}

function GraphQLIcon(_: IconProps) {
  return (
    <IconFrame>
      <circle cx="12" cy="4.5" r="1.4" />
      <circle cx="5.5" cy="8.2" r="1.4" />
      <circle cx="18.5" cy="8.2" r="1.4" />
      <circle cx="5.5" cy="15.8" r="1.4" />
      <circle cx="18.5" cy="15.8" r="1.4" />
      <circle cx="12" cy="19.5" r="1.4" />
      <path d="M12 5.9v11.2M6.8 8.9l10.4 6.2M17.2 8.9 6.8 15.1M6.7 8.2h10.6M6.7 15.8h10.6" />
    </IconFrame>
  )
}

function NodeJsIcon(_: IconProps) {
  return (
    <IconFrame>
      <path d="M12 3 4.5 7.2v9.6L12 21l7.5-4.2V7.2L12 3Z" />
      <path d="M12 8v8" />
    </IconFrame>
  )
}

function DatabaseIcon(_: IconProps) {
  return (
    <IconFrame>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </IconFrame>
  )
}

function ApiGatewayIcon(_: IconProps) {
  return (
    <IconFrame>
      <rect x="4" y="8" width="16" height="8" rx="1" />
      <path d="M8 8V6a4 4 0 0 1 8 0v2M9 12h6" />
    </IconFrame>
  )
}

function ServiceIcon(_: IconProps) {
  return (
    <IconFrame>
      <rect x="4" y="5" width="16" height="14" rx="1.5" />
      <path d="M8 9h8M8 12h5M8 15h6" />
    </IconFrame>
  )
}

function HardwareIcon(_: IconProps) {
  return (
    <IconFrame>
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.5 6.5l2 2M15.5 15.5l2 2M17.5 6.5l-2 2M8.5 15.5l-2 2" />
    </IconFrame>
  )
}

function ParkingDeviceIcon(_: IconProps) {
  return (
    <IconFrame>
      <rect x="5" y="4" width="14" height="16" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M9 8h3.5a2 2 0 0 1 0 4H9V8Z" />
    </IconFrame>
  )
}

const architectureLogoMap: Partial<
  Record<Exclude<ArchitectureNodeLogo, 'none'>, (props: IconProps) => ReactNode>
> = {
  flutter: FlutterIcon,
  graphql: GraphQLIcon,
  nodejs: NodeJsIcon,
  database: DatabaseIcon,
  'api-gateway': ApiGatewayIcon,
  service: ServiceIcon,
  hardware: HardwareIcon,
  'parking-device': ParkingDeviceIcon,
}

export function ArchitectureNodeLogoIcon({ logo }: { logo?: ArchitectureNodeLogo }) {
  if (!logo || logo === 'none') return null
  const Icon = architectureLogoMap[logo]
  if (!Icon) return null
  return <Icon />
}
