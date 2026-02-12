import React from 'react';
import './cardProducts.css';

interface CardProductsProps {
  image: string;
  title: string;
  description: string;
  price: string;
  category?: string;
}

const CardProducts: React.FC<CardProductsProps> = ({
  image,
  title,
  description,
  price,
  category = 'Bolos',
}) => {
  return (
    <div className="card-products">
      <div className="card-image">
        <img src={image} alt={title} />
        {category && <span className="card-category">{category}</span>}
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <p className="card-price">{price}</p>
          <button className="card-button">Comprar</button>
       
      </div>
    </div>
  );
};

export default CardProducts;
