import React from "react";
import contact from '../assests/contact.jpg'

class Contact extends React.Component {
    render() {
        return (
            <div className="contact-container">
                <div className="row">
                    <div className="col-md-6 d-flex align-items-stretch">
                        <div className="info-wrap w-100 p-lg-5 p-4" style={{ background: "rgb(255 255 255)", color: "black", textAlign: "center" }}>
                            <h2 style={{ fontSize: '40px' }}><u>Contact us</u></h2>
                            <br />
                            <p className="mb-4" style={{ fontSize: '26px' }}>We're open for any suggestion or just to have a chat</p>
                            <div style={{ fontSize: '26px' }}>
                                <br />
                                <div className="dbox w-100 d-flex align-items-start">
                                    <div className="icon d-flex align-items-center justify-content-center">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div className="text pl-3">
                                        <pre>Address:- A-401, Mankichand Galleria, Model Colony, Pune-411016</pre>
                                    </div>
                                </div>
                                <div className="dbox w-100 d-flex align-items-center">
                                    <div className="icon d-flex align-items-center justify-content-center">
                                    </div>
                                    <div className="text pl-3">
                                        <pre>Phone:-   +91 1234567920</pre>
                                    </div>
                                </div>
                                <div className="dbox w-100 d-flex align-items-center">
                                    <div className="icon d-flex align-items-center justify-content-center">
                                    </div>
                                    <div className="text pl-3">
                                        <pre>Email:-   contactiwork@freelancer.com</pre>
                                    </div>
                                </div>
                                <div className="dbox w-100 d-flex align-items-center">
                                    <div className="icon d-flex align-items-center justify-content-center">
                                        <i className="fas fa-globe"></i>
                                    </div>
                                    <div className="text pl-3">
                                        <pre>Website:- iwork.com</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-stretch">
                        <div className="image-wrap w-100 p-lg-5 p-4" style={{ background: "#222", textAlign: "center" }}>
                            <img src={contact} alt="Contact" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;
