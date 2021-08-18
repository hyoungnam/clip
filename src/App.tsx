import React from 'react'
import Board from 'pages/Board'
import s from './App.module.scss'
import ErrorBoundary from 'components/ErrorBoundary'
function App() {
  return (
    <div className="App">
      <main className={s.main}>
        <ErrorBoundary>
          <Board />
        </ErrorBoundary>
      </main>
    </div>
  )
}

export default App
