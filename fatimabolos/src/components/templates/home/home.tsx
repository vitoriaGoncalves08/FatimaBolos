import React from 'react';
import { TitleHome } from '../../atoms/TitleHome/titlehome';
import ImageLogo from '../../../assets/img/image-home.svg';
import './home.css';
import { Button } from '../../atoms/Buttons/button';

export const Home: React.FC = () => {
  return (
    <section className='container-home'>
      <div className='left-content'>
        <div className="title">
          <TitleHome />
        </div>
        <p className='description'>
          Fátima Bolos, onde o carinho vira receita e o sabor vira lembrança, cada receita é feita a sua escolha, selecionando os melhores ingredientes para entregar um sabor que realmente faz a diferença.
        </p>
        <Button variant="default" className="pink">
          Ver Produtos
        </Button>
      </div>
      <div className='right-content'>
        <img src={ImageLogo} alt="Fátima Bolos" className="cake-image" />
      </div>
    </section>
  );
};