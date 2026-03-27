import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// ── FR ──
import commonFR from './locales/fr/common.json'
import homeFR from './locales/fr/home.json'
import aboutFR from './locales/fr/about.json'
import skillsFR from './locales/fr/skills.json'
import servicesFR from './locales/fr/services.json'
import portfolioFR from './locales/fr/portfolio.json'
import contactFR from './locales/fr/contact.json'

// ── EN ──
import commonEN from './locales/en/common.json'
import homeEN from './locales/en/home.json'
import aboutEN from './locales/en/about.json'
import skillsEN from './locales/en/skills.json'
import servicesEN from './locales/en/services.json'
import portfolioEN from './locales/en/portfolio.json'
import contactEN from './locales/en/contact.json'

const resources = {
  fr: {
    common: commonFR,
    home: homeFR,
    about: aboutFR,
    skills: skillsFR,
    services: servicesFR,
    portfolio: portfolioFR,
    contact: contactFR,
  },
  en: {
    common: commonEN,
    home: homeEN,
    about: aboutEN,
    skills: skillsEN,
    services: servicesEN,
    portfolio: portfolioEN,
    contact: contactEN,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    supportedLngs: ["fr", "en"],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],  // Priorité de détection
      caches: ['localStorage'],               // Sauvegarde le choix
    },
  })

export default i18n