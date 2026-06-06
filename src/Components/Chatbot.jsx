import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { HiX, HiPaperAirplane, HiSparkles } from 'react-icons/hi'

const SYSTEM_PROMPT = `You are Sahil's AI assistant on his portfolio website. You answer questions about Sahil Sagar Gupta in a friendly, concise, and professional way.

Here is everything about Sahil:

PERSONAL:
- Name: Sahil Sagar Gupta
- Degree: Currently pursuing MCA (Master of Computer Applications) specializing in AI & ML from Chandigarh University
- Location: Chandigarh, India
- Status: Open to work — looking for internships and full-time roles
- Email: sahilsagar.dev@gmail.com
- GitHub: https://github.com/SahilSagarGupta
- LinkedIn: https://linkedin.com/in/sahilsagargupta

JOB INTERESTS:
- AI Engineer, ML Engineer, AIML Engineer
- Full Stack Developer, Frontend Developer, Web Developer
- Open to both on-campus and off-campus opportunities

SKILLS:
- Languages: Python (Advanced), JavaScript (Intermediate), C++, HTML5, CSS3
- Frontend: React, Tailwind CSS, Bootstrap, Vite
- AI/ML: TensorFlow, PyTorch, Scikit-learn, NumPy, Pandas, Matplotlib
- Backend: Node.js, FastAPI
- Databases: MongoDB, MySQL
- Tools: Git, Docker, GitHub

PROJECTS:
1. SkillBridge AI (Featured - Building in Public)
   - AI-Powered Skill Gap Analyzer
   - Analyzes resumes against job descriptions using NLP and ML
   - Tech: Python, FastAPI, RoBERTa, PyTorch, Scikit-learn, React
   - Features: Multi-layer skill extraction, semantic matching, personalized learning roadmaps

2. AI Email Generator
   - Generates professional emails from user prompts
   - Tech: React, JavaScript, Python, FastAPI, LLM API

3. Wine Quality Prediction
   - ML model predicting wine quality
   - Tech: Python, Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn

4. Pathfinding Visualizer
   - Real-time visualization of pathfinding algorithms
   - Tech: React, JavaScript, HTML, CSS

5. Task Forge
   - Task management and productivity application
   - Tech: React, JavaScript, CSS, Local Storage

6. Pizza Sales Data Analysis
   - SQL-based business intelligence
   - Tech: MySQL, SQL

7. Quiz Application
   - Interactive web-based quiz platform
   - Tech: HTML, CSS, JavaScript

AVAILABILITY:
- Available for internships immediately
- Open to full-time roles post MCA completion
- Response time: within 24 hours

GUIDELINES:
- Keep answers short and friendly (2-4 sentences max)
- If asked something you don't know about Sahil, say "I don't have that info — you can reach Sahil directly at sahilsagar.dev@gmail.com"
- Never make up information
- Always encourage visitors to connect on LinkedIn or GitHub
- Respond in the same language the visitor uses (Hindi or English)`

const SUGGESTED_QUESTIONS = [
  "What projects is Sahil working on?",
  "Is he available for internship?",
  "What's his tech stack?",
]

const Message = ({ msg }) => (
  <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
    {msg.role === 'assistant' && (
      <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
        <HiSparkles size={14} className="text-white" />
      </div>
    )}
    <div
      className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
        msg.role === 'user'
          ? 'bg-purple-600 text-white rounded-tr-sm'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-sm'
      }`}
    >
      {msg.content}
    </div>
  </div>
)

const TypingIndicator = () => (
  <div className="flex justify-start mb-3">
    <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center mr-2 flex-shrink-0">
      <HiSparkles size={14} className="text-white" />
    </div>
    <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-2xl rounded-tl-sm">
      <div className="flex gap-1 items-center">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  </div>
)

const Chatbot = () => {
  const { isDark } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! 👋 I'm Sahil's AI assistant. Ask me anything about his skills, projects, or availability!",
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100)
  }, [isOpen])


  const sendMessage = async (text) => {
    const userText = text || input.trim()
    if (!userText || isTyping) return

    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userText }])
    setIsTyping(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    try {
      const conversationHistory = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }))

      conversationHistory.push({
        role: 'user',
        parts: [{ text: userText }],
      })

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: SYSTEM_PROMPT }],
            },
            contents: conversationHistory,
            generationConfig: {
              maxOutputTokens: 300,
              temperature: 0.7,
            },
          }),
        }
      )

      const data = await response.json()
      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't process that. Please try again!"

      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Oops! Something went wrong. You can reach Sahil directly at sahilsagar.dev@gmail.com 📧",
      }])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-30 w-80 sm:w-96 flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-purple-600 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <HiSparkles size={16} className="text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Sahil's Assistant</p>
                <p className="text-purple-200 text-xs">Powered by Gemini AI</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <HiX size={20} />
            </button>
          </div>

          {/* Messages — fixed height + scroll */}
          <div className="overflow-y-auto p-4 h-72 scroll-smooth">
            {messages.map((msg, i) => (
              <Message key={i} msg={msg} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2 flex-shrink-0">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center gap-2 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Sahil..."
              className="flex-1 text-sm px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              className="w-9 h-9 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <HiPaperAirplane size={16} className="text-white rotate-90" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/30 flex items-center justify-center transition-all duration-200 hover:scale-110"
      >
        {isOpen
          ? <HiX size={22} className="text-white" />
          : <HiSparkles size={22} className="text-white" />
        }
      </button>
    </>
  )
}

export default Chatbot