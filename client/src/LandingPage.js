import React from "react";
import { Routes, Route, useNavigate, BrowserRouter, useLocation, useParams } from "react-router-dom"
import { initialState, reducer } from "./Reducers/userReducer"
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import App from "./App"
import Home from "./Pages/Home"
import CreateClass from "./Pages/CreateClass";
import JoinClass from "./Pages/JoinClass";
import ClassPage from "./Pages/ClassPage";
import CreateContentForm from "./Pages/CreateContentForm";
import EmailVerified from "./Pages/EmailVerified";


export const UserContext = React.createContext()

const Routing = () => {
  const navigate = useNavigate()
  const {state, dispatch} = React.useContext(UserContext);
  const { id, token } = useParams();
//   const id = "6567626df82288fdccb3ba34";
//   const token = "44c04edece27f88dc65459e89816834eb104c9a5a710100d20940aa51fa2fce9"

    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        
        if (user) {
            dispatch({ type: "USER", payload: user });

            navigate("/");
        } else {
            if (token) {
                // console.log(token);
                // navigate(`/auth/${id}/verify/${token}`);

                setTimeout(() => {
                    navigate(`/auth/${id}/verify/${token}`);
                }, 5000);
            } else {
                navigate("/auth/signup");
            }
        }
    }, [id, token])

  return (
    <Routes>
        <Route exact path="/auth/signup" Component={SignUp}></Route>
        <Route exact path="/auth/signin" Component={SignIn}></Route>
        <Route exact path="/auth/:id/verify/:token" Component={EmailVerified}></Route>
        <Route exact path="/" Component={App}>
            <Route exact path="" Component={Home}></Route>
            <Route exact path="classes/createClass" Component={CreateClass}></Route>
            <Route exact path="classes/joinClass" Component={JoinClass}></Route>
            <Route exact path="classes/:classId" Component={ClassPage}></Route>
            <Route exact path="createcontent/:classId" Component={CreateContentForm}></Route>
        </Route>
    </Routes>
  )
}


export default function LandingPage() {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    return (
        <UserContext.Provider value={{state, dispatch}}>
            <BrowserRouter>
                <Routing />
            </BrowserRouter>
        </UserContext.Provider>
    )
}