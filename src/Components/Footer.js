import React from 'react'
import { FaInstagramSquare,FaFacebookSquare,FaTwitterSquare ,FaYoutube} from 'react-icons/fa';

export default function Footer() {
    return (
        <div>
            <div className="footer-section-wrapper">

                 <div className="footer">

                      <p>  visit  all in on in all social platforms </p>

                      <div className="icons">

                      <div className="icon">
                              
                      <FaFacebookSquare/> 
                              
                      </div>
                  

          <div className="icon">
          
          
          <FaYoutube/>
          
          </div>


          <div className="icon">
          
          <FaTwitterSquare/>
          
          </div>

          <div className="icon">
          
          <FaInstagramSquare/>
          
          </div>
                 
               

                      </div>
                 </div>

            </div>
        </div>
    )
}
