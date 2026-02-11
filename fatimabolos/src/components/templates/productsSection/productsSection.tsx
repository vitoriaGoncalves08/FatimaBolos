import React from 'react';
import CardProducts from '../../molecules/CardProducts/CardProducts';
import './productsSection.css';
import { Title } from '../../atoms/Title/title';
import boloFestaLaco from '../../../assets/img/bolo-festa-laço.png';
import boloFestaBorboleta from '../../../assets/img/bolo-festa-borboleta.png';
import boloFestaNinho from '../../../assets/img/bolo-festa-ninho.png';
import boloPodeChocolate from '../../../assets/img/bolo-pode-chocolate.png';

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
      title: 'Bolo de Chocolate',
      description: 'Delicioso bolo de chocolate com cobertura de ganache e morangos frescos.',
      price: '2kg',
      category: 'Festa'
    },
    {
      id: 2,
      image: boloFestaBorboleta,
      title: 'Bolo de Cenoura',
      description: 'Bolo de cenoura fofinho com cobertura de chocolate meio amargo.',
      price: 'R$ 39,90',
      category: 'Festa',
    },
    {
      id: 3,
      image: boloFestaNinho,
      title: 'Bolo de Ninho',
      description: 'Bolo de limão com recheio de mousse de limão e merengue italiano.',
      price: '5kg',
      category: 'Festa'
    },
    {
      id: 4,
      image: boloPodeChocolate,
      title: 'Bolo de Pote',
      description: 'Bolo branco com recheio de creme de baunilha e morangos frescos.',
      price: '300g',
      category: 'Festa'
    },
     {
      id: 5,
      image: boloFestaLaco,
      title: 'Bolo Red Velvet',
      description: 'Bolo Red Velvet com cream cheese frosting e decorado com migalhas.',
      price: 'R$ 55,90',
      category: 'Festa'
    },
    {
      id: 6,
      image: boloFestaBorboleta,
      title: 'Bolo de Coco',
      description: 'Bolo de coco com cobertura de coco ralado e recheio cremoso.',
      price: 'R$ 42,90',
      category: 'Festa'
    },
    {
      id: 7,
      image: boloFestaNinho,
      title: 'Bolo Prestígio',
      description: 'Bolo de chocolate com recheio de coco e cobertura de brigadeiro.',
      price: 'R$ 47,90',
      category: 'Festa'
    },
    {
      id: 8,
      image: boloPodeChocolate,
      title: 'Bolo de Maracujá',
      description: 'Bolo de maracujá com recheio de mousse e calda da fruta.',
      price: 'R$ 44,90',
      category: 'Festa'
    },
    {
      id: 9,
      image: boloFestaLaco,
      title: 'Bolo Formigueiro',
      description: 'Bolo de chocolate com cobertura e recheio de brigadeiro com granulado.',
      price: 'R$ 41,90',
      category: 'Festa'
    },
    {
      id: 10,
      image: boloFestaBorboleta,
      title: 'Bolo de Fubá',
      description: 'Bolo de fubá cremoso com goiabada e queijo ralado.',
      price: 'R$ 38,90',
      category: 'Festa'
    },
  ];

  return (
    <section className="products-section" id="produtos">
      <div className="container">
        <div className="section-header">
          <Title title="Nossos Produtos" id="nossos-produtos" />
          <p className="section-subtitle">Conheça nossos deliciosos Festa feitos com carinho</p>
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
