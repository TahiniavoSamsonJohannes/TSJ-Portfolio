import { useEffect, useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import { LuMenu, LuX } from "react-icons/lu"

const Header = () => {
  const { t } = useTranslation('common')
  const [activeSection, setActiveSection] = useState('home')
  const [showMenu, setShowMenu] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)

  const navLinks = ['home', 'about', 'skills', 'services', 'portfolio', 'contact']

  // Detect active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
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
      // Vérifie si le clic est en dehors du menu
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])

  const handleNavClick = (link: string) => {
    const element = document.getElementById(link)
    element?.scrollIntoView({ behavior: 'smooth' })
    setShowMenu(false) // Ferme le menu après navigation
  }

  const toggleMenu = () => {
    setShowMenu((prev) => !prev)
  }

  return (
    <nav ref={menuRef} className="fixed max-w-screen max-h-15 z-50 bg-transparent">

      {/* Menu hamburger */}
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-4 left-4 text-4xl p-2  bg-secondary shadow-lg z-50 rounded-full  cursor-pointer hover:bg-neutral-800 transition-colors" 
        aria-label="Toggle menu"
      >
        {showMenu ? <LuX className="text-2xl" /> : <LuMenu className="text-2xl" />}
      </button>

      {/* Menu */}
      <ul
        className={`md:flex w-screen flex-col md:flex-row justify-center gap-2 text-neutral-200 font-light bg-secondary top-0 left-0 right-0 pt-16 md:pt-0 shadow-lg md:shadow-none ${showMenu ? 'menu-enter' : 'menu-exit md:transform md:translate-y-full'} `}
      >
        {navLinks.map((link) => (
          <li
            key={link}
          >
            <button
              onClick={() => handleNavClick(link)}
              className={`
                relative inline-block py-5 px-4 w-full md:w-fit 
                hover:text-blue-200 transition-all duration-200 
                ${activeSection === link ? 'text-blue-200' : ''} 
                cursor-pointer
              `}
            >
              <span
                className={`
                  absolute top-0 left-0 right-0 h-1 
                  bg-blue-400 rounded-b-md transition-all 
                  ${activeSection === link ? 'opacity-100' : 'opacity-0'}
                `}
              />
              {t(`nav.${link}`)}
            </button>
          </li>
        ))}
      </ul>

      {/* Overlay pour mobile (optionnel mais recommandé) */}
      {showMenu && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 -z-10"
          onClick={() => setShowMenu(false)}
        />
      )}

    </nav>
  )
}

export default Header