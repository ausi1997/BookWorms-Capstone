import React, { useState, useEffect } from "react";
import {Link, NavLink, Route, Switch } from "react-router-dom";
import Contact from "../Contact";
import Donate from "../Donate";
import Home from "../Home";
import PostAd from "../PostAd";
import Services from "../Services";
import Store from "../Store";
import { useGoogleLogout } from "react-google-login";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Login from "../Login/index";
import Signup from "../Signup/index";
import Dialog from "@material-ui/core/Dialog";
import Faq from "../Faq";
import Aboutus from "../Aboutus";
import Movie from "../DisplayAds/Addetails";
import Profile from "../Profile";
import MyAds from "../MyAds/Myads";
import Search from "../search/index";
import Category from "../Category";
import Wishlist from "../Wishlist";

const clientId =
  "412664973032-8j6rmm9heorpkudr5db1eoq53l4bdpk9.apps.googleusercontent.com";

const NavBar = () => {
  const scroll = () => {
    document.getElementById("mynavbar").scrollIntoView();
  };

  const [showlogin, setshowlogin] = useState(false);
  const [value, setValue] = useState(0);
  const paperStyle = { width: 340, margin: "20px auto" };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function handleClickOpen() {
    setshowlogin(true);
  }

  function handleClose() {
    setshowlogin(false);
  }
  const onLogoutSuccess = (res) => {
    sessionStorage.removeItem("user");
  };
  const onLogoutFailure = () => {
    alert("Failed to sign out");
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onLogoutFailure,
  });

  const logOff = () => {
    if (isLoggedIn) {
      signOut();
      setIsLoggedIn(false);
      sessionStorage.removeItem("user");
      window.location.href = "/home";
    } else {
      setshowlogin(true);
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userInfo = sessionStorage.getItem("user");

    if (userInfo) {
      setIsLoggedIn(true);
    }
  });

  return (
    <>
      <div id="mynavbar" className="nav-item">
        <div className="container">
          <div className="nav-depart">
            <div className="depart-btn">
              <i className="ti-menu"></i>
              <span></span>
              <ul className="depart-hover">
                <li className="sub-sub-menu">
                  <a href="#">Categories</a>
                  <ul className="depart-hover2">
                  <li>
                  <Link to="/category/Academics">Academics</Link>
                </li>
                  <li>
                  <Link to="/category/Engineering">Engineering </Link>
                </li>
                <li>
                  <Link to="/category/Medical">Medical</Link>
                </li>
                <li>
                <Link to="/category/Commerce">Commerce</Link>
              </li>
            <li>
            <Link to="/category/Competetive">Competetive</Link>
          </li>
          <li>
          <Link to="/category/Novel">Novel</Link>
        </li>
        <li>
        <Link to="/category/Others">Others</Link>
      </li>
                  </ul>
                </li>

                {isLoggedIn ? (
                  <>
                    <li>
                      <a href="#">Donate</a>
                    </li>
                    <li>
                    <NavLink  exact activeClassName="active" to="/myads">My Ads</NavLink>
                    </li>
                    <li>
                      <NavLink activeClassName="active" to="/profile">
                        My Profile
                      </NavLink>
                    </li>
                    <li>
                    <NavLink  exact activeClassName="active" to="/wishlist">Wishlist</NavLink>
                    </li>
                  </>
                ) : (
                  ""
                )}
                <li>
                  <NavLink exact activeClassName="active" to="/aboutus">
                    About us
                  </NavLink>
                </li>
                <li>
                  <NavLink exact activeClassName="active" to="/faq">
                    FAQs
                  </NavLink>
                </li>
                

                <li  exact activeClassName="active">
                  <a onClick={logOff}
                  
                  style={{ cursor: "pointer" }}
                >
                  {isLoggedIn ? "Logout" : "Login"}
                  </a></li>
              </ul>
            </div>
          </div>
          <nav className="nav-menu mobile-menu">
            <ul>
              <li>
                <NavLink onClick={scroll} exact ClassName="active" to="/home">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink onClick={scroll} exact ClassName="active" to="/store">
                  Store
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={scroll}
                  activeClassName="active"
                  to="/contact"
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={scroll}
                  exact
                  activeClassName="active"
                  to="/services"
                >
                  Services
                </NavLink>
              </li>
              {isLoggedIn ? (
                <li>
                  <NavLink exact activeClassName="active" to="/postad">
                    Post Ad
                  </NavLink>
                </li>
              ) : (
                ""
              )}
            </ul>
            <ul style={{ paddingLeft: "203px" }}>
              <li activeClassName="active">
                <a
                  onClick={logOff}
                  className="postAd"
                  style={{ cursor: "pointer" }}
                >
                  {isLoggedIn ? "Logout" : "Login"}
                </a>
              </li>
            </ul>
          </nav>
          <div id="mobile-menu-wrap"></div>
        </div>
      </div>
      <Dialog open={showlogin} onClose={handleClose}>
        {/* <Paper elevation={20} style={paperStyle}> */}
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Sign In" />

          <Tab label="Sign Up" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Login />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Signup />
        </TabPanel>

        {/* </Paper> */}
      </Dialog>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route path="/store" component={Store} />
        <Route path="/contact" component={Contact} />
        <Route path="/services" component={Services} />
        <Route path="/donate" component={Donate} />
        <Route path="/postad" component={PostAd} />
        <Route path="/faq" component={Faq} />
        <Route path="/aboutus" component={Aboutus} />
        <Route path="/profile" component={Profile} />
        <Route path="/addetails" component={Movie} />
        <Route path="/myads" component={MyAds} />
        <Route path="/search/:Title" component={Search} />
        <Route path="/category/:Category" component={Category} />
        <Route path="/wishlist" component={Wishlist} />
      </Switch>
    </>
  );
};

export default NavBar;
