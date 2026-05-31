import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Demo from './sections/Demo'
import Contact from './sections/Contact'

function App() {
  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300">
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Demo />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App