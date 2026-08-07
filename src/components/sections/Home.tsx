import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import Profile from "../../assets/images/profile.png"

const Home = () => {
  const { i18n, t } = useTranslation(['home', 'common'])

  const currentLanguage = useMemo(() => {
    return i18n.resolvedLanguage?.startsWith('fr') ? 'fr' : 'en'
  }, [i18n.resolvedLanguage])

  const downloadUrl = useMemo(() => {
    return currentLanguage === 'fr'
      ? '/documents/CV_SamsonJohannesTahiniavo_FR.pdf'
      : '/documents/CV_SamsonJohannesTahiniavo_EN.pdf'
  }, [currentLanguage])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="flex items-center min-h-screen pt-25 bg-secondary"
    >
      <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between gap-10 max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:items-center">
          <div className="w-full text-center md:text-left text-lg text-neutral-200 mb-4">{t('home:greeting')} {t('home:aka')}</div>
          <div className="max-w-xl text-center md:text-left leading-tight text-blue-300 text-5xl md:text-7xl font-bold mb-8">{t('home:role')}</div>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-start w-full">
            <button
              onClick={() => scrollTo('contact')}
              className="rounded-full border border-blue-500 bg-blue-500/10 px-6 py-3 text-sm font-semibold text-blue-200 transition hover:bg-blue-500 hover:text-white"
            >
              {t('common:cta.contact')}
            </button>
            <a
              href={downloadUrl}
              download
              className="rounded-full border border-neutral-700 bg-neutral-900/80 px-6 py-3 text-sm font-semibold text-neutral-200 transition hover:border-blue-500 hover:bg-neutral-800 hover:text-white"
            >
              {t('common:cta.downloadCV')}
            </a>
          </div>
        </div>
        <div className="relative">
          <img src={Profile} alt="Profile" className="w-72 h-auto md:w-96 rounded-4xl" />
        </div>
      </div>
    </section>
  )
}

export default Home