import { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import invoicesAPI from '../services/invoicesAPI';
import moment from 'moment/moment';

const STATUS_CLASSES = {
    PAID: "success",
    SENT: "primary",
    CANCELLED: "danger"
}

const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED: "Annulée"
}

const InvoicesPage = () => {
    const [invoices, setInvoices] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")
    const itemsPerPage = 10

    // récup invoices
    const fetchInvoice = async () => {
        try{
            const data = await invoicesAPI.findAll()
            setInvoices(data)
        }catch(error)
        {
            // notif
            console.log(error.response)
        }
    }

    useEffect(()=>{
        fetchInvoice()
    },[])

    //gestion du changement de page 
    const handlePageChange = (page) =>{
        setCurrentPage(page)
    }

    //gestion de la recherche
    const handleSearch = event => {
        const value = event.currentTarget.value 
        setSearch(value)
        setCurrentPage(1)
    }
    
    // gestion de la suppression
    const handleDelete = async (id) =>{
        const originalInvoices = [...invoices]
        setInvoices(invoices.filter(invoice=>invoice.id !== id))

        try{
            await invoicesAPI.delete(id)
        }catch(error)
        {
            // notif
            setInvoices(originalInvoices)
        }
    }

    const filteredInvoices = invoices.filter(i => 
            i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
            i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
            i.amount.toString().includes(search.toLowerCase()) ||
            STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
        )

    const PaginatedInvoices = Pagination.getData(filteredInvoices, currentPage, itemsPerPage)
    
    const formatDate = (str) => moment(str).format('DD/MM/YYYY')

    return ( 
        <>
            <h1>Liste des factures</h1>
        </>
     );
}
 
export default InvoicesPage;