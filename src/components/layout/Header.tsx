import { useEffect, useState, useRef } from "react"
import { Trans, useTranslation } from "react-i18next"
import { LuMenu, LuX } from "react-icons/lu"
import LanguageSwitcher from "../ui/LanguageSwitcher"

type NavLink = 'home' | 'about' | 'skills' | 'services' | 'portfolio' | 'contact'

const navLinks: NavLink[] = ['home', 'about', 'skills', 'services', 'portfolio', 'contact']

const Header = () => {
  const { t, i18n } = useTranslation('common')
  const [activeSection, setActiveSection] = useState<NavLink>('home')
  const [showMenu, setShowMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  const menuRef = useRef<HTMLDivElement>(null)
  const navRefs = useRef<Partial<Record<NavLink, HTMLButtonElement | null>>>({})

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

  // Track scroll position for the compact/floating state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Move the sliding indicator behind the active nav link
  useEffect(() => {
    const updateIndicator = () => {
      const el = navRefs.current[activeSection]
      if (el) {
        setIndicator({ left: el.offsetLeft, width: el.offsetWidth })
      }
    }

    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
    // Recompute when the language changes too, since label widths shift
  }, [activeSection, i18n.resolvedLanguage])

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
      <div className="px-4 pt-4">
        <div
          className={`mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full border backdrop-blur-xl transition-all duration-300 ${scrolled
              ? 'border-neutral-800 bg-neutral-950/90 px-3 py-2 shadow-xl shadow-black/30'
              : 'border-neutral-800/50 bg-neutral-950/70 px-4 py-2.5 shadow-lg shadow-black/10'
            }`}
        >
          {/* Logo */}
          <div className="flex shrink-0 items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 text-sm font-bold text-white">
              ST
            </div>
            <div className="hidden text-sm font-semibold tracking-tight text-blue-200 sm:block">
              <Trans
                i18nKey="name"
                components={{ b: <b className="font-bold text-white" /> }}
              />
            </div>
          </div>

          {/* Desktop nav with sliding indicator */}
          <nav className="relative hidden items-center gap-1 rounded-full bg-neutral-900/60 p-1 md:flex">
            <span
              className="absolute inset-y-1 rounded-full bg-blue-500 shadow-md shadow-blue-500/30 transition-all duration-300 ease-out"
              style={{ left: indicator.left, width: indicator.width }}
              aria-hidden="true"
            />
            {navLinks.map((link) => (
              <button
                key={link}
                ref={(el) => { navRefs.current[link] = el }}
                type="button"
                onClick={() => handleNavClick(link)}
                aria-current={activeSection === link ? 'page' : undefined}
                className={`relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${activeSection === link
                    ? 'text-white'
                    : 'text-neutral-400 hover:text-white'
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
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-white transition-colors hover:bg-neutral-800 md:hidden"
            onClick={toggleMenu}
            aria-label={showMenu ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={showMenu}
          >
            {showMenu ? <LuX className="text-lg" /> : <LuMenu className="text-lg" />}
          </button>
        </div>
      </div>

      <div className={`fixed inset-0 z-40 md:hidden ${showMenu ? 'visible' : 'pointer-events-none'}`}>
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity ${showMenu ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setShowMenu(false)}
        />

        <aside
          ref={menuRef}
          className={`absolute right-0 top-0 flex h-full w-full max-w-[85vw] flex-col justify-between rounded-l-3xl border-l border-neutral-800 bg-neutral-950 p-6 shadow-2xl shadow-black/40 transition-transform duration-300 ${showMenu ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div>
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 text-sm font-bold text-white">
                  ST
                </div>
                <span className="text-lg font-semibold text-blue-200">{t('nav.home')}</span>
              </div>
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
                  className={`w-full rounded-2xl px-4 py-4 text-left text-base font-medium transition-all duration-200 ${activeSection === link
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
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