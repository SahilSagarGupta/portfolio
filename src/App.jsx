import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Demo from './sections/Demo'
import Contact from './sections/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <Loader />
      <Navbar />
      <main>
        <Home />
        <About />
        <Skills />
        <Projects />
        <Demo />
        <Contact />
      </main>
      <footer />
    </div>
  )
}

export default App;
