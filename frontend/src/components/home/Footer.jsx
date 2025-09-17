// src/components/Footer.jsx

import React from 'react';
import '@/styles/Footer.scss'; // Asegúrate de que la ruta esté bien desde donde lo llames

const Footer = () => {
  return (
    <footer className="sticky-footer">
      <p>© {new Date().getFullYear()} ReminderE - Todos los derechos reservados</p>
    </footer>
  );
};

export default Footer;