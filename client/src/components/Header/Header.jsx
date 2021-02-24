import React, { useState, useEffect } from "react";
import { NavLink,Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Login from "../Login/index";
import Signup from "../Signup/index";
import Dialog from "@material-ui/core/Dialog";
import useGeoLocation from "../../hooks/useGeoLocation";
import axios from "axios";

const Header = (props) => {
  const [showlogin, setshowlogin] = useState(false);
  const [value, setValue] = useState(0);
  const [username, setUserName] = useState("Guest");
  const [email, setEmail] = useState("admin@bookworms.com");
  const [location, setLocation] = useState("Location Not Available");
  const [search,setSearch] = useState('');

  useEffect(() => {
    const userInfo = sessionStorage.getItem("user");

    if (userInfo) {
      var profile = JSON.parse(userInfo);
      setEmail(profile.email);
      setUserName(profile.name);
    }

    axios
      .get("https://geolocation-db.com/json/")
      .then((res) => {
        var locationData = res.data;
        setLocation(
          `${locationData.city}, ${locationData.state} ${locationData.country_name} ${locationData.postal}`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const paperStyle = { width: 340, margin: "20px auto" };

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

  return (
    <React.Fragment>
      <header className="header-section">
        <div className="header-top" style={{ backgroundColor: "#3F51B5" }}>
          <div className="container">
            <div className="ht-left">
              <div className="mail-service" style={{ color: "white" }}>
                <i className=" fa fa-envelope"></i>
                {email}
              </div>
              <div className="phone-service" style={{ color: "white" }}>
                <i className=" fa fa-map-marker"></i>
                {location}
              </div>
            </div>
            <div className="ht-right">
              <span className="login-panel" style={{ color: "white" }}>
                <i className="fa fa-user"></i>
                {username}
              </span>

              <div className="top-social">
                <a href="#" style={{ color: "white" }}>
                  <i className="ti-facebook"></i>
                </a>
                <a href="#" style={{ color: "white" }}>
                  <i className="ti-twitter-alt"></i>
                </a>
                <a href="#" style={{ color: "white" }}>
                  <i className="ti-linkedin"></i>
                </a>
                <a href="#" style={{ color: "white" }}>
                  <i className="ti-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="inner-header">
            <div className="row">
              <div className="col-lg-2 col-md-2">
                <div className="logo">
                  <NavLink to="/home">
                    <img src="img/Capture.png" alt="" />
                  </NavLink>
                </div>
              </div>
              <div className="col-lg-7 col-md-7" style={{ paddingTop: "2%" }}>
                <div className="advanced-search">
                  {/* <button type="button" className="category-btn">
                      All Categories
                    </button> */}
                  <input
                    type="text"
                    className="category-btn"
                    placeholder="Type Location.."
                  />
                  <div
                    className="input-group"
                    style={{ borderLeft: "1px solid" }}
                  >
                    <input type="text" value={search} placeholder="search for books and more..."   onChange={(e)=>{setSearch(e.target.value)}} />
                    <Link  to= {`/search/${search}`}> <button type="button">
                    <i className="ti-search"></i>
                  </button></Link>
                  </div>
                </div>
              </div>
              <div
                hidden={username == "Guest"}
                className="col-lg-3 text-right col-md-3"
                style={{ paddingTop: "2%" }}
              >
                <ul className="nav-right">
                  <li className="cart-icon">
                    <NavLink to="/wishlist">
                      <i className="icon_heart_alt"></i>
                       
                    </NavLink>
                    </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <NavBar />
      </header>
      <Dialog open={showlogin} onClose={handleClose}>
        <Paper elevation={20} style={paperStyle}>
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
            <Login handleChange={handleChange} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Signup />
          </TabPanel>
        </Paper>
      </Dialog>
    </React.Fragment>
  );
};
export default Header;
