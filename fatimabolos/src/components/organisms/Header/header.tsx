import { useState } from 'react';
import { Button } from '../../atoms/Buttons/button';
import { NavLinks } from '../../molecules/NavLinks/navlinks';
import Logo from '../../../assets/img/logo-bolo.svg';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { AnimatePresence, motion } from 'framer-motion';
import './header.css';

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

const handleSmoothScrollAndCloseMenu = (elementId: string, setIsMenuOpen: (open: boolean) => void) => {
  handleSmoothScroll(elementId);
  setIsMenuOpen(false);
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="container-header">
      <div className="nav-container">

        <img src={Logo} alt="Fátima Bolos" className="logo" />

        <nav className="links desktop-only">
          <NavLinks />
        </nav>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="mobile-menu animate__slideInDown"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <nav className="links">
                <NavLinks onCloseMenu={() => setIsMenuOpen(false)} />
              </nav>
              <Button 
                variant="default" 
                className="brown mobile-button"
                onClick={() => handleSmoothScrollAndCloseMenu('sobre-nos', setIsMenuOpen)}
              >
                Saiba Mais
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <Button 
          variant="default" 
          className="brown desktop-button"
          onClick={() => handleSmoothScroll('sobre-nos')}
        >
          Saiba Mais
        </Button>

        <Button
          className="hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? (
            <CloseIcon fontSize="large" className="hamburguer-icon" />
          ) : (
            <MenuIcon fontSize="large" className="hamburguer-icon" />
          )}
        </Button>
      </div>
    </header>
  );
};
