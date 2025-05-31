import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Row({ employer, refreshData }) {
  // Observation salaire
  let observation = "";
  if (employer.salaire < 1000) observation = "Médiocre";
  else if (employer.salaire > 5000) observation = "Grand";
  else observation = "Moyen";

  const deleteItem = () => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p style={{color: "black"}}>⚠️ Êtes-vous sûr de vouloir supprimer cet employé ?</p>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
            <button
              className="btn btn-sm btn-danger mx-2"
              onClick={() => {
                axios
                  .delete(`http://localhost:8080/employer/suppr/${employer.numEmp}`)
                  .then((response) => {
                    refreshData(employer.numEmp);
                  })
                  .catch((error) => {
                    toast.error("❌ Échec de la suppression !");
                    console.error("Erreur lors de la suppression :", error);
                  });
                closeToast(); // Fermer la boîte après action
              }}
            >
              Oui
            </button>
            <button className="btn btn-sm btn-secondary" onClick={closeToast}>
              Non
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        transition: Slide,
        position: "top-center"
      }
    );
  };

  return (
    <tr>
      <td>{employer.nom}</td>
      <td>{employer.salaire}</td>
      <td>{observation}</td>
      <td className="actions">
        <Link to={`/modifier/${employer.numEmp}`} className="btn btn-sm btn-primary mx-2">
          <i className="fas fa-edit"></i>
        </Link>
        <button className="btn btn-sm btn-danger" onClick={deleteItem}>
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
}
