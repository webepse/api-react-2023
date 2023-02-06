import Axios  from "axios";

function findAll()
{
    return Axios.get("http://127.0.0.1:8000/api/invoices")
            .then(response => response.data['hydra:member'])
}

function deleteInvoice(id)
{
    return Axios.delete(`http://127.0.0.1:8000/api/invoices/${id}`)
}

export default {
    findAll : findAll,
    delete: deleteInvoice
}
