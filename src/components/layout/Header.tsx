import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation('common');
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = ['home', 'about', 'skills', 'services', 'portfolio', 'contact'];

  // Detect active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        })
      },
      { threshold: 0.5 }
    )

    navLinks.forEach((link) => {
      const section = document.getElementById(link);
      if (section) observer.observe(section);
    })

    return () => observer.disconnect()
  }, []);

  const handleNavClick = (link: string) => {
    const element = document.getElementById(link);
    element?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <nav className="fixed w-full z-50">
      <ul className="flex justify-center gap-2 text-neutral-200 font-light bg-secondary ">
        {navLinks.map(link => (
          <li key={link}>
            <button
              onClick={() => handleNavClick(link)}
              className={`relative inline-block py-5 px-4 bg hover:text-blue-200 transition-all duration-200 ${activeSection === link ? 'text-blue-200' : ''} cursor-pointer`}
            >
              <span className={`absolute top-0 left-0 right-0 h-1 bg-blue-400 rounded-b-md transition-all ${activeSection === link ? 'opacity-100' : 'opacity-0'}`} />
              {t(`nav.${link}`)}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Header