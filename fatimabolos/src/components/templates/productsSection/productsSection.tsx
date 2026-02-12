import React from 'react';
import CardProducts from '../../molecules/CardProducts/CardProducts';
import './productsSection.css';
import { Title } from '../../atoms/Title/title';
import boloFestaLaco from '../../../assets/img/bolos/laco.svg';
import boloFestaBorboleta from '../../../assets/img/bolos/bolo-festa-borboleta.png';
import boloFestaNinho from '../../../assets/img/bolos/bolo-festa-ninho.png';
import boloPoteChocolate from '../../../assets/img/bolos/bolo-pode-chocolate.png';
import boloInfantil from '../../../assets/img/bolos/tematico-infantil.png';
import salgadinhoFesta from '../../../assets/img/bolos/salgados.png';
import tortaLimao from '../../../assets/img/bolos/torta-limao-sem.png';
import boloChocolate from '../../../assets/img/bolos/chocolate.png';
import boloAdulto from '../../../assets/img/bolos/adulto2.png';
import boloBasico from '../../../assets/img/bolos/simples.png';

interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
  price: string;
  category?: string;
}

const ProductsSection: React.FC = () => {
  // Mock data - replace with your actual data source
  const products: Product[] = [
    {
      id: 1,
      image: boloFestaLaco,
      title: 'Bolo de Côco',
      description: 'Delicioso bolo de côco cremoso com leite condensado.',
      price: '3kg',
      category: 'Festa'
    },
    {
      id: 2,
      image: boloFestaBorboleta,
      title: 'Bolo de Morango',
      description: 'Bolo de baunilha com recheio de morango e leite ninho.',
      price: '3kg',
      category: 'Festa',
    },
    {
      id: 3,
      image: boloFestaNinho,
      title: 'Bolo de Ninho',
      description: 'Bolo de leite ninho que pode acompanhar frutas a escolha.',
      price: '5kg',
      category: 'Festa'
    },
    {
      id: 7,
      image: boloBasico,
      title: 'Bolo com Papel Arroz',
      description: 'Bolo básico ou com papel arroz de vários sabores.',
      price: '2,5kg',
      category: 'Festa'
    },
    {
      id: 5,
      image: boloChocolate,
      title: 'Bolo de Chocolate',
      description: 'Bolo de chocolate para festa com recheio a gosto.',
      price: '4,5kg',
      category: 'Festa'
    },
    {
      id: 6,
      image: boloAdulto,
      title: 'Bolo Adulto',
      description: 'Bolo temático com topper adulto, vários sabores.',
      price: '3,5kg',
      category: 'Festa'
    },
     {
      id: 4,
      image: boloInfantil,
      title: 'Bolo Infantil',
      description: 'Bolo com topper de tema infantil, vários sabores.',
      price: '5kg',
      category: 'Festa'
    },
    {
      id: 8,
      image: boloPoteChocolate,
      title: 'Bolo de Pote',
      description: 'Bolo de chocolate, com calda de chocolate e granulado.',
      price: '300g',
      category: 'Festa'
    },
    {
      id: 9,
      image: salgadinhoFesta,
      title: 'Salgados de Festa',
      description: 'Mini salgados para festa, sortidos e a escolha.',
      price: 'Cento - R$60',
      category: 'Salgados'
    },
    {
      id: 10,
      image: tortaLimao,
      title: 'Torta de limão',
      description: 'Torta de limão e banoffe de tamanhos pequeno e grande.',
      price: '1,5kg',
      category: 'Tortas'
    },
  ];

  return (
    <section className="products-section" id="produtos">
      <div className="container">
        <div className="section-header">
          <Title title="Nossos Produtos" id="nossos-produtos" />
          <p className="section-subtitle">Conheça nossas delícias feitas com carinho</p>
        </div>
        
        <div className="products-grid">
          {products.map((product) => (
            <CardProducts
              key={product.id}
              image={product.image}
              title={product.title}
              description={product.description}
              price={product.price}
              category={product.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
