import React from 'react';

const links = ['Sobre nós', 'Produtos', 'Encomenda', 'Contato'];

export const NavLinks: React.FC = () => {
  return (
    <nav className="flex space-x-6 text-[#3E3E3E] font-light text-base">
      {links.map((link, index) => (
        <a key={index} href="#" className="hover:underline">
          {link}
        </a>
      ))}
    </nav>
  );
};
