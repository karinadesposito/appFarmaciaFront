import React, { useEffect, useState } from 'react';
import NavBar from './navBar';
import Swal from 'sweetalert2'; 
import CrearFarmaciaForm from './crearFarmacia';
const Farmacias = () => {
  const [farmacias, setFarmacias] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [showForm, setShowForm] = useState(false);
  const farmaciaImages = [
    "https://media.istockphoto.com/id/1362600663/es/foto/farmacia-en-pyrgos-kallistis-en-santorini-grecia.jpg?s=612x612&w=0&k=20&c=EsaTgWABhhx6Mbxi_EkcFkpVs32nunITIA88oSZX4g8=",
    "https://media.istockphoto.com/id/639948346/es/foto/el-escaparate-pintado-de-verde-de-wick-pharmacy-escocia.jpg?s=612x612&w=0&k=20&c=QFu6slcvUr_FjTt6x3lBb-Gh61g4gO6UimWt1qE3BvM=",
    "https://media.istockphoto.com/id/1708876745/es/foto/la-farmacia-del-centro-en-el-centro-de-dinan-breta%C3%B1a.jpg?s=612x612&w=0&k=20&c=bSKCa1bELg-BNIkR-oJj_fsRFzdjvoFFxvtq-bQQcW0=",
    "https://media.istockphoto.com/id/1223842708/es/foto/farmacia-o-farmacia-dise%C3%B1o-exterior.jpg?s=612x612&w=0&k=20&c=O2VDBujql7MuWI8YpMQiPaegj5qcAQLJ3gFKOI4yj98=",
    "https://media.istockphoto.com/id/1624805247/es/foto/mobilcom-debitel-shop-en-kiel-alemania.jpg?s=612x612&w=0&k=20&c=wvMXMoGz9KwVKxHB_FhCqmhb09Y98rM0lnisIiQD9gc="
  ];

  useEffect(() => {
    const fetchFarmacias = async () => {
      try {
        const response = await fetch("http://localhost:3000/farmacias");
        const result = await response.json();
        const farmaciasConFotos = result.data.map((farmacia, index) => ({
          ...farmacia,
          photo: farmaciaImages[index % farmaciaImages.length] // Asigna una imagen de manera cíclica
        }));
        setFarmacias(farmaciasConFotos);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las farmacias:", error);
        setLoading(false);
      }
    };

    fetchFarmacias();
  }, []);

  const eliminarFarmacia = async (id) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás recuperar esta farmacia!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        await fetch(`http://localhost:3000/farmacias/${id}`, {
          method: 'DELETE',
        });
        setFarmacias(farmacias.filter(farmacia => farmacia.id !== id));
        Swal.fire(
          'Eliminado!',
          'La farmacia ha sido eliminada.',
          'success'
        );
      }
    } catch (error) {
      console.error("Error al eliminar la farmacia:", error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="barra-superior">
        <h2 className="titulo-section">Nuestras Farmacias</h2>
        <button onClick={() => setShowForm(true)}>Añadir Farmacia</button>
      </div>
      {showForm && <CrearFarmaciaForm onClose={() => setShowForm(false)} />}
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <div className="cards-container">
          {farmacias.map(farmacia => (
            <div key={farmacia.id} className="card">
              <img className="card-image" src={farmacia.photo} alt={farmacia.name} />
              <div className="card-content">
                <h3>{farmacia.name}</h3>
                <p>{farmacia.mail}</p>
                <p>{farmacia.domicilio}</p>
                <button className='btn' onClick={() => eliminarFarmacia(farmacia.id)}>Eliminar</button>
               
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Farmacias;
