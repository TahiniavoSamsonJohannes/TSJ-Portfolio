import { useEffect, useState, useRef } from "react"
import { Trans, useTranslation } from "react-i18next"
import { LuMenu, LuX } from "react-icons/lu"
import LanguageSwitcher from "../ui/LanguageSwitcher"

type NavLink = 'home' | 'about' | 'skills' | 'services' | 'portfolio' | 'contact'

const navLinks: NavLink[] = ['home', 'about', 'skills', 'services', 'portfolio', 'contact']

const Header = () => {
  const { t } = useTranslation('common')
  const [activeSection, setActiveSection] = useState<NavLink>('home')
  const [showMenu, setShowMenu] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)

  // Detect active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as NavLink)
          }
        })
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      }
    )

    navLinks.forEach((link) => {
      const section = document.getElementById(link)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowMenu(false)
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [showMenu])

  const handleNavClick = (link: NavLink) => {
    const element = document.getElementById(link)
    element?.scrollIntoView({ behavior: 'smooth' })
    setShowMenu(false)
  }

  const toggleMenu = () => {
    setShowMenu((prev) => !prev)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 border-b border-neutral-800 px-4 py-4 backdrop-blur-xl shadow-xl shadow-black/10">
        <div className="flex items-center gap-4">
          <div className="text-lg font-semibold tracking-tight text-blue-200">
            <Trans
              i18nKey="name"
              components={{ b: <b className="font-bold" /> }}
            />
          </div>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <button
              key={link}
              type="button"
              onClick={() => handleNavClick(link)}
              aria-current={activeSection === link ? 'page' : undefined}
              className={`rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
                activeSection === link
                  ? 'bg-blue-500 text-white'
                  : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              {t(`nav.${link}`)}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
        </div>

        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-2xl text-white transition-colors hover:bg-neutral-800 md:hidden"
          onClick={toggleMenu}
          aria-label={showMenu ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={showMenu}
        >
          {showMenu ? <LuX className="text-xl" /> : <LuMenu className="text-xl" />}
        </button>
      </div>

      <div className={`fixed inset-0 z-40 md:hidden ${showMenu ? 'visible' : 'pointer-events-none'}`}>
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${showMenu ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setShowMenu(false)}
        />

        <aside
          ref={menuRef}
          className={`absolute right-0 top-0 flex h-full w-full max-w-[85vw] flex-col justify-between bg-neutral-950 p-6 shadow-2xl shadow-black/40 transition-transform duration-300 ${
            showMenu ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            <div className="mb-8 flex items-center justify-between">
              <div className="text-xl font-semibold text-blue-200">{t('nav.home')}</div>
              <button
                type="button"
                onClick={() => setShowMenu(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white transition hover:bg-neutral-800"
                aria-label="Fermer le menu"
              >
                <LuX className="text-xl" />
              </button>
            </div>

            <nav className="space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link}
                  type="button"
                  onClick={() => handleNavClick(link)}
                  aria-current={activeSection === link ? 'page' : undefined}
                  className={`w-full rounded-2xl px-4 py-4 text-left text-base font-medium transition-all duration-200 ${
                    activeSection === link
                      ? 'bg-blue-500 text-white'
                      : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  {t(`nav.${link}`)}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <LanguageSwitcher className="justify-center" />
            <p className="text-sm leading-relaxed text-neutral-400">{t('footer.quickLinks')}</p>
          </div>
        </aside>
      </div>
    </header>
  )
}

export default Header