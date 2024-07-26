import React, { useState } from 'react';
import Swal from 'sweetalert2'; 

const CrearFarmaciaForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/farmacias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, mail, domicilio }),
      });

      if (response.ok) {
        const result = await response.json();
        
   
        Swal.fire({
          title: 'Éxito',
          text: result.message || 'Farmacia creada exitosamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        
            onClose(); 
          
          ; 
      } else {
        const errorResult = await response.json();
        setError(errorResult.message || 'Error al crear farmacia');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setError('Error al enviar el formulario');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Correo Electrónico:
          <input
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            required
          />
        </label>
        <label>
          Domicilio:
          <input
            type="text"
            value={domicilio}
            onChange={(e) => setDomicilio(e.target.value)}
            required
          />
        </label>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Crear Farmacia</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
};

export default CrearFarmaciaForm;
