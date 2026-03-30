import { useTranslation } from 'react-i18next'
import { FaFacebook, FaWhatsapp, FaLinkedin, FaGithub } from 'react-icons/fa'
import { HiOutlineArrowUp } from 'react-icons/hi2'

const Footer = () => {
  const { t } = useTranslation('common');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-neutral-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="flex flex-col justify-between items-center gap-6">

          {/* Copyright */}
          <p className="text-neutral-400 text-sm text-center md:text-left">
            {t('footer.rights', { year: new Date().getFullYear() })}
          </p>

          {/* Bouton retour en haut */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 bg-neutral-800 text-white rounded-full
                       flex items-center justify-center
                       hover:bg-blue-700 transition-colors"
          >
            <HiOutlineArrowUp className="w-5 h-5" />
          </button>

        </div>

      </div>
    </footer>
  )
}

export default Footer