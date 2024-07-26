import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Farmacias from './components/farmacias';
import CrearFarmaciaForm from './components/crearFarmacia'; // Asegúrate de importar el nuevo componente
import './Styles/navBar.css';
import './Styles/farmacias.css';
import './Styles/crearFarmacia.css'; // Importa el CSS para el formulario
import './Styles/btn.css';

const App = () => {
  return (
    <Router>    
      <Routes>
        <Route path="/" element={<Farmacias />} />
        <Route path="/crear-farmacia" element={<CrearFarmaciaForm />} /> {/* Ruta para el formulario */}
      </Routes>
    </Router>
  );
};

export default App;


