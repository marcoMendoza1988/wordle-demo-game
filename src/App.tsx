import Gameboard from './components/templates/Gameboard'
import { ThemeProvider } from './context/ThemeContext';
import './App.css'

function App() {

  return (
    <ThemeProvider>
      <Gameboard />      
    </ThemeProvider>
  )
}

export default App
