import { useTranslation } from "react-i18next"

type Skill = {
  name: string
  level: string
}

type Category = {
  name: string
  skills: Skill[]
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
      className="min-h-screen py-16 scroll-mt-16 bg-secondary"
    >
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-primary mb-4">{t('title')}</h1>

        <p className="text-neutral-300 mb-12">{t('subtitle')}</p>

        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex}>

              <h2 className="text-2xl font-semibold text-primary mb-6">{category.name}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-neutral-200">{skill.name}</span>
                      <span className="text-sm text-neutral-400">{skill.level}</span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ease-out ${getLevelColor(skill.level)}`}
                        style={{ 
                          width: `${getLevelPercentage(skill.level)}%`,
                          transitionDelay: `${skillIndex * 100}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Skills