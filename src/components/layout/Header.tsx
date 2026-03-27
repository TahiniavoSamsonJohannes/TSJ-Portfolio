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
    <nav className="fixed w-full">
      <ul className="flex justify-center text-neutral-200 font-light bg-neutral-900 ">
        {navLinks.map(link => (
          <li key={link} className="px-1.5">
            <button
              onClick={() => handleNavClick(link)}
              className={`block py-5 px-3 hover:text-blue-200 transition-all duration-500 ${activeSection === link ? 'active-nav' : ''} cursor-pointer`}>
              {t(`nav.${link}`)}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Header