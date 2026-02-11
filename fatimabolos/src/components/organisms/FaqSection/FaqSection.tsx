import React, { useState } from 'react';
import { FaqItem } from '../../molecules/FaqItem/FaqItem';
import logoFb from '../../../assets/img/logo-fb.svg';
import { Title } from '../../atoms/Title/title';
import './faqSection.css';

interface FaqData {
  id: number;
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const faqData: FaqData[] = [
    {
      id: 1,
      question: 'Qual meio de pagamento é aceito?',
      answer: 'Pix, Dinheiro, Cartão de Crédito e Débito são aceitos.'
    },
    {
      id: 2,
      question: 'Quanto tempo para ficar pronto?',
      answer: 'O pedido deve ser feito pelo menos 3 dias antes da entrega.'
    },
    {
      id: 3,
      question: 'Tem topo para bolo?',
      answer: 'São feitos topos personalizados com nome e personagens escolhidos na última etapa da encomenda.'
    },
    {
      id: 4,
      question: 'Como é feita a entrega?',
      answer: 'A retirada pode ser feita na confeitaria na Zona Leste de SP, ou pode ser combinada a entrega na residência ou entrega contratada.'
    },
    {
      id: 5,
      question: 'Como entrar em contato?',
      answer: 'Entre em contato via WhatsApp ou e-mail para feedbacks ou pedidos.'
    }
  ];

  const toggleItem = (id: number) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <section className="faq-section" id="duvidas">
      <div className="faq-container">
        <div className="faq-header">
          <img src={logoFb} alt="Fátima Bolos Logo" className="faq-logo-fb" />
          <Title title="Dúvidas frequentes" id="duvidas-frequentes" />
        </div>
        
        <div className="faq-list">
          {faqData.map((item) => (
            <FaqItem
              key={item.id}
              id={item.id}
              question={item.question}
              answer={item.answer}
              isActive={activeItem === item.id}
              onClick={() => toggleItem(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
