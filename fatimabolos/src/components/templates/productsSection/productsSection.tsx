import React from 'react';
import CardProducts from '../../molecules/CardProducts/CardProducts';
import './productsSection.css';

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
      image: '/path-to-image-1.jpg', // Replace with actual image path
      title: 'Bolo de Chocolate',
      description: 'Delicioso bolo de chocolate com cobertura de ganache e morangos frescos.',
      price: 'R$ 45,90',
      category: 'Bolos'
    },
    {
      id: 2,
      image: '/path-to-image-2.jpg',
      title: 'Bolo de Cenoura',
      description: 'Bolo de cenoura fofinho com cobertura de chocolate meio amargo.',
      price: 'R$ 39,90',
      category: 'Bolos'
    },
    {
      id: 3,
      image: '/path-to-image-3.jpg',
      title: 'Bolo de Limão',
      description: 'Bolo de limão com recheio de mousse de limão e merengue italiano.',
      price: 'R$ 49,90',
      category: 'Bolos'
    },
    {
      id: 4,
      image: '/path-to-image-4.jpg',
      title: 'Bolo de Morango',
      description: 'Bolo branco com recheio de creme de baunilha e morangos frescos.',
      price: 'R$ 52,90',
      category: 'Bolos'
    },
  ];

  return (
    <section className="products-section" id="produtos">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Nossos Produtos</h2>
          <p className="section-subtitle">Conheça nossos deliciosos bolos feitos com carinho</p>
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
