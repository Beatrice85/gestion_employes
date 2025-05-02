import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Components.css';

function Modifier() {
    
    return (
        <div className="modal-overlay" >
            <div className="modal-content">
                <h2 style={{ color: 'blue', textAlign: 'center' }}>Modifier employe</h2>
                
                <form>
                    <label htmlFor="numEmp">
                        Numero-employe:
                        <input
                            name="numEmp"
                            placeholder="Entrer votre numero"
                            type="text"
                            required
                        />
                    </label>
                    
                    <label htmlFor="nom">
                        Nom:
                        <input
                            name="nom"
                            type="text"
                            placeholder="Entrer votre nom"
                            required
                        />
                    </label>
                    
                    <label htmlFor="salaire">
                        Salaire:
                        <input
                            name="salaire"
                            type="number"
                            required
                            placeholder="Entrer le salaire"
                        />
                    </label>

                    <div className="menu p-3 d-flex mt-2">
                         <Link to="/" className=  "btn btn-primary mb-3 w-100 mr-40 d-flex justify-content-center h-120 mt-2">
                         Annuler</Link>
                        <button
                            type="submit"
                            className=  "btn btn-success mb-3 w-100 mr-10">Modifier
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default Modifier;
