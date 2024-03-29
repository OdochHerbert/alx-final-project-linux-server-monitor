import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'
import { GiContract } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { CiLogin } from 'react-icons/ci'
import { CiLogout } from 'react-icons/ci'
import {DiLinux} from 'react-icons/di'
import{SiSpeedtest} from 'react-icons/si'
import { useAuth0 } from "@auth0/auth0-react";
import './nav.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';
import MyDropdown from './dropdown'





const Nav = () => {
  const { loginWithRedirect, logout, user, isAuthenticated} = useAuth0();
  return(
    <>
    <div className='navbar navbar-light navbar-expand bg-light navigation-clean free'>

    <div className="container"><a className="navbar-brand" href="#"> 
    <div className='icon'><DiLinux/></div>
    <strong>HYSU</strong></a><button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1"></button>
            <div className="collapse navbar-collapse" id="navcol-1">
            <div className='auth ms-auto'>
          {
            isAuthenticated ?
          
          <a className="btn btn-primary ms-auto" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} role="button" href="#">Sign Out</a>
          
          :
           <a className="btn btn-primary ms-auto" onClick={()=> loginWithRedirect()} role="button" href="#">Sign In</a>



          }
          
          
        </div>
        
              </div>
        </div>
      

    </div>
    {!isAuthenticated && (
      <div className=''>
      <div className=''>
      <header className="text-center text-white masthead navimage" >
        <div className="overlay"></div>
        <div className="container">
            <div className="row">
                <div className="col-xl-9 mx-auto position-relative">
                    <h1 className="mb-5">HYSU</h1>
                </div>
                <div className="col-md-10 col-lg-8 col-xl-7 mx-auto position-relative">
                    <form>
                        <div className="row">
                            <div className="col-12 col-md-9 mb-2 mb-md-0"><input class="form-control form-control-lg" type="email" placeholder="Enter your email..."/></div>
                            <div className="col-12 col-md-3"><button class="btn btn-primary btn-lg" type="submit">Sign up!</button></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </header>
        
         
         

         </div>
      </div>
    )}
    
    
    {
            isAuthenticated && 
            (
              <div className='account'>
              <div className='user_icon'>
             
              </div>
              <div className='header'>
        

      <CDropdown className='dropdown' >
      <CDropdownToggle color="primary">
        Home
      </CDropdownToggle>
      <CDropdownMenu>
      <CDropdownItem><Link to='/' className='link'>Home</Link></CDropdownItem>
      <CDropdownItem><Link to='/about'className='link'>About</Link></CDropdownItem>
      </CDropdownMenu>
    </CDropdown>

      <CDropdown className='dropdown' >
      <CDropdownToggle color="primary">
        Network
      </CDropdownToggle>
      <CDropdownMenu>
      <CDropdownItem><Link to='/live_usage' className='link'>Live Usage</Link></CDropdownItem>
      <CDropdownItem><Link to='/linked_devices'className='link'>Neighbors</Link></CDropdownItem>
        <CDropdownItem><Link to='/net_interfaces'className='link'>NetRout</Link></CDropdownItem>
        <CDropdownItem> <Link to='/speed_test'className='link'>Speed Test </Link></CDropdownItem>
        <CDropdownItem><Link to='/net_statistics'className='link'>NetStat</Link></CDropdownItem>
        <CDropdownItem> <Link to='/wifi_info'className='link'>Wifi</Link> </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>

    <CDropdown className='dropdown'>
      <CDropdownToggle color="primary">
        File Management
      </CDropdownToggle>
      <CDropdownMenu>
        <CDropdownItem><Link to='/file'className='link'>File Server</Link></CDropdownItem>
        <CDropdownItem> <Link to='/crud'className='link'>CRUD </Link></CDropdownItem>
        <CDropdownItem><Link to='/video_player'className='link'>Video player</Link></CDropdownItem>
        <CDropdownItem> <Link to='/music_player'className='link'>Music Player</Link> </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
    </div>
    
            </div>
            )
          }
         
          
        {
          !isAuthenticated &&(
            <div className='header'>
              <div className='container'>
              <div className="col-lg-6 text-center text-lg-start my-auto h-100 nav">
              <ul className='list-inline mb-2'>
          <li className="list-inline-item">
            <Link to='/'className='link'>Home</Link>
          </li>
          <li className='list-inline-item'>
            <Link to='/about'className='link'>About</Link>
          </li>
        </ul>
              </div>
              
            </div>
            </div>
            
          )
            

          
        }
     
      
        
              
    </>
  )
}
export default Nav