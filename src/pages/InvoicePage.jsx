import {useState, useEffect} from 'react'
import invoicesAPI from '../services/invoicesAPI'
import Field from '../components/forms/Field'
import customersAPI from '../services/customersAPI'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Select from '../components/forms/Select'
import { toast } from "react-toastify";

const InvoicePage = (props) => {

    var {id="new"} = useParams()
    const navigate = useNavigate()

    const [invoice, setInvoice] = useState({
        amount:"",
        customer:"",
        status: "SENT"
    })

    const [errors, setErrors] = useState({
        amount:"",
        customer:"",
        status: ""
    })

    const [customers, setCustomers] = useState([])
    const [editing, setEditing] = useState(false)

    // récup les client
    const fetchCustomers = async () => {
        try{
            const data = await customersAPI.findAll()
            setCustomers(data)
            if(id === "new") setInvoice({...invoice, customer: data[0].id})
        }catch(error)
        {
            toast.error("Impossible de charger les clients")
            navigate("/invoices", {replace: true})
        }
    }

    // recup la facture
    const fetchInvoice = async id => {
        try{
            const {amount, status, customer} = await invoicesAPI.find(id)
            setInvoice({amount, status, customer: customer.id})
        }catch(error){
            toast.error("Impossible de charger la facture demandée")
            navigate("/invoices", {replace: true})
        }
    }

    // au chargement du composant
    useEffect(()=>{
        fetchCustomers()
    },[])

    // dépond de la variable id - de l'url param
    useEffect(()=>{
        if(id !=="new")
        {
            setEditing(true)
            fetchInvoice(id)
        }
    },[id])

    const handleChange = event => {
        const {name,value} = event.currentTarget
        setInvoice({...invoice, [name]:value})
    }

    const handleSubmit = async event => {
        event.preventDefault()
        try{
            // si je suis en édition ou en création
            if(editing)
            {
                await invoicesAPI.update(id, invoice)
                toast.success("La facture a bien été modifiée")
            }else{
                await invoicesAPI.create(invoice)
                toast.success("La facture a bien été enregistrée")
                navigate("/invoices", {replace: true})
            }
        }catch({response}){
            const {violations} = response.data
            if(violations){
                const apiErrors = {}
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message
                })
                setErrors(apiErrors)
            }
            toast.error("Une erreur est survenue")
        }
    }


    return ( 
        <>
            {editing ? <h1>Modification d'une facture</h1> : <h1>Création d'une facture</h1>}
            <form onSubmit={handleSubmit}>
                <Field 
                    name="amount"
                    type="number"
                    placeholder='Montant de la facture'
                    label="Montant"
                    onChange={handleChange}
                    value={invoice.amount}
                    error={errors.amount}
                />
                <Select
                    name="customer"
                    label="Client"
                    value={invoice.customer}
                    error={errors.customer}
                    onChange={handleChange}
                >
                    {customers.map(customer => <option key={customer.id} value={customer.id}>{customer.firstName} {customer.lastName}</option>)}
                </Select>
                <Select 
                    name="status"
                    label="Statut"
                    value={invoice.status}
                    error={errors.status}
                    onChange={handleChange}
                >
                    <option value="SENT">Envoyée</option>
                    <option value="PAID">Payée</option>
                    <option value="CANCELLED">Annulée</option>
                </Select>
                <div className="my-3">
                    <button type="submit" className='btn btn-success'>Enregistrer</button>
                    <Link to="/invoices" className='btn btn-secondary mx-2'>Retour aux factures</Link>
                </div>

            </form>
        </> 
    );
}
 
export default InvoicePage;
