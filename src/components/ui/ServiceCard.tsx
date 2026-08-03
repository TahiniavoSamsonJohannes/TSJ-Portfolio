import { HiCheckCircle } from 'react-icons/hi2'
import type { IconType } from 'react-icons'

type ServiceCardProps = {
  icon: IconType
  title: string
  description: string
  features: string[]
  index?: number
}

const ServiceCard = ({ icon: Icon, title, description, features, index }: ServiceCardProps) => {

  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-700
                 bg-neutral-800/50 p-7
                 transition-all duration-300
                 hover:-translate-y-2 hover:border-blue-200/50
                 hover:shadow-xl hover:shadow-blue-200/10"
    >
      {/* Decorative index number */}
      {typeof index === 'number' && (
        <span
          className="pointer-events-none absolute -right-2 -top-5 select-none text-7xl font-bold
                     text-neutral-700/20 transition-colors duration-300 group-hover:text-blue-200/10"
          aria-hidden="true"
        >
          {String(index).padStart(2, '0')}
        </span>
      )}

      {/* Icon */}
      <div className="relative mb-6 flex h-14 w-14 items-center justify-center
                       rounded-xl bg-blue-200/10
                       transition-colors group-hover:bg-blue-200/20">
        {Icon && (
          <Icon className="h-7 w-7 text-blue-200" />
        )}
      </div>

      {/* Title */}
      <h3 className="relative mb-3 text-xl font-bold text-blue-200">
        {title}
      </h3>

      {/* Description */}
      <p className="relative mb-5 text-sm leading-relaxed text-neutral-300">
        {description}
      </p>

      {/* Features */}
      <ul className="relative mt-auto space-y-2.5 border-t border-neutral-700/60 pt-5">
        {features.map((feature, featureIndex) => (
          <li
            key={featureIndex}
            className="flex items-start gap-2.5 text-sm text-neutral-400"
          >
            <HiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-200" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ServiceCard