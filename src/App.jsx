import Loader from './components/Loader'
// import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Demo from './sections/Demo'
import Contact from './sections/Contact'
// import Footer from './components/Footer'

function App() {
  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300">
      <Loader />
      {/* <Navbar /> */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Demo />
        <Contact />
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default App