
import './App.css'
import RoutesIndex from '@/routes/RoutesIndex'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { EventProvider } from '@/context/EventContext'

function App() {

  return (
    <>
    
    <AuthProvider>
      <EventProvider>
        <BrowserRouter>
          <RoutesIndex/>
        </BrowserRouter>
      </EventProvider>
    </AuthProvider>
      
    </>
      
  )
}

export default App
