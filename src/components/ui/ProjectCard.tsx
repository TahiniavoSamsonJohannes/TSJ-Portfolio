import { HiOutlineEye, HiOutlineArrowsPointingOut, HiOutlinePhoto } from 'react-icons/hi2'
import { FaGithub, FaGitlab } from 'react-icons/fa'
import { useState } from 'react'
import { useProjectImages } from '../../hooks/useProjectImages'
import ProjectModal from './ProjectModal'

type ProjectCardProps = {
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

const ProjectCard = ({
  title,
  description,
  image,
  tech,
  demo,
  repository,
  repoType,
  ctaLabels
}: ProjectCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Automatically detects nameOfProject1.png, nameOfProject2.png, ... on disk
  const images = useProjectImages(`/images/projects/${image}`)

  const RepoIcon =
    repoType === "gitlab"
      ? FaGitlab
      : FaGithub

  return (
    <>
      <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg overflow-hidden hover:border-blue-200/50 transition-all duration-300 hover:-translate-y-2 flex flex-col">

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          aria-label={title}
          className="group relative h-48 overflow-hidden text-left"
        >
          <img
            src={images[0]}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {images.length > 1 && (
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-neutral-950/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
              <HiOutlinePhoto className="h-3.5 w-3.5" />
              {images.length}
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/0 opacity-0 transition-all duration-300 group-hover:bg-neutral-950/50 group-hover:opacity-100">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white">
              <HiOutlineArrowsPointingOut className="h-5 w-5" />
            </span>
          </div>
        </button>

        <div className="p-6 flex flex-col grow">

          <h3 className="text-xl font-bold text-blue-200 mb-3">{title}</h3>

          <p className="text-neutral-300 text-sm mb-4 grow">{description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {tech.map((t, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-200/10 text-blue-200 rounded-full text-xs border border-blue-200/20">
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-3">

            {demo ? (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2
                           px-4 py-2 bg-blue-600 text-white rounded-lg
                           hover:bg-blue-700 transition-colors text-sm">
                <HiOutlineEye className="w-4 h-4" />
                {ctaLabels.viewDemo}
              </a>
            ) : (
              <div className="flex-1 flex items-center justify-center
                              px-4 py-2 bg-neutral-700 text-neutral-400
                              rounded-lg text-sm">
                {ctaLabels.comingSoon}
              </div>
            )}

            {repository && (
              <a
                href={repository}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2
                           px-4 py-2 border-2 border-blue-600 text-blue-200
                           rounded-lg hover:bg-blue-600/10 transition-colors text-sm">
                <RepoIcon className="w-4 h-4" />
                {ctaLabels.viewCode}
              </a>
            )}

          </div>
        </div>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        description={description}
        images={images}
        tech={tech}
        demo={demo}
        repository={repository}
        repoType={repoType}
        ctaLabels={ctaLabels}
      />
    </>
  )
}

export default ProjectCard