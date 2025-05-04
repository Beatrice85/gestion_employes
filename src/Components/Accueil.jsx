import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../Styles/Components.css';
import Row from './row/Row';

function Accueil() {
    const salaireTotal = 10000;
    const salaireMin = 2000;
    const salaireMax = 9000;

    const data = [
        { name: 'Total', salaire: salaireTotal },
        { name: 'Min', salaire: salaireMin },
        { name: 'Max', salaire: salaireMax },
    ];

    const [employes,setEmployes] = useState([])

    useEffect(()=>{
        fetch("http://localhost:8080/employer/all",{method:"GET"}).then(response=>{
            response.json()
        }).then(data=>{
            setEmployes(data)
            console.log(data)
        }).catch((e)=>console.error("Erreur be"))
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
                                        return <Row employer={emp} key={index}/>
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
                        <BarChart data={data}>
                            <XAxis dataKey="name" />
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
