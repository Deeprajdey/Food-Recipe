import "./App.css";
import Login from "./components/Login";
import Registration from "./components/Registration";
import { useCheckUserStatus } from "./utils/CheckUserStatus";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Dashboard from "./components/Dashboard";
import { redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const [user] = useCheckUserStatus();
  const dashboard = useSelector((state) => state.user.userData.dashboard);
  return (
    <>
      {user.status === "loading" && (
        <div className="box bg-red flex-center flex-col">
          <h1 className="heading text-center">Please wait while loading !!</h1>
          <span className="loader"></span>
        </div>
      )}
      {user.status === "fullfiled" &&
        !dashboard &&
        (user.loggedin ? <Login /> : <Registration />)}
    </>
  );
}

export default App;
