import axios from 'axios';
import { ADD_NEW_EMPLOYEE_API, FETCH_EMPLOYEES_LIST_API } from '../root-endpoints';
import { authHeader, currentUserCompanyID } from '../auth-header';


// Function to add new employee to the server
const addNewEmployeeToServer = ( newEmployee ) =>{
    // Spread the newEmployee properties and add the companyID to it
    console.log('sent service')

    return axios.post(ADD_NEW_EMPLOYEE_API, {...newEmployee, companyID : currentUserCompanyID.toString()}, { headers: authHeader })
}


// Function to get all employee from the server
const fetchCompanyEmployees = () =>{
    return  axios.get(FETCH_EMPLOYEES_LIST_API + currentUserCompanyID, { headers: authHeader })
}

// Function that allow admin to update the employee profile
const putCompanyEmployee = () =>{
    // return axios.put(UPDATE_EMPLOYEE_PROFIEL + , {headers: authHeader})
}
const EmployeeService = {
    addNewEmployeeToServer,
    fetchCompanyEmployees
}


export default EmployeeService;