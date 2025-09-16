import { DataContextProvider } from "./contexts/data"
import Home from "./pages/Home"

function App() {
  return (
    <DataContextProvider>
        <Home />
    </DataContextProvider>
  )
}

export default App
