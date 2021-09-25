import React from 'react'
import {Link } from 'react-router-dom'

function Header() {
    return (
        <div>
         <div className="flash-sale"> hurry up 70% discount on all  clothing products </div>
         <div className="branding"> <h2>All in One clothes </h2> </div>
                    <div className="navigation">
                           <Link  className="link" to="/admin"> admin product upload </Link  >
                           <Link  className="link" to="/admin/upload" > admin banner upload </Link>
                           <Link  className="link" to="/" > home </Link>
                    </div>
        </div>
    )
}

export default Header
