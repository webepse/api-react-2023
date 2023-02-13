import {useEffect, useState} from 'react'
import Field from '../components/forms/Field'
import { Link, useNavigate, useParams } from 'react-router-dom'
import customersAPI from '../services/customersAPI'

const CustomerPage = (props) => {
    var {id = "new"} = useParams()
    const navigate = useNavigate()

    // si j'édite ou non
    const [editing, setEditing] = useState(false)
    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    })

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    })

    const fetchCustomer = async id => {
        try{
            const {firstName, lastName, email, company} = await customersAPI.find(id)
            setCustomer({firstName, lastName, email, company})
        }catch(error)
        {
            // notif
            navigate("/customers", {replace: true})
        }
    }

    useEffect(()=>{
        if(id !== "new")
        {
            setEditing(true)
            fetchCustomer(id)
        }
    },[id])

    return ( 
        <>
            {!editing ? <h1>Création d'un client</h1> : <h1>Modification d'un client</h1>}
        </>
     )
}
 
export default CustomerPage