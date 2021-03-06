import React,{Component} from 'react';
import {Link} from 'react-router-dom';
//import { Container, Col, Row } from 'react-bootstrap';

export default class Navbar extends Component{
    render(){
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to="/" className="navbar-brand">K&co.</Link>
            <div className="collpase navbar-collapse">  
                <ul className="navbar-nav  navbar-right">
                    <li className="navbar-item justify-content-end">
                        <Link to="/user" className="nav-link">User</Link>
                    </li>
                    <li className="navbar-item justify-content-end">
                        <Link to="/admin" className="nav-link">Admin</Link>
                    </li>
                    <li className="navbar-item justify-content-end">
                        <Link to="/signup" className="nav-link">Signup</Link>
                    </li>
                </ul>
            </div>
        </nav>    
            
           
            
        )
    }
}