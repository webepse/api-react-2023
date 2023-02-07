import { useState } from 'react'
import authAPI from '../services/authAPI';
import { useNavigate } from 'react-router-dom';

const LoginPage = (props) => {

    const navigate = useNavigate()

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
            props.onLogin(true)
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
                        <div className="form-group my-3">
                            <label htmlFor="username">Adresse E-mail</label>
                            <input 
                                type="text"
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder="Adresse E-mail de connexion"
                                name="username"
                                id="username"
                                className={"form-control" + (error && " is-invalid")}
                            />
                            { error && (
                                <p className="invalid-feedback">{error}</p>
                            )}
                        </div>
                        <div className='form-group my-3'>
                            <label htmlFor="password">Mot de passe</label>
                            <input
                                type="password"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Mot de passe"
                                id="password"
                                name="password"
                                className='form-control' 
                             />
                        </div>
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