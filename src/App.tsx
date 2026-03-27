import Footer from "./components/layout/Footer"
import Header from "./components/layout/Header"
import About from "./components/sections/About"
import Contact from "./components/sections/Contact"
import Home from "./components/sections/Home"
import Portfolio from "./components/sections/Portfolio"
import Services from "./components/sections/Services"
import Skills from "./components/sections/Skills"

const App = () => {

  return (
    <div className="min-h-screen bg-white text-neutral-200">
      <Header />
      <main>
        <Home />
        <About />
        <Skills />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App