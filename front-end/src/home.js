import React from 'react'
import { Link} from 'react-router-dom'
import {BsArrowRight} from 'react-icons/bs'
import './home.css'
import {RiCustomerService2Fill} from 'react-icons/ri'
import {GiWallet} from 'react-icons/gi'
import {BsPersonFillCheck} from 'react-icons/bs'
import {LuNetwork} from 'react-icons/lu'
import {AiFillFolderOpen} from 'react-icons/ai'
import {BsWifi} from 'react-icons/bs'
import {SiSpeedtest} from 'react-icons/si'
const Home = () =>{
    return (
        <>
        <div className='top-banner'>
        <section className="text-center bg-light features-icons">
        <div className="container">
            <div className="row">
                <div className="col-lg-4">
                    <div className="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
                        <div className="d-flex features-icons-icon"><i class="icon-screen-desktop m-auto text-primary" data-bss-hover-animate="pulse"></i></div>
                        <h3>Linux on the Web</h3>
                        <p className="lead mb-0">Just connect to the web and manage your device</p>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
                        <div className="d-flex features-icons-icon"><i class="icon-layers m-auto text-primary" data-bss-hover-animate="pulse"></i></div>
                        <h3>Web on any device</h3>
                        <p className="lead mb-0">You can even use your mobile phone to run a command</p>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
                        <div className="d-flex features-icons-icon"><i class="icon-check m-auto text-primary" data-bss-hover-animate="pulse"></i></div>
                        <h3>No terminal !</h3>
                        <p className="lead mb-0">Dont worry, this is a work in progress</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="showcase">
        <div className="container-fluid p-0">
            <div className="row g-0">
                <div className="col-lg-6 text-white order-lg-2 showcase-img showing"><span></span></div>
                <div className="col-lg-6 my-auto order-lg-1 showcase-text">
                    <h2>Network Monitoring</h2>
                    <p className="lead mb-0">Monitor device network speed, inbound and outbound traffic, live usage and wireless scans</p>
                </div>
            </div>
            <div className="row g-0">
                <div className="col-lg-6 text-white showcase-img showing1" ><span></span></div>
                <div className="col-lg-6 my-auto order-lg-1 showcase-text">
                    <a><h2>File Management</h2></a>
                    <p className="lead mb-0">Ability to create, read and write files remotely. You aint ready for this!</p>
                </div>
            </div>
            <div className="row g-0">
                <div className="col-lg-6 text-white order-lg-2 showcase-img showing2" ><span></span></div>
                <div className="col-lg-6 my-auto order-lg-1 showcase-text">
                    <h2>OS compatibility</h2>
                    <p className="lead mb-0">As per now, working on Linux. Windows, macOS, IOS(Cisco), android....Hope you are ready</p>
                </div>
            </div>
        </div>
    </section>

        </div>
       
        </>
    )
}
export default Home 