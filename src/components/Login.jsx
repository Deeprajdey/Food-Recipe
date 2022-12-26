import React, { useState } from "react";
import Error from "./Error";
import Loader from "./Loader";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import { useCheckUserStatus } from "../utils/CheckUserStatus";
import { useDispatch } from "react-redux";
import { openDashboard } from "../store/reducers/userSlice";

const Login = () => {
  const [user, setUser] = useCheckUserStatus();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formValidation, setFormValidation] = useState({
    erroremail: null,
    errorpassword: null,
  });
  const [btnInfo, setBtnInfo] = useState("Log in");
  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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
    setFormData({ email: "", password: "" });
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        setBtnInfo("You are Logged in");
        // setUser({
        //   ...user,
        //   dashboard: true,
        // });
        dispatch(openDashboard());
        window.location.href = `${window.location.origin}/dashboard`;
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/user-not-found).") {
          setFormValidation((formValidation) => ({
            ...formValidation,
            erroremail: <Error msg="User not found" />,
          }));
          setBtnInfo("User not found");
          setTimeout(
            () =>
              setFormValidation((formValidation) => ({
                ...formValidation,
                erroremail: null,
              })),
            2000
          );
        }
        if (error.message === "Firebase: Error (auth/wrong-password).") {
          setFormValidation((formValidation) => ({
            ...formValidation,
            errorpassword: <Error msg="Wrong password" />,
          }));
          setBtnInfo("Wrong Password");
          setTimeout(
            () =>
              setFormValidation((formValidation) => ({
                ...formValidation,
                errorpassword: null,
              })),
            2000
          );
        }
      });
  };
  return (
    <>
      <div className="box flex-center flex-col">
        <h1 className="heading">Login</h1>
        <p className="opacity-light">Enter your details to log in</p>
        <form action="#" className="form-width">
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
          <button type="submit" onClick={handleSubmit} className="input-btn ">
            {btnInfo}
          </button>
        </form>
        <p style={{ color: "var(--outline-color)", fontWeight: "700" }}>OR</p>
        <Link to="/registration" className="link">
          Registration
        </Link>
      </div>
    </>
  );
};

export default Login;
