import { useState } from 'react'
import {BrowserRouter as Router,  HashRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import Accessories from './components/Accessories'
import Navbar from './components/Navbar'
import Detail from './components/Detail'
import Footer from './components/Footer'
import Signup from './components/Signup'
import Signin from './components/Signin'
import { UserAuthProvider } from './context/userAuthProvider'

function App() {


  return (
    <>
    <Router>
      <UserAuthProvider />
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Accessories/>}/>
        <Route path='/item/:id' element={<Detail/>}/>
        <Route path='/register' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
      </Routes>
      <Footer/>
      {/* </UserAuthProvider> */}
    </Router>

      
    </>
  )
}

export default App
