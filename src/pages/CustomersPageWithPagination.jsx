import { useState, useEffect } from 'react';
import Axios from "axios"
import Pagination from '../components/Pagination';

const CustomersPageWithPagination = (props) => {

    const [customers, setCustomers] = useState([])

    // pour la pagination 
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItems, settotalItems] = useState(0)
    // définir le nombre d'items par page 
    const itemsPerPage = 10

    const handlePageChange = (page) => {
        setCustomers([])
        setCurrentPage(page)
    }

    useEffect(()=>{
        Axios.get(`http://127.0.0.1:8000/api/customers?pagination=true&count=${itemsPerPage}&page=${currentPage}`)
            .then(response => {
                setCustomers(response.data['hydra:member'])
                settotalItems(response.data['hydra:totalItems'])
            }) 
            .catch(error => console.log(error.response))
    },[currentPage])

    return ( 
        <>
            <h1>Liste des clients</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Entreprise</th>
                        <th className='text-center'>Factures</th>
                        <th className='text-center'>Montant total</th>
                        <th className='text-center'>Montant restant</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* Et logique (&&) expr1 && expr2 renvoie expr1 si cette expression peut être convertie en false, sinon renvoie expre2 */}

                    {customers.length === 0 && (
                        <tr>
                            <td colSpan="8" className='text-center'>Chargement...</td>
                        </tr>
                    )}

                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.firstName} {customer.lastName}</td>
                            <td>{customer.email}</td>
                            <td>{customer.company}</td>
                            <td className='text-center'>
                                <span className='badge bg-primary badge-primary'>
                                    {customer.invoices.length}
                                </span>
                            </td>
                            <td className='text-center'>{customer.totalAmount.toLocaleString()}€</td>
                            <td className='text-center'>{customer.unpaidAmount.toLocaleString()}€</td>
                            <td>
                                <button className='btn btn-sm btn-danger'>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination 
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={totalItems}
                onPageChanged={handlePageChange}
            />
        </>
     );
}
 
export default CustomersPageWithPagination;