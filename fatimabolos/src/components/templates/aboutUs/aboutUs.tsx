import ImageAboutUs from '../../../assets/img/image-about-us.svg';
import { Title } from '../../atoms/Title/title';
import './aboutUs.css';

export const AboutUs = () => {
  return (
    <>
      <Title title="Sobre nós" id="sobre-nos" />
      <section id="sobre-nos" className='about-section'>
        <div className='about-container'>
          <div className='about-content'>
            <div className='about-text'>
            <p className='about-description'>
              Desde 2000, a Fátima Bolos leva sabor e carinho para cada momento especial. Nossos bolos são feitos com ingredientes selecionados, garantindo um gostinho caseiro irresistível.
            </p>
            <p className='about-description'>
              Além dos bolos, oferecemos <span className='highlight'>salgadas</span>, <span className='highlight'>salgados</span> tradicionais como <span className='highlight'>coxinha</span>, <span className='highlight'>bolinho de queijo</span>, <span className='highlight'>pastel</span>, <span className='highlight'>kibe</span>, <span className='highlight'>risole</span> e <span className='highlight'>enroladinho de salsicha</span>, em tamanhos para festas ou consumo pessoal. Também temos <span className='highlight'>bolo de pote</span>, <span className='highlight'>pudim</span>, <span className='highlight'>manjar</span> e outras sobremesas deliciosas.
            </p>
            <p className='about-description'>
              Com dedicação e qualidade, transformamos cada mordida em uma experiência inesquecível.
            </p>
          </div>
          <div className='about-image'>
            <img src={ImageAboutUs} alt="Bolo Fátima Bolos" className="about-cake-image" />
          </div>
        </div>
        </div>
      </section>
    </>
  );
};