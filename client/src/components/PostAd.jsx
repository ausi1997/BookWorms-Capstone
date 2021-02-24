import React, { useState } from "react";
import axios from "axios";
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
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Dialog from "@material-ui/core/Dialog";
import AddIcon from "@material-ui/icons/Add";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuBookSharpIcon from "@material-ui/icons/MenuBookSharp";

const PostAd = () => {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Author, setAuthor] = useState("");
  const [Category, setCategory] = useState("");
  const [Price, setPrice] = useState("");
  const [Condition, setCondition] = useState("");
  const [file, setFile] = useState(null);
  const [Location, setLocation] = useState("");

  const onFileChange = (event) => {
    // Update the state
    setFile(event.target.files[0]);
  };

  const postBookAd = () => {
    var data = new FormData();
    data.append("BookImages", file, file.name);
    data.append("Title", Title);
    data.append("Description", Description);
    data.append("Author", Author);
    data.append("Category", Category);
    data.append("Price", Price);
    data.append("Condition", Condition);
    data.append("Location", Location);
    axios
      .post("/bookads/postAds", data)
      .then((res) => {
        alert("Ad posted successfully");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const paperStyle = {
    padding: 20,
    width: 400,
    height: "130vh",
    margin: "0 auto",
  };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#3F51B5" };
  const btnstyle = { margin: "8px 570px" };

  return (
<>
<div class="breacrumb-section">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="breadcrumb-text">
                    <a href="#"><i class="fa fa-home"></i> Home</a>
                    <span>Post Ad</span>
                </div>
            </div>
        </div>
    </div>
</div>
    {/* <Dialog open={true}> */}
    <Grid>
      {/* <Paper style={paperStyle}> */}
      <Grid align="center">
        <br></br>
        <Avatar style={avatarStyle}>
          <MenuBookSharpIcon />
        </Avatar>
        <h2 style={headerStyle}>Post Your Ad</h2>
        <Typography variant="caption" gutterBottom>
          <h6>Please fill this form to post your ad !</h6>
        </Typography>
        <Typography variant="caption" gutterBottom>
          All fields are mandatory
        </Typography>
      </Grid>
      <br></br>
      <br></br>

      <Formik>
        {(props) => (
          <Form>
            <div className="container" style={{ marginRight: "32px" }}>
              <div className="row">
                <div className="col-lg-5">
                  <TextField
                    style={{ width: "35ch" }}
                    label="Ad Title"
                    variant="outlined"
                    onChange={(e) => setTitle(e.target.value)}
                    helperText={<ErrorMessage name="Title" />}
                  />
                  <br></br>
                  <br></br>
                  {/* <h6 className="Ad-color">Ad Description:</h6> */}
                  <TextField
                    style={{ width: "35ch" }}
                    id="outlined-multiline-static"
                    label="Ad description"
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                  <br></br>
                  <br></br>

                  <TextField
                    style={{ width: "35ch" }}
                    label="Author Name"
                    variant="outlined"
                    onChange={(e) => setAuthor(e.target.value)}
                    helperText={<ErrorMessage name="Title" />}
                  />
                  <br></br>
                  <br></br>
                  <FormControl
                    style={{ width: "35ch" }}
                    variant="outlined"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Category
                    </InputLabel>
                    <Select native label="Category">
                      <option aria-label="None" value="" />
                      <option value="Academics">Academics</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Medical">Medical</option>
                      <option value="Commerce">Commerce</option>
                      <option value="Arts">Arts</option>
                      <option value="Competetive">Competetive</option>
                      <option value="Novel">Novel</option>
                      <option value="Others">Others</option>
                    </Select>
                  </FormControl>
                </div>

                <div className="col-lg-6 offset-lg-1">
                  <TextField
                    style={{ width: "35ch" }}
                    label="Price"
                    variant="outlined"
                    onChange={(e) => setPrice(e.target.value)}
                    helperText={<ErrorMessage name="Title" />}
                  />
                  <br></br>
                  <br></br>

                  <FormControl
                    style={{ width: "35ch" }}
                    variant="outlined"
                    onChange={(e) => setCondition(e.target.value)}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Condition of books
                    </InputLabel>
                    <Select native label="Condition">
                      <option aria-label="None" value="" />
                      <option value="OLD">OLD</option>
                      <option value="NEW">NEW</option>
                    </Select>
                  </FormControl>
                  <br></br>
                  <br></br>

                  <TextField
                    style={{ width: "35ch" }}
                    as={TextField}
                    label="Location"
                    variant="outlined"
                    onChange={(e) => setLocation(e.target.value)}
                    helperText={<ErrorMessage name="Title" />}
                  />
                  <br></br>
                  <br></br>
                  <h6 className="Ad-color">Upload Pictures:</h6>
                  <br></br>

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
                    <span>{file ? file.name : ""}</span>
                  </label>

                  <br></br>
                  <br></br>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant="contained"
              style={btnstyle}
              disabled={props.isSubmitting}
              color="primary"
              onClick={postBookAd}
            >
              {props.isSubmitting ? "Loading" : "Post Now"}
            </Button>
            <br></br>
            <br></br>
          </Form>
        )}
      </Formik>
      {/* </Paper> */}
    </Grid>
    </>
    // </Dialog>
  );
};
export default PostAd;
