import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../Styles/Components.css';
import Row from './row/Row';
import axios from "axios"

function Accueil() {
    
    const [employes,setEmployes] = useState([])
    const salaireTotal = employes.reduce((acc, emp) => acc + emp.salaire, 0);
const salaireMin = employes.length > 0 ? Math.min(...employes.map(emp => emp.salaire)) : 0;
const salaireMax = employes.length > 0 ? Math.max(...employes.map(emp => emp.salaire)) : 0;


    const refreshData =(numDelete)=>{
        let ref = employes.filter(e=>e.numEmp!==numDelete)
        setEmployes([...ref])
    }

    useEffect(()=>{
        axios.get("http://localhost:8080/employer/all").then(response=>setEmployes(response.data))
    },[])

    return (
        <div className='appli'>
            <div className='tab w-58 bg-white rounded p-3'>
                <h1 style={{ color: 'blue', textAlign: 'center' }}>Gestion-employés</h1>
                <div className='d-flex justify-content-start mt-10'>
                    <Link to="/ajout" className='btn btn-success'>+ Ajouter employé</Link>
                </div>
                <div className="card">
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Salaire</th>
                                    <th>Observation</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    employes.map((emp,index)=>{
                                        return <Row employer={emp} key={index} refreshData={refreshData}/>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', color: 'black' }}>
                    <div className='p-3 mx-3'>
                        <h5>Salaire Total: {salaireTotal} Ariary</h5>
                    </div>
                    <div className='p-3 mx-3'>
                        <h5>Salaire minimal: {salaireMin} Ariary</h5>
                    </div>
                    <div className='p-3 mx-3'>
                        <h5>Salaire maximal: {salaireMax} Ariary</h5>
                    </div>
                </div>
            <h3 style={{ color: 'blue', textAlign: 'center', marginTop:'40px' }}>Statistique de salaire</h3>
                <div style={{ width: '60%', height: 500, marginTop: '40px' }}>
                    <ResponsiveContainer>
                        <BarChart data={employes}>
                            <XAxis dataKey="nom" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="salaire" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

function getMaxSalaire(data){
    
}

export default Accueil;
