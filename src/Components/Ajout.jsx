import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../Styles/Components.css';
import axios from 'axios';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Ajout() {
    const [nom, setNom] = useState("");
    const [salaire, setSalaire] = useState(0);
    const navigate = useNavigate();

    const sendData = (e) => {
        e.preventDefault();

        if (nom.trim() !== "") {
            axios.post("http://localhost:8080/employer/new", { nom, salaire })
                .then(response => {
                    toast.success("🎉 Employé ajouté avec succès !", {
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
                        navigate("/", { state: { added: true } });
                    }, 2200);
                })
                .catch(error => {
                    toast.error("❌ Erreur lors de l'ajout", {
                        position: "top-center",
                        autoClose: 2500,
                        transition: Slide,
                style: {
                    backgroundColor: "#e6ffed",
                    color: "#007e33",
                    fontWeight: "bold",
            }
                    });
                    console.error("Erreur :", error);
                });
        } else {
            toast.warning("⚠️ Le nom est requis", {
                position: "top-center",
                autoClose: 2000,
                transition: Slide,
            style: {
                backgroundColor: "#e6ffed",
                color: "#007e33",
                fontWeight: "bold",
            }
            });
        }
    };

    return (
        <>
            <Navbar />
            <ToastContainer />

            <div className="modal-overlay animated-fade">
                <div className="modal-content animated-scale shadow rounded">
                    
                    <form onSubmit={sendData}>
                        <label htmlFor="nom" className="form-label">
                            Nom:
                            <input
                                name="nom"
                                type="text"
                                className="form-control mb-3"
                                placeholder="Entrer le nom"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                required
                            />
                        </label>

                        <label htmlFor="salaire" className="form-label">
                            Salaire:
                            <input
                                name="salaire"
                                type="number"
                                className="form-control mb-3"
                                placeholder="Entrer le salaire"
                                value={salaire}
                                onChange={(e) => setSalaire(e.target.value)}
                                required
                            />
                        </label>

                        <div className="d-flex justify-content-between mt-4">
                           
                            <Link to="/" className="btn btn-secondary w-40 h-12 mt-2" >
                                Annuler
                            </Link>
                            
                            <button type="submit" className="btn btn-success w-40 h-12">
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Ajout;
