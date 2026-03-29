import { HiOutlinePaintBrush, HiOutlineCodeBracket, HiOutlineDocumentText } from 'react-icons/hi2'
import type { IconType } from 'react-icons'

type ServiceCardProps = {
  icon: IconType
  title: string
  description: string
  features: string[]
}

const ServiceCard = ({ icon: Icon, title, description, features }: ServiceCardProps) => {

  return (
    <div
      className="bg-neutral-800/50 backdrop-blur-sm 
                           border border-neutral-700
                           rounded-lg p-6
                           hover:border-blue-200/50 
                           transition-all duration-300
                           hover:-translate-y-2
                           hover:shadow-lg hover:shadow-blue-200/10
                           group"
    >
      {/* Icon */}
      <div className="w-14 h-14 bg-blue-200/10 rounded-lg
                                flex items-center justify-center mb-6
                                group-hover:bg-blue-200/20
                                transition-colors">
        {Icon && (
          <Icon className="w-7 h-7 text-blue-200" />
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-blue-200 mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-neutral-300 mb-4 text-sm">
        {description}
      </p>

      {/* Features */}
      <ul className="space-y-2">
        {features.map((feature, featureIndex) => (
          <li
            key={featureIndex}
            className="text-neutral-400 text-sm flex items-start gap-2"
          >
            <span className="text-blue-200 mt-1">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ServiceCard