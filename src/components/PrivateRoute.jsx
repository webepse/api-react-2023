import {Route, Navigate} from 'react-router-dom'

const PrivateRoute = (props) => {
    return props.isAuthenticated ? (
        props.children
    ) : (
        <Navigate to='/login' />
    )
}

export default PrivateRoute