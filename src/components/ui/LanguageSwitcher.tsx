import { useTranslation } from 'react-i18next'

type LanguageCode = 'fr' | 'en'

type LanguageSwitcherProps = {
  className?: string
}

const languages: Array<{ code: LanguageCode; label: string }> = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
]

const LanguageSwitcher = ({ className = '' }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation()

  const currentLanguage = i18n.resolvedLanguage?.startsWith('fr') ? 'fr' : 'en'

  const changeLanguage = (lang: LanguageCode) => {
    if (currentLanguage !== lang) {
      i18n.changeLanguage(lang)
    }
  }

  return (
    <div className={`inline-flex items-center rounded-full bg-neutral-900/90 border border-neutral-800 p-1 shadow-lg ${className}`}>
      {languages.map((language) => (
        <button
          key={language.code}
          type="button"
          onClick={() => changeLanguage(language.code)}
          className={`px-3 py-2 rounded-full text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            currentLanguage === language.code
              ? 'bg-blue-500 text-white'
              : 'text-neutral-300 hover:bg-neutral-800'
          }`}
          aria-pressed={currentLanguage === language.code}
          aria-label={language.code === 'fr' ? 'Français' : 'English'}
        >
          {language.label}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
