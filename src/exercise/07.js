// Production performance monitoring
// http://localhost:3000/isolated/exercise/07.js

import React from 'react'
import reportProfile from '../report-profile'
import {unstable_trace as trace} from 'scheduler/tracing'

function Greeting() {
  const [greeting, setGreeting] = React.useState()

  function handleSubmit(event) {
    event.preventDefault()
    const name = event.target.elements.name.value
    trace('form submitted', performance.now(), () => {
      setGreeting(`Hello ${name}`)
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input id="name" />
      </form>
      <div>{greeting}</div>
    </div>
  )
}

function Counter() {
  const [count, setCount] = React.useState(0)
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>{count}</button>
}

function App() {
  return (
    <div>
      <React.Profiler id="counter" onRender={reportProfile}>
        <div>
          Profiled counter
          <Counter />
        </div>
      </React.Profiler>
      <div>
        Unprofiled counter
        <Counter />
      </div>
    </div>
  )
}

export default App
