import React from "react"
import {Navigate, Outlet} from "react-router-dom"
import AuthorizationLogic from "../service/AuthorizationLogic"

const PrivateRoute = () => {
    return AuthorizationLogic.isUserSignIn() ? <Outlet/> : <Navigate to="/signin"/>
}

export default PrivateRoute
