import React from "react";
import { Link } from "react-router-dom";
import tripPlannerLogo from '../Assets/images/tripPlanner.png'
function Footer (){
    return (
        <div className="my-container">
            <div className="footer">
                <ul className="row">
                    <li className="col-1-2">
                        <div>
                            <Link to='/'><img src={tripPlannerLogo} alt="my football" className="footer-logo"/></Link>
                            <address className='footer-address'>
                                Trip Planner <br />
                            </address>
                        </div>

                    </li>
                    <li className="col-1-2">
                        <div className="footer-social">
                            <Link to="https://twitter.com" className='link' aria-label="Follow us on twitter"><i className='bx bxl-twitter'></i></Link>
                            <Link to="https://facebook.com" className='link' aria-label="Follow us on facebook"><i className='bx bxl-facebook'></i></Link>
                            <Link to="https://instagram.com" className='link' aria-label="Follow us on instagram"><i className='bx bxl-instagram'></i></Link>
                        </div>
                    </li>   
                </ul>
                <div className='horizontal-divider-withoutmargin'>
                </div>
                <div className="footer-copyright">
                    <p> ©2025 Spooter AI, All rights reserved</p>
                    <ul className="footer-nav">
                        <li ><Link to='' className="footer-nav-link">Terms of Use</Link></li>
                        <li ><Link to='' className="footer-nav-link">Privacy Policy</Link></li>
                        <li ><Link to='' className="footer-nav-link">Cookie Policy</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Footer