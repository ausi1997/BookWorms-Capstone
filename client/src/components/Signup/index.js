import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormHelperText } from "@material-ui/core";
import axios from "axios";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const handleSignup = () => {
    axios
      .post("/user/signup", {
        username: username,
        contactNumber: phoneNumber,
        email: email,
        password: password,
      })
      .then((data) => {
        alert(
          "Signed Up Successfully. \n Please Sign In with your credentials"
        );
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  };
  const paperStyle = { padding: 20, width: 300, margin: "0 auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  const initialValues = {
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    termsAndConditions: false,
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3, "It's too short").required("Required"),
    email: Yup.string().email("Enter valid email").required("Required"),
    phoneNumber: Yup.number()
      .typeError("Enter valid Phone Number")
      .required("Required"),
    password: Yup.string()
      .min(8, "Password minimum length should be 8")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password not matched")
      .required("Required"),
    termsAndConditions: Yup.string().oneOf(
      ["true"],
      "Accept terms & conditions"
    ),
  });
  const onSubmit = (values, props) => {
    console.log(values);
    console.log(props);
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                username="username"
                label="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                helperText={<ErrorMessage name="name" />}
              />
              <Field
                as={TextField}
                fullWidth
                name="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                helperText={<ErrorMessage name="phoneNumber" />}
              />
              <Field
                as={TextField}
                fullWidth
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                helperText={<ErrorMessage name="password" />}
              /><p> more than 8 characters</p>
              <Field
                as={TextField}
                fullWidth
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                helperText={<ErrorMessage name="confirmPassword" />}
              />
              <FormControlLabel
                control={<Field as={Checkbox} name="termsAndConditions" />}
                label="I accept the terms and conditions."
              />
              <FormHelperText>
                <ErrorMessage name="termsAndConditions" />
              </FormHelperText>
              <Button
                onClick={handleSignup}
                type="submit"
                variant="contained"
                style={btnstyle}
                disabled={props.isSubmitting}
                color="primary"
              >
                {props.isSubmitting ? "Loading" : "Sign up"}
              </Button>
              {/* <Grid align='center'>Or</Grid>
                                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth><i class="fa fa-google" style={{fontSize:"20px"}}></i> &nbsp;Sign up with google</Button>
                                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth><FacebookIcon /> &nbsp;Sign up with Facebook</Button> */}
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Signup;
