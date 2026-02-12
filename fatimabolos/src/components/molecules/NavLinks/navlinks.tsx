import "./navlinks.css";

interface NavLinksProps {
  onCloseMenu?: () => void;
}

const links = ['Sobre nós', 'Produtos', 'Encomenda', 'Dúvidas', 'Contato'];

const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, link: string, onCloseMenu?: () => void) => {
  e.preventDefault();
  
  const sectionIds: { [key: string]: string } = {
    'Sobre nós': 'sobre-nos',
    'Produtos': 'produtos',
    'Encomenda': 'encomenda',
    'Dúvidas': 'duvidas',
    'Contato': 'contato'
  };
  
  const sectionId = sectionIds[link];
  if (sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = -100; // Account for fixed header height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
  
  // Close mobile menu if onCloseMenu callback is provided
  if (onCloseMenu) {
    onCloseMenu();
  }
};

export const NavLinks: React.FC<NavLinksProps> = ({ onCloseMenu }) => {
  return (
    <>
      {links.map((link, index) => {
        const sectionIds: { [key: string]: string } = {
          'Sobre nós': 'sobre-nos',
          'Produtos': 'produtos',
          'Encomenda': 'encomenda',
          'Dúvidas': 'duvidas',
          'Contato': 'contato'
        };
        
        return (
          <a 
            key={index} 
            href={`#${sectionIds[link]}`}
            onClick={(e) => handleSmoothScroll(e, link, onCloseMenu)}
          >
            {link}
          </a>
        );
      })}
    </>
  );
};
