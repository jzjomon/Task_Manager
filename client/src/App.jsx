import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Sign from './pages/Sign'
import Home from './pages/Home'
import AddTask from './pages/AddTask'
import { Authorization, SignOutOrHome } from './constants/Authorization'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<SignOutOrHome />}>
          <Route path='/' element={<Sign />} />
        </Route>
        <Route element={<Authorization />} >
          <Route path='/home' element={<Home />} />
          <Route path='/addTask/:id' element={<AddTask />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App