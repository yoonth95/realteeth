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

const iconMap: Record<
  string,
  React.ComponentType<{ className?: string; color?: string }>
> = {
  sun: Sun,
  cloud: Cloud,
  'cloud-sun': CloudSun,
  'cloud-rain': CloudRain,
  'cloud-snow': CloudSnow,
  'cloud-lightning': CloudLightning,
  'cloud-drizzle': CloudDrizzle,
  'cloud-fog': CloudFog,
}

const colorMap: Record<string, string> = {
  sun: 'text-weather-sun',
  cloud: 'text-weather-cloud',
  'cloud-sun': 'text-weather-sun',
  'cloud-rain': 'text-weather-rain',
  'cloud-snow': 'text-weather-snow',
  'cloud-lightning': 'text-weather-lightning',
  'cloud-drizzle': 'text-weather-drizzle',
  'cloud-fog': 'text-weather-fog',
}

interface WeatherIconProps {
  icon: string
  className?: string
}

export function WeatherIcon({ icon, className = 'h-6 w-6' }: WeatherIconProps) {
  const Icon = iconMap[icon] || Cloud
  const colorClass = colorMap[icon] || 'text-weather-cloud'
  return <Icon className={`${className} ${colorClass}`} />
}
