import React, { useState } from "react";
import axios from "axios";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useGoogleLogin } from "react-google-login";

const Login = ({ handleChange, Username, Password }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const paperStyle = {
    padding: 20,
    width: 300,
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  const initialValues = {
    Username: "",
    Password: "",
    remember: false,
  };
  const validationSchema = Yup.object().shape({
    Username: Yup.string()
      .email("please enter valid email")
      .required("Required"),
    Password: Yup.string().required("Required"),
  });
  const onSubmit = (values, props) => {
    console.log(values);
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };

  const clientId =
    "412664973032-8j6rmm9heorpkudr5db1eoq53l4bdpk9.apps.googleusercontent.com";
  const onSuccess = (res) => {
    const user = {
      name: res.profileObj.name,
      email: res.profileObj.email,
      isOAuth: true,
    };
    sessionStorage.removeItem("user");
    sessionStorage.setItem("user", JSON.stringify(user));

    window.location.reload();
  };

  const onFailure = () => {
    alert("Failed to sign in");
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
  });

  const logIn = () => {
    signIn();
  };

  const handleLogin = () => {
    axios
      .post("/user/login", {
        username: username,
        password: password,
      })
      .then((data) => {
        const user = {
          name: data.data.username,
          email: data.data.email,
          contactNumber: data.data.contactNumber,
          isOAuth: false,
        };
        sessionStorage.removeItem("user");
        sessionStorage.setItem("user", JSON.stringify(user));

        axios.post("/profile/create", { email: data.data.email });
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Grid>
      {" "}
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                label="Username"
                name="username"
                placeholder="Enter username"
                fullWidth
                required
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                helperText={<ErrorMessage name="username" />}
              />
              <Field
                as={TextField}
                label="Password"
                name="password"
                placeholder="Enter password"
                type="password"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                helperText={<ErrorMessage name="password" />}
              />
              <Field
                as={FormControlLabel}
                name="remember"
                control={<Checkbox color="primary" />}
                label="Remember me"
              />
              <Button
                onClick={handleLogin}
                type="submit"
                color="primary"
                variant="contained"
                disabled={props.isSubmitting}
                style={btnstyle}
                fullWidth
              >
                {props.isSubmitting ? "Loading" : "Sign in"}
              </Button>
            </Form>
          )}
        </Formik>
        <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography>
          {" "}
          Do you have an account ?
          <Link href="#" onClick={() => handleChange("event", 1)}>
            Sign Up
          </Link>
        </Typography>
        <Grid align="center">Or</Grid>
        <Button
          onClick={logIn}
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
        >
          <i class="fa fa-google" style={{ fontSize: "20px" }}></i> &nbsp;Sign
          in with google
        </Button>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
        >
          <FacebookIcon /> &nbsp;Sign in with Facebook
        </Button>
      </Paper>
    </Grid>
  );
};

export default Login;
