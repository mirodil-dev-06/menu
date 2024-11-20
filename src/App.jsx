import React from 'react'
import './App.css'
import Menu from './components/Menu'

function App() {
  return (
    <div className='app'>
      <div className="header">
        <h1 className='header__title'>Our Menu</h1>
        <span className='header__line'></span>
      </div>
      <Menu/>
    </div>
  )
}

export default App