import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
  CloudSun,
} from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  sun: Sun,
  cloud: Cloud,
  'cloud-sun': CloudSun,
  'cloud-rain': CloudRain,
  'cloud-snow': CloudSnow,
  'cloud-lightning': CloudLightning,
  'cloud-drizzle': CloudDrizzle,
  'cloud-fog': CloudFog,
}

interface WeatherIconProps {
  icon: string
  className?: string
}

export function WeatherIcon({ icon, className = 'h-6 w-6' }: WeatherIconProps) {
  const Icon = iconMap[icon] || Cloud
  return <Icon className={className} />
}
