import React from 'react'
import Nav from './nav'
import Rout from './rout'
import Contact from './contact'
import Footer from './footer'
import {BrowserRouter} from 'react-router-dom'
import Feedback from './feedback'
const App = () => {
  return(
    <>
    <BrowserRouter>

    <Nav/>
    <Rout/>
    <Feedback/>
    <Contact/>
    <Footer/>
    </BrowserRouter>
    </>
  )
}
export default App