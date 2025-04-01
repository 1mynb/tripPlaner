import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import tripPlannerLogo from '../Assets/images/tripPlannerOpt2.png'

function Header(){
    const [smallMob, setSmallMob] = useState(false)

    //method to set detect screen size
    const handleSmallMob = () =>{
        setSmallMob(!smallMob)
    }

    return(
            <div className="header-common">
                    <div className="header-common-left">
                        <NavLink to="/"  className='link'><img src={tripPlannerLogo} alt='myFootball' className='home-logo'/></NavLink>
                    </div>
                    <div className="header-common-right">
                        <div className="header-common-all">
                            <div className="header-common-settings">
                                <ul className={`header-settings-sub-menu ${smallMob ? 'active': ''}`}>
                                        <li> <NavLink to="#"  className={({ isActive }) => (isActive? 'link active': 'link')}>About</NavLink></li>
                                        <li> <NavLink to="#"  className={({ isActive }) => (isActive? 'link active': 'link')}>contact</NavLink></li>
                                        <li> <NavLink to="#"  className={({ isActive }) => (isActive? 'link active': 'link')}>Login</NavLink></li> 
                                        
                                </ul>

                            
                            </div>
                            <div className="header-common-social">
                                <ul className='header-social-sub-menu'>
                                    <li><NavLink to="https://facebook.com"  className={({ isActive }) => (isActive? 'link active': 'link')} aria-label="Follow us on facebook"><i className='bx bxl-facebook'></i></NavLink></li>
                                    <li><NavLink to="https://twitter.com"  className={({ isActive }) => (isActive? 'link active': 'link')} aria-label="Follow us on twitter"><i className='bx bxl-twitter'></i></NavLink></li>
                                    <li><NavLink to="https://instagram.com"  className={({ isActive }) => (isActive? 'link active': 'link')} aria-label="Follow us on instagram"><i className='bx bxl-instagram'></i></NavLink></li>
                                </ul>
                                
                            </div>

                        </div>
                        <div className="hamburger" onClick={handleSmallMob}>
                            <div className="line"></div>
                            <div className="line"></div>
                            <div className="line"></div>
                        </div>
                    </div>
                       
            </div>

     
    )
}
export default Header