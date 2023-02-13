import {Route, Navigate} from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'

const PrivateRoute = (props) => {
    const {isAuthenticated} = useContext(AuthContext)

    return isAuthenticated ? (
        props.children
    ) : (
        <Navigate to='/login' />
    )
}

export default PrivateRoute