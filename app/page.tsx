'use client'

import { useState } from 'react'
import { useChat } from 'ai/react'

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्' },
]

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      language: selectedLanguage,
    },
  })

  return (
    <div className="container">
      <div className="header">
        <h1>🛍️ Order Confirmation Agent</h1>
        <p>Multilingual support for all Indian languages</p>
      </div>

      <div className="language-selector">
        <label htmlFor="language">Select Your Language / अपनी भाषा चुनें:</label>
        <select
          id="language"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.nativeName} ({lang.name})
            </option>
          ))}
        </select>
      </div>

      <div className="chat-container">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <h2>Welcome! स्वागत है! স্বাগতম!</h2>
            <p>
              I can help you with order confirmations, tracking, cancellations, and returns in your preferred language.
            </p>
            <p style={{ marginTop: '12px' }}>
              Start by saying hello or ask about your order!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`message ${message.role}`}>
              <div className="message-avatar">
                {message.role === 'assistant' ? '🤖' : '👤'}
              </div>
              <div className="message-content">
                {message.content}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="message assistant">
            <div className="message-avatar">🤖</div>
            <div className="message-content">
              <div className="loading">
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="input-container">
        <form onSubmit={handleSubmit} className="input-form">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder={
              selectedLanguage === 'hi' ? 'अपना संदेश टाइप करें...' :
              selectedLanguage === 'bn' ? 'আপনার বার্তা টাইপ করুন...' :
              selectedLanguage === 'te' ? 'మీ సందేశాన్ని టైప్ చేయండి...' :
              selectedLanguage === 'ta' ? 'உங்கள் செய்தியை தட்டச்சு செய்க...' :
              'Type your message...'
            }
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  )
}
