import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiHeart } from 'react-icons/hi'

const Footer = () => {
  return (
    <footer className="bg-wihte dark:bg-gray-900">
        {/* Divider */}
        <div>
          <p className="text-sm pb-5 pt-10 text-gray-900 dark:text-gray-400 flex items-center justify-center gap-1.5">
            Made with <HiHeart className="text-purple-500" size={16} /> by
            <span className="text-gray-700 dark:text-gray-300 font-medium">Sahil Sagar Gupta</span>
            · {new Date().getFullYear()}
          </p>
        </div>
    </footer>
  )
}

export default Footer