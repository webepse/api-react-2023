import { useState, useContext } from 'react'
import authAPI from '../services/authAPI';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import Field from '../components/forms/Field';

const LoginPage = (props) => {

    const navigate = useNavigate()
    const {setIsAuthenticated} = useContext(AuthContext)

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const [error, setError] = useState("")

    const handleChange = (event) => {
        const value = event.currentTarget.value
        const name = event.currentTarget.name

        // copie de l'objet credention ... et la virgule permet de faure un ajout ou un remplacement
        // si on laisse simple name, il va venir écrire dans l'objet une prop name mais avec le crochet il va prendre la valeur de name (ex: username)
        // {...credentials, name:value}
        // name: 'berti@epse.be'
        // {...credentials, [name]:value}
        // username: 'berti@epse.be'

        setCredentials({...credentials, [name]:value})

    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            await authAPI.authenticate(credentials)
            setError("")
            setIsAuthenticated(true)
            navigate('/customers', {replace: true})
        }catch(error)
        {
            setError("Aucun compte ne possède cette adresse e-mail ou les informations ne correspondent pas")
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-4 offset-4">
                    <h1>Connexion</h1>
                    <form onSubmit={handleSubmit}>
                        <Field 
                            label="Adresse Email"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            placeholder="Adresse E-mail de connexion"
                            error={error}
                        />
                        <Field 
                            label="Mot de passe"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="Mot de passe"
                            error={error}
                            type="password"
                        />
                        <div className="form-group my-3">
                            <button className='btn btn-success'>Connexion</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )




}

export default LoginPage;