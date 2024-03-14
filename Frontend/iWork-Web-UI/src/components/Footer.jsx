import React from "react";
// import "../css/home.css";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-dark text-light p-4" style={{ width: '100%', height: 'min-content' }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>Follow Us</h5>
                        <p>Stay connected with us on social media for the latest updates and promotions.</p>
                        {/* <div className="social-icons">
                            <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                            <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                            <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                        </div> */}
                    </div>
                    <div className="col-md-4">
                        <h5>Contact Us</h5>
                        <p>Email: contactiwork@freelancer.com</p>
                        <p>Phone: +91 1234567920</p>
                    </div>
                    <div className="col-md-4">
                        <h5>About Us</h5>
                        <a href="/about">About Us</a>
                    </div>
                </div>
                <hr className="mt-3 mb-2" />
                <div className="text-center">
                    <p>&copy; 2024 iWork. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;