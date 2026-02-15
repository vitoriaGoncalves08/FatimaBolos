import { useEffect } from 'react';
import { Header } from './components/organisms/Header/header';
import { HomePage } from './components/templates/HomePage/HomePage';

function App() {
  useEffect(() => {
    const scrollToHash = (hash: string) => {
      const id = hash.replace('#', '');
      if (!id) return;

      const el = document.getElementById(id);
      if (!el) return;

      const headerHeight = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    };

    const handleHashChange = () => {
      scrollToHash(window.location.hash);
    };

    const initialHash = window.location.hash;
    if (initialHash) {
      window.setTimeout(() => scrollToHash(initialHash), 0);
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      <Header/>
      <HomePage />
    </>
  )
}

export default App
