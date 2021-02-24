import React, { useEffect, useState } from "react";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  TextareaAutosize,
  Fab,
} from "@material-ui/core";

const Profile = () => {
  const [user, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [userEducation, setUserEducation] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    const userInfo = sessionStorage.getItem("user");
    if (userInfo) {
      var profile = JSON.parse(userInfo);
      setUserName(profile.name);
      setEmail(profile.email);
      if (profile.isOAuth) {
        axios.get("/profile/viewg/" + email).then((res) => {
          if(res.data){
            setContactNumber(res.data.contactNumber);
            setUserEducation(res.data.userEducation);
            setProfilePhoto(res.data.profilePhoto);
            setState(res.data.location.State);
            setCity(res.data.location.City);
            setArea(res.data.location.Area);
          }
          
        });
      } else {
        axios.get("/profile/view").then((res) => {
          var username = profile.name;
          var email = profile.email;
          setUserName(username);
          setEmail(email);

          if (res.data != null) {
            setContactNumber(res.data.contactNumber);
            setUserEducation(res.data.userEducation);
            setProfilePhoto(res.data.profilePhoto);
            setState(res.data.location.State);
            setCity(res.data.location.City);
            setArea(res.data.location.Area);
          }
        });
      }
    }
  }, [email, user]);

  const txtStyle = {
    width: "100%",
    fontSize: "16px",
    color: "#636363",
    height: "50px",
    border: "1px solid black",
    borderRadius: "5px",
    paddingLeft: "20px",
    marginBottom: "30px",
  };

  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {selectedFile.name}</p>

          <p>File Type: {selectedFile.type}</p>

          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  const updateProfile = (e) => {
    const data = new FormData();
    data.append("profilePhoto", selectedFile);
    data.append("name", user);
    data.append("email", email);
    data.append("contactNumber", contactNumber);
    data.append("State", state);
    data.append("City", city);
    data.append("Area", area);
    data.append("userEducation", userEducation);
    axios
      .post("/profile/edit", data)
      .then((res) => {
        alert("Profile Updated");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let movieInfo = (
    <>
    <div className="breacrumb-section">
    <div className="container">
        <div className="row">
            <div className="col-lg-12">
                <div className="breadcrumb-text">
                    <a href="#"><i class="fa fa-home"></i> Home</a>
                    <span>Profile</span>
                </div>
            </div>
        </div>
    </div>
</div>
    <div className="container">
      <br></br>
      <div className="row">
        <div className="col-md-4" style={{ width: "100", height: "100" }}>
          <img
            style={{ maxWidth: "100%", maxHeight: "100%" }}
            src={
              profilePhoto
                ? profilePhoto
                : "https://st2.depositphotos.com/4185411/8501/i/600/depositphotos_85015512-stock-photo-still-life-with-a-pile.jpg"
            }
            alt="Poster"
          />
        </div>
        <div className="col-md-8">
          <h2 className="mb-4">My Profile</h2>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Name:</strong> {user}
            </li>
            <li className="list-group-item">
              <strong>Email:</strong> {email}
            </li>
            <li className="list-group-item">
              <strong>Contact Number</strong> &nbsp;
              <WhatsAppIcon />
              <input
                type="text"
                style={txtStyle}
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </li>
            <li className="list-group-item">
              <strong>Eduction:</strong>
              <input
                type="text"
                style={txtStyle}
                value={userEducation}
                onChange={(e) => setUserEducation(e.target.value)}
              />
            </li>
            <li className="list-group-item">
              <strong>State:</strong>{" "}
              <input
                type="text"
                value={state}
                style={txtStyle}
                onChange={(e) => setState(e.target.value)}
              />
            </li>
            <li className="list-group-item">
              <strong>City:</strong>{" "}
              <input
                type="text"
                value={city}
                style={txtStyle}
                onChange={(e) => setCity(e.target.value)}
              />
            </li>
            <li className="list-group-item">
              <strong>Area:</strong>{" "}
              <input
                type="text"
                value={area}
                style={txtStyle}
                onChange={(e) => setArea(e.target.value)}
              />
            </li>
            <li className="list-group-item">
              <label htmlFor="upload-photo">
                <input
                  style={{ display: "none" }}
                  id="upload-photo"
                  onChange={onFileChange}
                  name="upload-photo"
                  type="file"
                />

                <Button color="blue" variant="contained" component="span">
                  <Fab
                    color="primary"
                    size="small"
                    component="span"
                    aria-label="add"
                  >
                    <AddIcon />
                  </Fab>
                  &nbsp; Upload pictures
                </Button>
                <span>{selectedFile ? selectedFile.name : ""}</span>
              </label>
            </li>
          </ul>
          <br />
          <br />
          <div>
            <button type="submit" onClick={updateProfile} className="site-btn">
              Update Profile
            </button>
          </div>
          <br />
          <br />
        </div>
      </div>
    </div>
    </>
  );
  return movieInfo;
};

export default Profile;
