import { useTranslation } from "react-i18next";
import Skill from "../ui/Skill";

type SkillType = {
  title: string
  experience: string
}

const About = () => {
  const { t } = useTranslation('about');

  const descriptions = t('description', {
    returnObjects: true,
  }) as string[];

  const skills = t('skills', {
    returnObjects: true
  }) as SkillType[];

  return (
    <section
      id="about"
      className="flex items-center min-h-screen pt-16 bg-secondary"
    >
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">{t('title')}</h1>
        <p className="text-neutral-300 mb-12">{t('contact:subtitle')}</p>

        <div className="space-y-4 my-8">
          {descriptions.map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <Skill skills={skills} />

      </div>
    </section>
  )
}

export default About