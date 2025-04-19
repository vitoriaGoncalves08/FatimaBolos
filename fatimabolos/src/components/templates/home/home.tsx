import React from 'react';
import { TitleHome } from '../../atoms/TitleHome/titlehome';
import ImageLogo from '../../../assets/img/image-home.svg';
import './home.css';

export const Home: React.FC = () => {
  return (
    <section className='container-home'>      
      <div className='right-content'>
        <TitleHome />
        <p className='description'>
          Na Fátima Bolos, cada receita é feita com carinho, selecionando os melhores ingredientes para entregar um sabor que realmente faz a diferença.
        </p>
        <button className='cta-button'>
          Ver Produtos
        </button>
      </div>
      <div className='left-content'>
        <img src={ImageLogo} alt="Fátima Bolos" className="cake-image" />
      </div>
    </section>
  );
};