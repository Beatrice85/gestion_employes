import React from "react";

export default function Row ({employer}){

    let observation = null
    if(employer.salaire < 1000 ){
        observation = "Médiocre"
    }else if(employer.salaire > 5000){
        observation = "Grand"
    }else{
        observation = "Moyen"
    }

    return <tr>
        <td>{employer.nom}</td>
        <td>{employer.salaire}</td>
        <td>{observation}</td>
        <td className='actions'>
            <Link to={"/modifier"} className='btn btn-sm btn-primary mx-2'>
                <i className="fas fa-edit"></i>
            </Link>

            <a className='btn btn-sm btn-danger' href={`http://localhost:8080/employer/suppr/${employer.numEmp}`}>
                <i className="fas fa-trash"></i>
            </a>
        </td>
    </tr>

}