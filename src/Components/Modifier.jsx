import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../Styles/Components.css';
import Navbar from './Navbar';
import axios from 'axios';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

function Modifier() {
    const { id } = useParams();
    const [nom, setNom] = useState("");
    const [salaire, setSalaire] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/employer/${id}`)
            .then(response => {
                const data = response.data;
                setNom(data.nom);
                setSalaire(data.salaire);
            });
    }, [id]);

    const sendData = (e) => {
        e.preventDefault();
        if (nom.trim() !== "") {
            axios.post(`http://localhost:8080/employer/modif/${id}`, { nom, salaire })
                .then(() => {
                    toast.success(" Employé modifié avec succès !",{
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
                    setTimeout(() => {
                        navigate("/", { state: { modifiedId: parseInt(id) } });
                    }, 2000);
                })
                .catch(error => {
                    toast.error("❌ Erreur lors de la modification !");
                    console.error(error);
                });
        }
    };

    return (
        <>
            <Navbar />
            <ToastContainer position="top-center" autoClose={2000} />
            <motion.div
                className="modal-overlay"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="modal-content">
                    <form>
                        <label htmlFor="nom">
                            Nom:
                            <input
                                name="nom"
                                type="text"
                                placeholder="Entrer votre nom"
                                required
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                            />
                        </label>

                        <label htmlFor="salaire">
                            Salaire:
                            <input
                                name="salaire"
                                type="number"
                                required
                                placeholder="Entrer le salaire"
                                value={salaire}
                                onChange={(e) => setSalaire(e.target.value)}
                            />
                        </label>

                        <div className="d-flex justify-content-between mt-4">
                            <Link to="/" className="btn btn-secondary w-40 h-12 mt-2">Annuler</Link>
                            <button type="submit" className="btn btn-success w-40 h-12 mt-2" onClick={sendData}>Modifier</button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </>
    );
}

export default Modifier;
