import { useTranslation } from "react-i18next"
import type { IconType } from "react-icons"
import { HiOutlineCodeBracket } from "react-icons/hi2"
import { FaJava } from "react-icons/fa"
import {
  SiJavascript,
  SiTypescript,
  SiPhp,
  SiPython,
  SiHtml5,
  SiCss,
  SiReact,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiMysql,
  SiPostgresql,
  SiSqlite,
  SiPrisma,
  SiSequelize,
  SiXml,
  SiAndroid,
  SiGit,
  SiGithub,
  SiGitlab,
  SiPostman,
} from "react-icons/si"

type Skill = {
  name: string
  level: string
}

type Category = {
  name: string
  skills: Skill[]
}

// Maps a skill name (as written in the locale files) to one or two brand icons.
// Kept monochrome (blue accent) everywhere to stay consistent with the rest of the site.
const techIcons: Record<string, IconType[]> = {
  "JavaScript": [SiJavascript],
  "TypeScript": [SiTypescript],
  "PHP": [SiPhp],
  "Java": [FaJava],
  "Python": [SiPython],
  "HTML": [SiHtml5],
  "CSS": [SiCss],
  "ReactJS": [SiReact],
  "Tailwind CSS": [SiTailwindcss],
  "Bootstrap": [SiBootstrap],
  "NodeJS": [SiNodedotjs],
  "NestJS": [SiNestjs],
  "Express": [SiExpress],
  "MySQL": [SiMysql],
  "PostgreSQL": [SiPostgresql],
  "SQLite": [SiSqlite],
  "Prisma": [SiPrisma],
  "Sequelize": [SiSequelize],
  "XML": [SiXml],
  "Android (Java)": [SiAndroid],
  "React Native": [SiReact],
  "Git": [SiGit],
  "GitHub": [SiGithub],
  "GitLab": [SiGitlab],
  "Postman": [SiPostman],
}

const Skills = () => {
  const { t } = useTranslation('skills')

  const categories = t('categories', {
    returnObjects: true,
  }) as Category[]

  // Fonction pour obtenir la couleur selon le niveau
  const getLevelColor = (level: string): string => {
    switch (level) {
      case 'Expérimenté':
      case 'Experienced':
        return 'bg-blue-200'
      case 'Intermédiaire':
      case 'Intermediate':
        return 'bg-blue-300/60'
      case 'Débutant':
      case 'Beginner':
        return 'bg-blue-400/40'
      default:
        return 'bg-blue-200'
    }
  }

  // Fonction pour obtenir le pourcentage selon le niveau
  const getLevelPercentage = (level: string): number => {
    switch (level) {
      case 'Expérimenté':
      case 'Experienced':
        return 90
      case 'Intermédiaire':
      case 'Intermediate':
        return 60
      case 'Débutant':
      case 'Beginner':
        return 30
      default:
        return 50
    }
  }

  return (
    <section
      id="skills"
      className="min-h-screen pt-25 bg-secondary"
    >
      <div className="max-w-5xl mx-auto px-4">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">{t('title')}</h1>

        <p className="text-neutral-300 mb-12">{t('subtitle')}</p>

        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex}>

              <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold text-primary">
                <span className="h-6 w-1 rounded-full bg-blue-500" />
                {category.name}
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {category.skills.map((skill, skillIndex) => {
                  const icons = techIcons[skill.name] ?? [HiOutlineCodeBracket]

                  return (
                    <div
                      key={skillIndex}
                      className="group rounded-xl border border-neutral-700 bg-neutral-800/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-200/10 text-blue-200 transition-colors group-hover:bg-blue-200/20">
                          {icons.length > 1 ? (
                            <div className="flex items-center gap-0.5">
                              {icons.map((Icon, i) => (
                                <Icon key={i} className="h-4 w-4" />
                              ))}
                            </div>
                          ) : (
                            (() => {
                              const Icon = icons[0]
                              return <Icon className="h-6 w-6" />
                            })()
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-neutral-200">{skill.name}</p>
                          <p className="text-xs text-neutral-400">{skill.level}</p>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-neutral-900">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-1000 ease-out ${getLevelColor(skill.level)}`}
                          style={{
                            width: `${getLevelPercentage(skill.level)}%`,
                            transitionDelay: `${skillIndex * 60}ms`
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Skills