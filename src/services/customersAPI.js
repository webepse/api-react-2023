import Axios from "axios";

function findAll(){
    return Axios.get("http://127.0.0.1:8000/api/customers")
                .then(response => response.data['hydra:member'])
}

function find(id)
{
    return Axios.get(`http://127.0.0.1:8000/api/customers/${id}`)
                .then(response => response.data)
}

function deleteCustomer(id){
    return Axios.delete(`http://127.0.0.1:8000/api/customers/${id}`)
}

function updateCustomer(id, customer)
{
    return Axios.put(`http://127.0.0.1:8000/api/customers/${id}`, customer)
}

function createCustomer(customer)
{
    return Axios.post("http://127.0.0.1:8000/api/customers", customer)
}

export default {
    findAll : findAll,
    find: find,
    update: updateCustomer,
    create: createCustomer,
    delete: deleteCustomer
}