import { useTranslation } from "react-i18next"
import ProjectCard from '../ui/ProjectCard'

type Project = {
  id: string
  title: string
  description: string
  image: string
  tech: string[]
  demo: string | null
  repository: string | null
  repoType: "github" | "gitlab" | null
  ctaLabels: {
    viewDemo: string
    viewCode: string
    comingSoon: string
  }
}

const Portfolio = () => {
  const { t } = useTranslation('portfolio')

  const projects = t('projects', {
    returnObjects: true,
  }) as Project[];

  const ctaLabels = {
    viewDemo: t('cta.viewDemo'),
    viewCode: t('cta.viewCode'),
    comingSoon: t('cta.comingSoon'),
  }

  return (
    <section
      id="portfolio"
      className="min-h-screen py-16 scroll-mt-16 bg-secondary"
    >
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Title */}
        <h1 className="text-5xl font-bold text-primary mb-4">{t('title')}</h1>

        <p className="text-neutral-300 mb-12">{t('subtitle')}</p>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              tech={project.tech}
              demo={project.demo}
              repository={project.repository}
              repoType={project.repoType}
              ctaLabels={ctaLabels}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Portfolio