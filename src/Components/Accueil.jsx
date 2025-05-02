import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../Styles/Components.css';

function Accueil() {
    const salaireTotal = 10000;
    const salaireMin = 2000;
    const salaireMax = 9000;

    const data = [
        { name: 'Total', salaire: salaireTotal },
        { name: 'Min', salaire: salaireMin },
        { name: 'Max', salaire: salaireMax },
    ];

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
                                <tr>
                                    <td>Stéphanie</td>
                                    <td>10000</td>
                                    <td>Moyen</td>
                                    <td className='actions'>
                                        <Link to="/modifier" className='btn btn-sm btn-primary mx-2'>
                                            <i className="fas fa-edit"></i> Modifier
                                        </Link>
                                        <button className='btn btn-sm btn-danger'>
                                            <i className="fas fa-trash"></i> Supprimer
                                        </button>
                                    </td>
                                </tr>
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

export default Accueil;
