import React, { useState } from "react";
import Error from "./Error";
import Loader from "./Loader";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "../store/reducers/userSlice";
import { Link } from "react-router-dom";
import { useCheckUserStatus } from "../utils/CheckUserStatus";

const Registration = () => {
  const dashboard = useSelector((state) => state.user.userData.dashboard);
  const dispatch = useDispatch();
  const [user] = useCheckUserStatus();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [formValidation, setFormValidation] = useState({
    errorfirstName: null,
    errorlastName: null,
    erroremail: null,
    errorpassword: null,
  });
  const [btnInfo, setBtnInfo] = useState("Create Account");
  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.firstName.length === 0) {
      setFormValidation((formValidation) => ({
        ...formValidation,
        errorfirstName: <Error msg="First Name is required" />,
      }));
      setTimeout(
        () =>
          setFormValidation((formValidation) => ({
            ...formValidation,
            errorfirstName: null,
          })),
        2000
      );
      return;
    }
    if (formData.lastName.length === 0) {
      setFormValidation((formValidation) => ({
        ...formValidation,
        errorlastName: <Error msg="Last Name is required" />,
      }));
      setTimeout(
        () =>
          setFormValidation((formValidation) => ({
            ...formValidation,
            errorlastName: null,
          })),
        2000
      );
      return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      setFormValidation((formValidation) => ({
        ...formValidation,
        erroremail: <Error msg="Email is not valid" />,
      }));
      setTimeout(
        () =>
          setFormValidation((formValidation) => ({
            ...formValidation,
            erroremail: null,
          })),
        2000
      );
      return;
    }
    if (!/^[A-Za-z0-9]\w{7,14}$/.test(formData.password)) {
      setFormValidation((formValidation) => ({
        ...formValidation,
        errorpassword: (
          <Error msg="Password should be 7 to 16 characters which contain only characters, numeric digits, underscore" />
        ),
      }));
      setTimeout(
        () =>
          setFormValidation((formValidation) => ({
            ...formValidation,
            errorpassword: null,
          })),
        6000
      );
      return;
    }
    setBtnInfo(<Loader />);

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then(() => {
        const { firstName, lastName, email } = formData;
        dispatch(addUserData({ firstName, lastName, email }));
        setFormData({ firstName: "", lastName: "", email: "", password: "" });
        setBtnInfo("Account created successfully");
        // ...
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setFormValidation((formValidation) => ({
            ...formValidation,
            erroremail: (
              <Error msg="You are already registered !! Please log in" />
            ),
          }));
          setBtnInfo("You are already registered !! Please log in");
          setTimeout(
            () =>
              setFormValidation((formValidation) => ({
                ...formValidation,
                erroremail: null,
              })),
            2000
          );
        }
        // ..
      });
  };
  return (
    <>
      <div className="box flex-center flex-col">
        <h1 className="heading">Registration</h1>
        <p className="opacity-light">Enter your details to create account</p>
        <form action="#" className="form-width">
          <div className="form-transitions flex-center flex-col align-start gap-y-1">
            <label htmlFor="first">First Name</label>
            <input
              type="text"
              placeholder="Enter your First Name"
              id="first"
              value={formData.firstName}
              onChange={handleChange}
              name="firstName"
            />
            {formValidation.errorfirstName}
          </div>
          <div className="form-transitions flex-center flex-col align-start gap-y-1">
            <label htmlFor="last">Last Name</label>
            <input
              type="text"
              placeholder="Enter your Last Name"
              id="last"
              value={formData.lastName}
              onChange={handleChange}
              name="lastName"
            />
            {formValidation.errorlastName}
          </div>
          <div className="form-transitions flex-center flex-col align-start gap-y-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              name="email"
            />
            {formValidation.erroremail}
          </div>
          <div className="form-transitions flex-center flex-col align-start gap-y-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your Password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <p className="info">
              **Please provide a password whose length is between 7 to 16
              characters which contains only characters, numeric digits,
              underscore**
            </p>
            {formValidation.errorpassword}
          </div>
          <button type="submit" onClick={handleSubmit} className="input-btn">
            {btnInfo}
          </button>
        </form>

        {user.status === "fullfiled" &&
          !dashboard &&
          (user.loggedin ? (
            <>
              <p style={{ color: "var(--outline-color)", fontWeight: "700" }}>
                OR
              </p>
              <Link to="/login" className="link">
                Login
              </Link>
            </>
          ) : null)}
      </div>
    </>
  );
};

export default Registration;
