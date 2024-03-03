import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">NetBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {localStorage.getItem('token') && <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>}
                            {localStorage.getItem('token') && <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">About</Link>
                            </li>}

                        </ul>
                    <div className="form-check form-switch pe-3 text-light">
                        <input className="form-check-input" onClick = {props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable {props.mode === 'light' ? 'dark' : 'light'} mode</label>
                    </div>
                        {!localStorage.getItem('token') ? 
                        <div className="d-flex text-align-center">
                            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-1" to="/signup" role="button">New User</Link>
                        </div>
                        : 
                        <div className='d-flex'>
                            <button onClick={handleLogout} className={`btn btn-${props.mode === 'light'? 'primary':'secondary'} mx-1`}>Logout</button>
                        </div>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar