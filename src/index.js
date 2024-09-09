import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import { AuthContextProvider } from './context/Auth.jsx'
import { ChatContextProvider } from './context/ChatContext.jsx'

createRoot(document.getElementById('root')).render( 
  <AuthContextProvider>
    <ChatContextProvider>
      <StrictMode>
        <App />
      </StrictMode>,
    </ChatContextProvider>
  </AuthContextProvider>
)
