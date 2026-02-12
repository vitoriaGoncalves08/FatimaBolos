import { TitleHome } from '../../atoms/TitleHome/titlehome';
import ImageHome from '../../../assets/img/image-home-no-line.svg';
import ImageLine from '../../../assets/img/image-home-line.svg';
import './home.css';
import { Button } from '../../atoms/Buttons/button';

const handleSmoothScroll = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    const headerHeight = 80; // Account for fixed header height
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export const Home = () => {
  return (
    <section className='container-home'>
      <div className='left-content'>
        <div className="title">
          <TitleHome />
        </div>
        <p className='description'>
          Fátima Bolos, onde o carinho vira receita e o sabor vira lembrança, cada receita é feita a sua escolha, selecionando os melhores ingredientes para entregar um sabor que realmente faz a diferença.
        </p>
        <Button 
          variant="default" 
          className="pink"
          onClick={() => handleSmoothScroll('produtos')}
        >
          Ver Produtos
        </Button>
      </div>
      <div className='right-content'>
        <div className="image-container">
          <img src={ImageLine} alt="Linha decorativa" className="cake-line" />
          <img src={ImageHome} alt="Bolo Fátima Bolos" className="cake-image" />
        </div>
      </div>
    </section>
  );
};