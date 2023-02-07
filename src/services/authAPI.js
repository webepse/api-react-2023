import Axios from 'axios'
import jwtDecode from 'jwt-decode'

function authenticate(credentials)
{
    return Axios
            .post("http://localhost:8000/api/login_check", credentials)
            .then(response => response.data.token)
            .then(token => {
                window.localStorage.setItem('authToken', token)
                // ajouter à axios pour chaque req, le bearer token avec notre token
                Axios.defaults.headers["Authorization"]="Bearer " + token
                return true
            })
}

function logout()
{
    window.localStorage.removeItem('authToken')
    delete Axios.defaults.headers['Authorization']
}

function setup()
{
    // voir si on a un token
    const token = window.localStorage.getItem('authToken')
    if(token)
    {
        const jwtData = jwtDecode(token)
        // millisecondes vs secondes
        if((jwtData.exp * 1000) > new Date().getTime())
        {
            Axios.defaults.headers["Authorization"]="Bearer " + token
        }
    }
}

export default {
    authenticate: authenticate,
    logout: logout,
    setup: setup
}