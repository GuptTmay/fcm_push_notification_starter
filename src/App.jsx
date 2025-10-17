import './App.css'
import { get_client_token, onForegroundMessage } from './firebase'

function App() {
  onForegroundMessage()
  return (
    <div>
      <h1>Hello, World</h1>
      <button onClick={() => {
        get_client_token()
      }}>Generate Token (Press Once Check Console)</button>
    </div>
  )
}

export default App
