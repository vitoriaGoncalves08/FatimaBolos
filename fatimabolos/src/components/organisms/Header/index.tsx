import React from 'react';
import { NavLinks } from '../../molecules/NavLinks';
import { Button } from '../../atoms/Buttons';
import Logo from '../../../assets/img/Logo.svg';

export const Header: React.FC = () => {
  return (
    <header className="bg-[#fdf1ea] py-4 px-8 flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <img src={Logo} alt="Fátima Bolos" className="h-10" />
        <NavLinks />
      </div>
      <Button>Saiba Mais</Button>
    </header>
  );
};
