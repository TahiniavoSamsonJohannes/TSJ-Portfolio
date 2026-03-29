import { useTranslation } from "react-i18next"
import ServiceCard from "../ui/ServiceCard"
import type { IconType } from "react-icons"
import { HiOutlineCodeBracket, HiOutlineDocumentText, HiOutlinePaintBrush } from "react-icons/hi2"

type Service = {
  icon: string
  title: string
  description: string
  features: string[]
}

const iconMap: Record<string, IconType> = {
  design: HiOutlinePaintBrush,
  code: HiOutlineCodeBracket,
  content: HiOutlineDocumentText,
}

const Services = () => {
  const { t } = useTranslation('services');

  const items = t('items', {
    returnObjects: true,
  }) as Service[];

  return (
    <section
      id="services"
      className="min-h-screen py-16 scroll-mt-16 bg-secondary"
    >
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-primary mb-4">{t('title')}</h1>

        <p className="text-neutral-300 mb-12">{t('subtitle')}</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((service, index) => (
            <ServiceCard
              key={index}
              icon={iconMap[service.icon]}
              title={service.title}
              description={service.description}
              features={service.features}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Services