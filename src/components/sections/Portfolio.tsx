import { useState } from "react"
import { useTranslation } from "react-i18next"
import { HiChevronDown } from "react-icons/hi2"
import ProjectCard from '../ui/ProjectCard'

type Project = {
  id: string
  title: string
  description: string
  image: string
  tech: string[]
  demo: string | null
  apk?: string | null
  repository: string | null
  repoType: "github" | "gitlab" | null
}

const PROJECTS_PER_PAGE = 6

const Portfolio = () => {
  const { t } = useTranslation('portfolio')
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE)

  const projects = t('projects', {
    returnObjects: true,
  }) as Project[];

  const ctaLabels = {
    viewDemo: t('cta.viewDemo'),
    viewCode: t('cta.viewCode'),
    comingSoon: t('cta.comingSoon'),
    viewGallery: t('cta.viewGallery'),
    downloadApk: t('cta.downloadApk'),
  }

  const visibleProjects = projects.slice(0, visibleCount)
  const hasMore = visibleCount < projects.length

  return (
    <section
      id="portfolio"
      className="min-h-screen pt-25 bg-secondary"
    >
      <div className="max-w-6xl mx-auto px-4">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">{t('title')}</h1>

        <p className="text-neutral-300 mb-12">{t('subtitle')}</p>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              tech={project.tech}
              demo={project.demo}
              apk={project.apk}
              repository={project.repository}
              repoType={project.repoType}
              ctaLabels={ctaLabels}
            />
          ))}
        </div>

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + PROJECTS_PER_PAGE)}
              className="flex items-center gap-2 rounded-full border border-blue-500 bg-blue-500/10 px-6 py-3 text-sm font-semibold text-blue-200 transition hover:bg-blue-500 hover:text-white"
            >
              {t('loadMore')}
              <HiChevronDown className="h-4 w-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  )
}

export default Portfolio