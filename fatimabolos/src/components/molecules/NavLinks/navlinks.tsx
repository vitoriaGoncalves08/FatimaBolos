import "./navlinks.css";

const links = ['Sobre nós', 'Produtos', 'Encomenda', 'Dúvidas', 'Contato'];

const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
  e.preventDefault();
  
  if (link === 'Sobre nós') {
    const sobreNosSection = document.getElementById('sobre-nos');
    if (sobreNosSection) {
      sobreNosSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

export const NavLinks = () => {
  return (
    <>
      {links.map((link, index) => (
        <a 
          key={index} 
          href={link === 'Sobre nós' ? '#sobre-nos' : '#'}
          onClick={(e) => handleSmoothScroll(e, link)}
        >
          {link}
        </a>
      ))}
    </>
  );
};
