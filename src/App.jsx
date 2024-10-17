import Homepage from './pages/homepage'
import Login from './pages/login'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/private-route'
import { useContext } from 'react'
import { AuthContext } from './firebase/context/auth-provider'
import { SnackbarProvider } from 'notistack'
import './App.css'
import Simulation from './pages/simulation'

function App() {
  const { user } = useContext(AuthContext)

  if (user === undefined) {
    return null
  }

  return (
    <>
      <SnackbarProvider />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />
        <Route
          path="/simulador-vivienda"
          element={
            <PrivateRoute>
              <Simulation />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
