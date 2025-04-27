import Wave from '../../../assets/img/wave.svg';
import { Cake, Verified, EmojiEvents } from '@mui/icons-material';
import './wavebrown.css';

export const Wavebrown = () => {
  return (
    <div className='container-card-brown'>
      {/* Imagem wave como fundo completo */}
      <img 
        src={Wave} 
        alt="Onda decorativa" 
        className='wave-background'
      />
      
      {/* Container dos cards */}
      <div className='cards'>
        {/* Card Sabor */}
        <div className='card-brown'>
          <div className="card-content">
            <Cake className='card-icons'/>
            <h3 className='card-title'>Sabor</h3>
            <p className='card-text'>Não é só um bolo, é uma experiência! Nossas receitas são feitas para ter felicidade a cada mordida.</p>
          </div>
        </div>
        
        {/* Card Confiança */}
        <div className='card-brown'>
          <div className="card-content">
            <Verified className='card-icons'/>
            <h3 className='card-title'>Confiança</h3>
            <p className='card-text'>Cada produto é feito com dedicação e transparência, sempre priorizando qualidade, higiene.</p>
          </div>
        </div>
        
        {/* Card Qualidade */}
        <div className='card-brown'>
          <div className="card-content">
            <EmojiEvents className='card-icons'/>
            <h3 className='card-title'>Qualidade</h3>
            <p className='card-text'>Cada produto é preparado com ingredientes selecionados e um cuidado especial em cada detalhe.</p>
          </div>
        </div>
      </div>
    </div>
  );
};