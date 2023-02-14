import { useState } from "react"
import Field from "../components/forms/Field"
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import { toast } from "react-toastify";
import { USERS_API } from "../config";

const RegisterPage = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })

    const handleChange = event => {
        const {name,value} = event.currentTarget
        setUser({...user, [name]:value})
    }

    const handleSubmit = async event => {
        event.preventDefault()
        const apiErrors = {}
        if(user.password !== user.passwordConfirm){
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas identique à l'orignal"
            setErrors(apiErrors)
            // on arrete vu que ce n'est pas bon 
            return 
        }
        try{
            await Axios.post(USERS_API, user)
            setErrors({})
            toast.success("Vous êtes inscrit, vous pouvez vous connecter")
            navigate("/login", {replace: true})
        }catch({response})
        {
            const {violations} = response.data
            if(violations){
                violations.forEach(({propertyPath, message})=>{
                    apiErrors[propertyPath] = message
                })
                setErrors(apiErrors)
            }
            toast.error("Une erreur est survenue")
        }
    }


    return (
        <>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <Field 
                    name="firstName"
                    label="Prénom"
                    placeholder="Votre prénom"
                    error={errors.firstName}
                    value={user.firstName}
                    onChange={handleChange}
                />
                <Field 
                    name="lastName"
                    label="Nom"
                    placeholder="Votre nom de famille"
                    error={errors.lastName}
                    value={user.lastName}
                    onChange={handleChange}
                />
                <Field 
                    type="email"
                    name="email"
                    label="Adresse E-mail"
                    placeholder="Votre adresse E-mail"
                    error={errors.email}
                    value={user.email}
                    onChange={handleChange}
                />
                <Field 
                    type="password"
                    name="password"
                    label="Mot de passe"
                    placeholder="Votre mot de passe"
                    error={errors.password}
                    value={user.password}
                    onChange={handleChange}
                />
                <Field 
                    type="password"
                    name="passwordConfirm"
                    label="Confirmation de votre mot de passe"
                    placeholder="Confirmer votre mot de passe"
                    error={errors.passwordConfirm}
                    value={user.passwordConfirm}
                    onChange={handleChange}
                />
                <div className="my-3">
                    <button type="submit" className="btn btn-success">Confirmation</button>
                    <Link to="/login" className="btn btn-secondary">J'ai déjà un compte</Link>
                </div>
            </form>
        </>
    )
}

export default RegisterPage