import React from 'react';
import waveFooter from '../../../assets/img/wave-footer.svg';
import logoFooter from '../../../assets/img/Logo.png';
import './footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-wave">
        <img src={waveFooter} alt="Wave Footer" className="wave-img" />
      </div>
      
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logoFooter} alt="Fátima Bolos Logo" className="footer-logo-img" />
        </div>
        
        <div className="footer-info">
          <div className="footer-address">
            <p className="footer-text">
              Rua Maritaca, 69 - São Paulo, Zona Leste
            </p>
          </div>
          
          <div className="footer-copyright">
            <p className="footer-copyright-text">
              © 2025 Fátima Bolos. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
