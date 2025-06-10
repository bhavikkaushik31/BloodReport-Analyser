import React, { Component } from "react";
/* import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PatientHeader from "./PatientHeader";
import ExpertHeader from "./ExpertHeader"; */

class Header extends Component {
  constructor(props) {
    super(props);
    const email = localStorage.getItem("Email");
    const roletype = localStorage.getItem("RoleType");
    let loggedIn = true;
    let adviser = false;
    if (email == null && roletype == null) {
      loggedIn = false;
    } else if (roletype.match("Adviser")) {
      adviser = true;
    }
    this.state = {
      adviser,
      loggedIn,
    };
  }
  componentDidMount() {
    if (!this.state.loggedIn) {
      if (this.props.fieldId != undefined) {
        document.getElementById(this.props.fieldId).classList.add("active");
      }
      if (this.props.childId != undefined) {
        document.getElementById(this.props.childId).classList.add("active");
      }
      if (this.props.subchildId != undefined) {
        document.getElementById(this.props.subchildId).classList.add("active");
      }
    }
  }

  render() {
    if (this.state.loggedIn && this.state.adviser) {
      return (
        <ExpertHeader
          childId={this.props.childId}
          subchildId={this.props.subchildId}
          fieldId={this.props.fieldId}
        />
      );
    } else if (this.state.loggedIn) {
      return (
        <PatientHeader
          childId={this.props.childId}
          subchildId={this.props.subchildId}
          fieldId={this.props.fieldId}
        />
      );
    }
    return (
      <div>
        <header className="header">
          <nav className="navbar navbar-expand-lg header-nav">
            <div className="navbar-header">
              <a id="mobile_btn">
                <span className="bar-icon">
                  <span />
                  <span />
                  <span />
                </span>
              </a>
              <a href="./" className="navbar-brand logo">
                <img
                  src={require("../assets/img/logo.svg")}
                  className="img-fluid"
                  alt="Logo"
                />
              </a>
            </div>
            <div id="menucontainer" className="main-menu-wrapper">
              <div className="menu-header">
                <a href="./" className="menu-logo">
                  <img
                    src={require("../assets/img/logo.svg")}
                    className="img-fluid"
                    alt="Logo"
                  />
                </a>
                <a id="menu_close" className="menu-close" href="#">
                  <i className="fas fa-times" />
                </a>
              </div>

              <ul className="main-nav">
                <li id="home">
                  <a href="./">Home</a>
                </li>
                <li id="about">
                  <a href="./about-us">About Us</a>
                </li>

                <li id="experts" className="has-submenu">
                  <a href="#">
                    Expert <i className="fas fa-chevron-down" />
                  </a>
                  <ul className="submenu">
                    <li id="expertLogin"><Link to="./loginExpert">Login</Link></li>
                    <li id="expertRegister"><Link to="./registerExpert">Register</Link></li>
                  </ul>
                </li>
                <li id="patients" className="has-submenu">
                  <a href="#">
                    Patient <i className="fas fa-chevron-down" />
                  </a>
                  <ul className="submenu">
                    <li id="login"><Link to="./login">Login</Link></li>
                    <li id="register"><Link to="./register">Register</Link></li>
                    {/* <li id="insurance"><Link to="./insurance">Insurance Enquiries</Link></li> */}
                    <li id="search-doctor"><Link to="./search-doctor">Search Doctor</Link></li>
                  </ul>
                </li>

                <li id="blog" className="has-submenu">
                  <a href="#0">Blogs <i className="fas fa-chevron-down" /></a>
                  <ul className="submenu">
                    {/* <li id="blog_tab" className="has-submenu"><Link to="./blogs">All Blogs</Link>
                      <ul className="submenu">
                        <li id="all-blog"><Link to="./trending" className="to-wrap">Trending</Link></li>
                        <li id="create-new"><Link to="./blogCreate" className="to-wrap">Create New</Link></li>
                      </ul>
                    </li> */}
                    <li id="healthcare" className="has-submenu"><Link to="./health-care">Health Care</Link>
                      <ul className="submenu">
                      <li id="timeisbrain" className="to-wrap"><Link to="./preventing-stroke">Time is Brain: <br /> Preventing Stroke</Link></li>
                        <li id="edema" className="to-wrap"><Link to="./tips-for-managing-foot-and-leg-edema">Tips for Managing<br /> Foot &amp; Leg Edema </Link></li>
                        <li id="bp" className="to-wrap"><Link to="./tips-for-controlling-high-blood-pressure">Tips for Controlling<br /> High Blood Pressure</Link></li>
                        <li id="addison" className="to-wrap"><Link to="./addison-disease">A Guide to Addison's<br /> Disease</Link></li>
                        <li id="bipolar" className="to-wrap"><Link to="./bipolar-disorder">Self Care for Bipolar <br /> Disorder</Link></li>
                        <li id="lupus" className="to-wrap"><Link to="./systemic-lupus-erythematosus">Systemic Lupus<br /> Erythematosus - A Guide</Link></li>
                        <li id="glaucoma" className="to-wrap"><Link to="./glaucoma-tips">Glaucoma Tips</Link></li>

                      </ul>
                    </li>
                    <li id="pregnancytips" className="has-submenu"><Link to="./pregnancy-tips">Pregnancy Tips</Link>
                      <ul className="submenu">
                        <li id="obsemergency" className="to-wrap"><Link to="./obstetric-emergencies-during-pregnancy"> Obstetric Emergencies<br /> During Pregnancy</Link></li>
                        <li id="alcopreg" className="to-wrap"><Link to="./is-alcohol-safe-to-consume-during-pregnancy" >Is Alcohol Safe to Consume<br /> During Pregnancy?</Link></li>
                        <li id="hospitalbag" className="to-wrap"><Link to="./what-to-pack-in-your-hospital-bag-before-delivery"> What to Pack in Your<br />Hospital Bag Before<br /> Delivery?</Link></li>
                        <li id="pregnant" className="to-wrap"><Link to="./how-to-know-if-you-are-pregnant">How to Know if You Are <br />Pregnant?</Link></li>
                        <li id="prepost" className="to-wrap"><Link to="./things-to-avoid-pre-and-post-conception">Things to Avoid During<br />Pre and Post Conception</Link></li>
                        <li id="preg" className="to-wrap"><Link to="./pre-pregnancy-health-tips" >Pre Pregnancy Health Tips</Link></li>

                      </ul>

                    </li>
                    <li id="respiratorycare" className="has-submenu"><Link to="./lung-and-respiratory-care">Lung &amp; Respiratory<br />Care</Link>
                      <ul className="submenu">
                        <li id="respiratory" className="to-wrap"><Link to="./tips-to-prevent-respiratory-illness">Tips to Prevent<br /> Respiratory Illness</Link></li>
                        <li id="bronchiectasis" className="to-wrap"><Link to="./bronchiectasis">A Guide to<br /> Bronchiectasis</Link></li>
                        <li id="pneumonia" className="to-wrap"><Link to="./pneumonia">Prevention of Pneumonia<br /> and Respiratory Tract <br /> Infection</Link></li>
                        <li id="asthma" className="to-wrap"><Link to="./how-to-deal-with-an-asthma-attack">How to Deal with an<br /> Asthma Attack?</Link></li>
                        <li id="pollen" className="to-wrap"><Link to="./how-to-limit-exposure-to-pollen">How to Limit Exposure<br /> to Pollen?</Link></li>
                      </ul>
                    </li>
                    <li id="cardiovascular" className="has-submenu"><Link to="./cardiovascular-care">Cardiovascular Care</Link>
                      <ul className="submenu">
                      <li id="angina" className="to-wrap"><Link to="./tips-for-angina">Tips for Angina</Link></li>
                      <li id="atrial" className="to-wrap"><Link to="./tips-for-atrial-fibrillation">Tips for Atrial<br/> Fibrillation (AF)</Link></li>  
                        <li id="healthyheart" className="to-wrap"><Link to="./top-12-tips-for-a-healthy-heart">Top 12 Tips for a<br /> Healthy Heart</Link></li>
                      </ul>
                    </li>
                    <li id="dentalcare" className="has-submenu"><Link to="./dental-care">Dental Care</Link>
                      <ul className="submenu">
                        <li id="fearofdentist" className="to-wrap"><Link to="./how-to-overcome-fear-of-dentist">How to Overcome Fear<br /> of Dentist (in Children)</Link></li>
                        <li id="management" className="to-wrap"><Link to="./emergency-management-of-knocked-out-teeth-in-children">Emergency Management<br /> of Knocked-out Teeth<br /> in Children</Link></li>
                      </ul>
                    </li>
                    <li id="nutrition" className="has-submenu">
                      <Link to="./nutrition">Nutrition</Link>
                      <ul className="submenu">
                      <li id="heart">
                          <Link
                            to="./tips-for-a-heart-healthy-diet"
                            className="to-wrap"
                          >
                            Tips for a Heart-Healthy <br />Diet
                          </Link>
                        </li>
                        <li id="pregdiet">
                          <Link
                            to="./pre-pregnancy-diet-tips"
                            className="to-wrap"
                          >
                            Pre Pregnancy Diet Tips
                          </Link>
                        </li>
                    
                      </ul>
                    </li>
                    <li id="digestive" className="has-submenu"><Link to="./digestive-care">Digestive Care</Link>
                      <ul className="submenu">
                        <li id="crohn" className="to-wrap"><Link to="./dietary-tips-for-crohn-disease">Dietary Tips for<br /> Crohn's Disease </Link></li>
                      </ul>
                    </li>
                    <li id="psychological" className="has-submenu"><Link to="./psychological-care">Psychological Care</Link>
                      <ul className="submenu">
                        <li id="stress" className="to-wrap"><Link to="./how-to-deal-with-stress-and-anxiety">How to Deal with <br />Stress and Anxiety?</Link></li>
                      </ul>
                    </li>

                  </ul>
                </li>
              </ul>
            </div>
            <div>
              <ul className="nav header-navbar-rht">
                <li className="nav-item">
                  <Link className="nav-link header-login" to="./login">
                    Login / Signup{" "}
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  fieldId: PropTypes.string,
  childId: PropTypes.string,
  subchildId: PropTypes.string,
};

export default Header;
