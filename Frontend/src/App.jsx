import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import AuthPage from './page/sign-in/authPage'

function App() {
  const [count, setCount] = useState(0)

  return (
<Routes>
        <Route path="/" element={<AuthPage />} />
 
      </Routes>
  )
}

export default App
