import React from 'react';
import "./navlinks.css";

const links = ['Sobre nós', 'Produtos', 'Encomenda', 'Dúvidas', 'Contato'];

export const NavLinks: React.FC = () => {
  return (
    <>
      {links.map((link, index) => (
        <a key={index} href="#">
          {link}
        </a>
      ))}
    </>
  );
};
