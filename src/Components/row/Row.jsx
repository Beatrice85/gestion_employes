import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export default function Row ({employer,refreshData}){

    let observation = null
    if(employer.salaire < 1000 ){
        observation = "Médiocre"
    }else if(employer.salaire > 5000){
        observation = "Grand"
    }else{
        observation = "Moyen"
    }

    const deleteItem=()=>{
        axios.delete(`http://localhost:8080/employer/suppr/${employer.numEmp}`).then(
            response=>{
                console.log(response.data)
                refreshData(employer.numEmp)
            }
        )
    }

    return <tr>
        <td>{employer.nom}</td>
        <td>{employer.salaire}</td>
        <td>{observation}</td>
        <td className='actions'>
            <Link to={`/modifier/${employer.numEmp}`} className='btn btn-sm btn-primary mx-2'>
                <i className="fas fa-edit"></i>
            </Link>

            <button 
                className='btn btn-sm btn-danger'
                onClick={()=>deleteItem()}
            >
                <i className="fas fa-trash"></i>
            </button>
        </td>
    </tr>

}