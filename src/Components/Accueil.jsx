import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import '../Styles/Components.css';
import Row from './row/Row';
import axios from "axios";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Accueil() {
    const [employes, setEmployes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/employer/all").then(response => setEmployes(response.data));
    }, []);

    const colors = ['#1212c4','#2525be', '#2331eeee'];

    const CustomLegend = () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', paddingLeft: 60, marginTop: 50 }}>
            {dataStat.map((_, index) => (
                <div key={index} style={{
                    width: 20,
                    height: 20,
                    backgroundColor: colors[index % colors.length],
                    marginRight: 8,
                    borderRadius: 2
                }} />
            ))}
            <span style={{ marginLeft: 8, fontSize: 25 }}>Salaire</span>
        </div>
    );

    const salaireTotal = employes.reduce((acc, emp) => acc + emp.salaire, 0);
    const salaireMin = employes.length > 0 ? Math.min(...employes.map(emp => emp.salaire)) : 0;
    const salaireMax = employes.length > 0 ? Math.max(...employes.map(emp => emp.salaire)) : 0;

    const dataStat = [
        { type: 'Salaire Total', valeur: salaireTotal },
        { type: 'Salaire Min', valeur: salaireMin },
        { type: 'Salaire Max', valeur: salaireMax }
    ];

    const refreshData = (numDelete) => {
        let ref = employes.filter(e => e.numEmp !== numDelete);
        setEmployes([...ref]);
        toast.success("🗑️ Employé supprimé avec succès !", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            transition: Slide,   
            style: {
                backgroundColor: "#e6ffed",
                color: "#007e33",
                fontWeight: "bold",
            }
            
        });
    };

    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className='appli'>
                <div className='tab w-58 bg-white rounded p-3'>
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
                                    {employes.map((emp, index) => (
                                        <Row employer={emp} key={index} refreshData={refreshData} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', color: 'black' }}>
                        <div className='p-3 mx-3' style={{ backgroundColor: '#bec4c5', borderRadius: '10px', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                            <h5>Salaire Total: {salaireTotal} Ar</h5>
                        </div>
                        <div className='p-3 mx-3' style={{ backgroundColor: '#bec4c5', borderRadius: '10px', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                            <h5>Salaire minimal: {salaireMin} Ar</h5>
                        </div>
                        <div className='p-3 mx-3' style={{ backgroundColor: '#bec4c5', borderRadius: '10px', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                            <h5>Salaire maximal: {salaireMax} Ar</h5>
                        </div>
                    </div>
                    <h3 style={{ color: 'blue', textAlign: 'center', marginTop:'40px', fontSize: 35 }}>Statistique de salaire</h3>
                    <div style={{ width: '60%', height: 600, marginTop: '40px' }}>
                        <ResponsiveContainer>
                            <BarChart data={dataStat}>
                                <XAxis dataKey="type" stroke='#000' />
                                <YAxis stroke='#000' />
                                <Tooltip />
                                <Legend content={<CustomLegend />} />
                                <Bar dataKey="valeur">
                                    {dataStat.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Accueil;
