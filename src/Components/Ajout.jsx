import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Components.css';

function Ajout() {
    const [nom,setNom] = useState("")
    const [salaire,setSalaire] = useState(0)

    const sendData = (e)=>{
        e.preventDefault()

        if(nom.trim()!==""){
            fetch("http://localhost:8080/employer/new",{method:"POST",body:{nom,salaire}}).then(response=>{
               alert(response.body)
            })
        }
    }
    
    return (
        <div className="modal-overlay" >
            <div className="modal-content">
                <h2 style={{ color: 'blue', textAlign: 'center' }}>Ajout employe</h2>
                
                <form>       
                    <label htmlFor="nom">
                        Nom:
                        <input
                            name="nom"
                            type="text"
                            placeholder="Entrer votre nom"
                            value={nom}
                            onChange={(e)=>setNom(e.target.value)}
                            required
                        />
                    </label>
                    
                    <label htmlFor="salaire">
                        Salaire:
                        <input
                            name="salaire"
                            type='number'
                            required
                            value={salaire}
                            onChange={(e)=>setSalaire(e.target.value)}
                            placeholder="Entrer le salaire"
                        />
                    </label>

                    <div className="menu p-3 d-flex mt-2">
                         <Link to="/" className=  "btn btn-primary mb-3 w-100 mr-40 d-flex justify-content-center h-120 mt-2">
                         Annuler</Link>
                        <button
                            type="submit"
                            className=  "btn btn-success mb-3 w-100 mr-10"
                            onClick={(e)=>sendData(e)}
                        >Enregistrer
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default Ajout;
