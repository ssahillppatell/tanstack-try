import { DataContextProvider } from "./contexts/data"
import Home from "./pages/Home"

function App() {
  return (
    <DataContextProvider>
      <div>
        <Home />
      </div>
    </DataContextProvider>
  )
}

export default App
