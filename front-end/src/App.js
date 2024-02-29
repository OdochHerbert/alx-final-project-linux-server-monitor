import React from 'react'
import Nav from './nav'
import Rout from './rout'
import Contact from './contact'
import Footer from './footer'
import {BrowserRouter} from 'react-router-dom'
import Feedback from './feedback'
import { useAuth0 } from "@auth0/auth0-react";
const App = () => {
  const { loginWithRedirect, logout, user, isAuthenticated} = useAuth0()
  return(
    <>
    <BrowserRouter>

    <Nav/>
    <Rout/>
    <Feedback/>
    {
            isAuthenticated ?
          
          <Contact/>
          
          
          :
           <h5></h5>



          }
          
    <Footer/>
    </BrowserRouter>
    </>
  )
}
export default App