import { HiOutlineEye } from 'react-icons/hi2'
import { FaGithub, FaGitlab } from 'react-icons/fa'

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

  const RepoIcon =
    repoType === "gitlab"
      ? FaGitlab
      : FaGithub

  return (
    <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg overflow-hidden hover:border-blue-200/50 transition-all duration-300 hover:-translate-y-2 flex flex-col">

      <div className="h-48 overflow-hidden">
        <img src={`/images/projects/${image}.png`} alt={title} className="w-full h-full object-cover" />
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
  )
}

export default ProjectCard