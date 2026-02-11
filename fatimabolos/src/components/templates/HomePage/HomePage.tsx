import React from 'react';
import { AboutUs } from '../aboutUs/aboutUs';
import ProductsSection from '../productsSection/productsSection';
import { FaqSection } from '../../organisms/FaqSection/FaqSection';
import { ContactUs } from '../../organisms/ContactUs/ContactUs';
import { CardsBrown } from '../../molecules/CardsBrown/cardsbrown';
import { Footer } from '../../organisms/Footer/Footer';
import { Home } from '../../templates/home/home';
import './homePage.css';

export const HomePage: React.FC = () => {
  return (
    <main className="home-page">
      <section className="hero-section">
        <Home/>
      </section>
      <CardsBrown />
      <AboutUs />
      <ProductsSection />
      <FaqSection />
      <ContactUs />
      <Footer />
    </main>
  );
};
