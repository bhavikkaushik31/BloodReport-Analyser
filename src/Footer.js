import React, { Component } from 'react';
export default class Footer extends Component {
  constructor(props) {
    super(props)
    let loggedIn = true
    const role = localStorage.getItem('Role');
    if (role == null) {
      loggedIn = false
    }
    this.state = {
      loggedIn
    }
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <footer className="footer">
          {/* Footer Top */}

          <div className="footer-top">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-2 col-md-6">
                  {/* Footer Widget */}
                  <div className="footer-widget footer-about">
                    <div className="footer-logo">
                      <img src={require('../assets/img/footer-logo.svg')} alt="logo" />
                    </div>
                    <div className="footer-about-content">
                      <p>Connect with us on social media using the links below. </p>
                      <div className="social-icon">
                        <ul>
                          <li>
                            <a href="https://www.facebook.com/MedSupervisionHealth/" target="_blank"><i className="fab fa-facebook-f" /> </a>
                          </li>
                          <li>
                            <a href="https://twitter.com/medsupervision" target="_blank"><i className="fab fa-twitter" /> </a>
                          </li>
                          <li>
                            <a href="https://www.linkedin.com/company/medsupervision/" target="_blank"><i className="fab fa-linkedin-in" /></a>
                          </li>
                          <li>
                            <a href="https://www.instagram.com/medsupervision/" target="_blank"><i className="fab fa-instagram" /></a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* /Footer Widget */}
                </div>
                <div className="col-lg-1 col-md-6"></div>
                <div className="col-lg-3 col-md-6">
                  {/* Footer Widget */}
                  <div className="footer-widget footer-menu">
                    <h2 className="footer-title">For Patients</h2>
                    <ul>
                      <li><a href="./comingSoon">Search for Experts</a></li>
                      <li><a href="./login">Login</a></li>
                      <li><a href="./register">Register</a></li>
                      <li><a href="./comingSoon">Booking</a></li>
                      <li><a href="./login">Patient Dashboard</a></li>
                    </ul>
                  </div>
                  {/* /Footer Widget */}
                </div>
                <div className="col-lg-3 col-md-6">
                  {/* Footer Widget */}
                  <div className="footer-widget footer-menu">
                    <h2 className="footer-title">For Experts</h2>
                    <ul>
                      <li><a href="./comingSoon">Appointments</a></li>
                      <li><a href="./comingSoon">Chat</a></li>
                      <li><a href="./loginExpert">Login</a></li>
                      <li><a href="./registerExpert">Register</a></li>
                      <li><a href="./loginExpert">Expert Dashboard</a></li>
                    </ul>
                  </div>
                  {/* /Footer Widget */}
                </div>
                <div className="col-lg-3 col-md-6">
                  {/* Footer Widget */}
                  <div className="footer-widget footer-contact">
                    <h2 className="footer-title">Contact Us</h2>
                    <div className="footer-contact-info">
                    <div className="footer-address">
                        <span><i className="fas fa-registered" /></span>
                        <p> Medsupervision Pvt. Ltd.</p>
                      </div>
                      <div className="footer-address">
                        <span><i className="fas fa-map-marker-alt" /></span>
                        <p> D-1197 G/F Sainik Colony,<br /> Sector 49, Faridabad,<br /> HR 121001, Haryana, India </p>
                      </div>
                      <div className="footer-address">
                        <span> <i className="fas fa-envelope" /></span>
                        <p> medsupervision@gmail.com
                              <br />
                             support@medsupervision.com
                            </p>
                      </div>

                      <div className="footer-address">
                        <span> <i className="fas fa-phone-alt" /></span>
                        <p> +91 8368143240
                              <br />
                             +0129 4034703
                            </p>
                      </div>
             
                    </div>
                  </div>
                  {/* /Footer Widget */}
                </div>
              </div>
            </div>
          </div>
          {/* /Footer Top */}
          {/* Footer Bottom */}
          <div className="footer-bottom" style={{ borderTop: "1px solid white" }}>
            <div className="container-fluid">
              {/* Copyright */}
              <div className="copyright">
                <div className="row">
                  <div className="col-md-6 col-lg-6">
                    <div className="copyright-text">
                      <p className="mb-0">© 2020 Medsupervision. All rights reserved.</p>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6">
                    {/* Copyright Menu */}
                    <div className="copyright-menu">
                      <ul className="policy-menu">
                        <li><a href="./terms-and-conditions">Terms and Conditions</a></li>
                        <li><a href="./privacy-policy">Policy</a></li>
                      </ul>
                    </div>
                    {/* /Copyright Menu */}
                  </div>
                </div>
              </div>
              {/* /Copyright */}
            </div>
          </div>
          {/* /Footer Bottom */}
        </footer>

      )
    }
    else return (
      <footer className="footer">
        <div className="footer-bottom">
          <div className="container-fluid">
            {/* Copyright */}
            <div className="copyright">
              <div className="row">
                <div className="col-md-6 col-lg-6">
                  <div className="copyright-text">
                    <p className="mb-0">© 2020 Medsupervision. All rights reserved.</p>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  {/* Copyright Menu */}
                  <div className="copyright-menu">
                    <ul className="policy-menu">
                      <li><a href="./terms-and-conditions">Terms and Conditions</a></li>
                      <li><a href="./privacy-policy">Policy</a></li>
                    </ul>
                  </div>
                  {/* /Copyright Menu */}
                </div>
              </div>
            </div>
            {/* /Copyright */}
          </div>
        </div>
        {/* /Footer Bottom */}
      </footer>
    )
  }

}
