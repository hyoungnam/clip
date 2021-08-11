import React from 'react'
import Board from 'pages/Board'
import s from './app.module.scss'
function App() {
  return (
    <div className="App">
      <main className={s.main}>
        <Board />
      </main>
    </div>
  )
}
  
export default App
