import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Components.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Modifier() {
    const {id} = useParams()
    const [concerned,setConcerned] = useState({})
    const [nom,setNom] = useState("")
    const [salaire,setSalaire] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        fetch(`http://localhost:8080/employer/${id}`).then(response=>response.json())
        .then(data=>{
            setConcerned(data)
            if(data){
                setNom(data.nom)
                setSalaire(data.salaire)
            }
        })
    },[])

    const sendData = (e)=>{
        e.preventDefault()

        if(nom.trim()!==""){
            axios.post(`http://localhost:8080/employer/modif/${id}`,{nom,salaire}).then(response=>{
               console.log(response.data)
               navigate("/")
            })
        }

    }

    return (
        <div className="modal-overlay" >
            <div className="modal-content">
                <h2 style={{ color: 'blue', textAlign: 'center' }}>Modifier employe</h2>
                
                <form>                
                    <label htmlFor="nom">
                        Nom:
                        <input
                            name="nom"
                            type="text"
                            placeholder="Entrer votre nom"
                            required
                            value={(nom)?nom : ""}
                            onChange={(e)=>setNom(e.target.value)}
                        />
                    </label>
                    
                    <label htmlFor="salaire">
                        Salaire:
                        <input
                            name="salaire"
                            type="number"
                            required
                            placeholder="Entrer le salaire"
                            value={(salaire)?salaire : 0}
                            onChange={(e)=>setSalaire(e.target.value)}
                        />
                    </label>

                    <div className="menu p-3 d-flex mt-2">
                         <Link to="/" className=  "btn btn-primary mb-3 w-100 mr-40 d-flex justify-content-center h-120 mt-2">
                         Annuler</Link>
                        <button
                            type="submit"
                            className=  "btn btn-success mb-3 w-100 mr-10"
                            onClick={(e)=>sendData(e)}
                        >Modifier
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default Modifier;
