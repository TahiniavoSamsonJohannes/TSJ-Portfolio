import { HiOutlineEye, HiOutlineArrowsPointingOut, HiOutlinePhoto, HiOutlineArrowDownTray } from 'react-icons/hi2'
import { FaGithub, FaGitlab } from 'react-icons/fa'
import { useRef, useState } from 'react'
import { useProjectImages } from '../../hooks/useProjectImages'
import ProjectModal from './ProjectModal'

type ProjectCardProps = {
  title: string
  description: string
  image: string
  tech: string[]
  demo: string | null
  apk?: string | null
  repository: string | null
  repoType: "github" | "gitlab" | null
  ctaLabels: {
    viewDemo: string
    viewCode: string
    comingSoon: string
    viewGallery: string
    downloadApk: string
  }
}

const ProjectCard = ({
  title,
  description,
  image,
  tech,
  demo,
  apk,
  repository,
  repoType,
  ctaLabels
}: ProjectCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [originRect, setOriginRect] = useState<DOMRect | null>(null)
  const coverImgRef = useRef<HTMLImageElement>(null)

  // Automatically detects nameOfProject1.png, nameOfProject2.png, ... on disk
  const images = useProjectImages(`/images/projects/${image}`)

  const RepoIcon =
    repoType === "gitlab"
      ? FaGitlab
      : FaGithub

  // Capture the cover image's current position/size right before opening the
  // modal, so ProjectModal can animate the image flying from here into place.
  const openModal = () => {
    if (coverImgRef.current) {
      setOriginRect(coverImgRef.current.getBoundingClientRect())
    }
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="flex flex-col overflow-hidden rounded-2xl border border-neutral-700 bg-neutral-800/50 transition-all duration-300 hover:-translate-y-2 hover:border-blue-200/50 hover:shadow-xl hover:shadow-blue-200/5">

        <div
          role="button"
          tabIndex={0}
          onClick={openModal}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') openModal()
          }}
          aria-label={title}
          className="group relative h-52 cursor-pointer overflow-hidden"
        >
          <img
            ref={coverImgRef}
            src={images[0]}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Subtle gradient so the badge/button stay readable on any image */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-neutral-950/85 via-neutral-950/0 to-neutral-950/0" />

          {images.length > 1 && (
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-neutral-950/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
              <HiOutlinePhoto className="h-3.5 w-3.5" />
              {images.length}
            </div>
          )}

          {/* Always visible, explicit gallery entry point */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              openModal()
            }}
            className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-neutral-950/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur transition-colors hover:border-blue-300 hover:bg-blue-600"
          >
            <HiOutlineArrowsPointingOut className="h-3.5 w-3.5" />
            {ctaLabels.viewGallery}
          </button>
        </div>

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
                           px-4 py-2.5 bg-blue-600 text-white rounded-full
                           hover:bg-blue-700 transition-colors text-sm font-medium">
                <HiOutlineEye className="w-4 h-4" />
                {ctaLabels.viewDemo}
              </a>
            ) : apk ? (
              <a
                href={apk}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2
                           px-4 py-2.5 bg-blue-600 text-white rounded-full
                           hover:bg-blue-700 transition-colors text-sm font-medium">
                <HiOutlineArrowDownTray className="w-4 h-4" />
                {ctaLabels.downloadApk}
              </a>
            ) : (
              <div className="flex-1 flex items-center justify-center
                              px-4 py-2.5 bg-neutral-700 text-neutral-400
                              rounded-full text-sm">
                {ctaLabels.comingSoon}
              </div>
            )}

            {repository && (
              <a
                href={repository}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2
                           px-4 py-2.5 border-2 border-blue-600 text-blue-200
                           rounded-full hover:bg-blue-600/10 transition-colors text-sm font-medium">
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
        images={images}
        originRect={originRect}
      />
    </>
  )
}

export default ProjectCard