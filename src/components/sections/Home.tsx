  import { useTranslation } from "react-i18next";
  import Profile from "../../assets/images/profile.png";

  const Home = () => {
    const { t } = useTranslation(['home', 'common']);

    const scrollTo = (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    return (
      <section
        id="home"
        className="flex items-center min-h-screen py-16 scroll-mt-16 bg-secondary"
      >
        <div className="flex justify-between gap-10 max-w-5xl mx-auto px-4 ">
          <div>
            <div>{t('home:greeting')} {t('home:aka')}</div>
            <div className="max-w-xl leading-tight text-blue-300 text-7xl font-bold">{t('home:role')}</div>
            <div className="flex items-center gap-5">
              <button
                onClick={() => scrollTo('contact')}
                className="relative inline-block font-semibold cursor-pointer pb-2 pt-4
                after:content-['']
                after:absolute
                after:left-1
                after:right-1
                after:bottom-0
                after:h-1
                after:bg-blue-200
                after:rounded-full
                after:transition-all 
                after:duration-500
                hover:after:right-full
                hover:primary-color"
              >
                {t('common:cta.contact')}
              </button>
              <button
                className="relative inline-block font-semibold cursor-pointer pb-2 pt-4
                after:content-['']
                after:absolute
                after:left-1
                after:right-1
                after:bottom-0
                after:h-1
                after:bg-blue-200
                after:rounded-full
                after:transition-all 
                after:duration-500
                hover:after:right-full
                hover:primary-color"
              >
                {t('common:cta.downloadCV')}
              </button>
            </div>
          </div>
          <img src={Profile} alt="Profile" className="w-110 h-110 rounded-4xl" />
        </div>
      </section>
    )
  }

  export default Home