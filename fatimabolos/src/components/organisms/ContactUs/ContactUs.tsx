import React, { useState } from 'react';
import { Button } from '../../atoms/Buttons/button';
import { Title } from '../../atoms/Title/title';
import iconEmail from '../../../assets/img/icon-email.png';
import iconZap from '../../../assets/img/icon-zap.png';
import './contactUs.css';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ToastMessage {
  show: boolean;
  message: string;
  type: 'redirect' | 'success' | 'error';
}

export const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });

  const [toast, setToast] = useState<ToastMessage>({
    show: false,
    message: '',
    type: 'redirect'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showToast = (message: string, type: 'redirect' | 'success' | 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'redirect' });
    }, 3000);
  };

  const handleEmailSubmit = () => {
    if (!validateEmail(formData.email)) {
      showToast('Por favor, insira um e-mail válido', 'error');
      return;
    }

    showToast('Você será redirecionado para o e-mail', 'redirect');
    
    setTimeout(() => {
      const subject = encodeURIComponent('Contato via site - Fátima Bolos');
      const body = encodeURIComponent(
        `Nome: ${formData.name}\nE-mail: ${formData.email}\n\nMensagem:\n${formData.message}`
      );
      window.location.href = `mailto:contato@fatimabolos.com.br?subject=${subject}&body=${body}`;
      
      // Clear form after redirection
      setFormData({ name: '', email: '', message: '' });
      showToast('Redirecionado com sucesso', 'success');
    }, 2000);
  };

  const handleWhatsAppSubmit = () => {
    if (!validateEmail(formData.email)) {
      showToast('Por favor, insira um e-mail válido', 'error');
      return;
    }

    showToast('Você será redirecionado para o WhatsApp', 'redirect');
    
    setTimeout(() => {
      const message = encodeURIComponent(
        `*Contato via site - Fátima Bolos*\n\n*Nome:* ${formData.name}\n*E-mail:* ${formData.email}\n\n*Mensagem:*\n${formData.message}`
      );
      window.open(`https://wa.me/5511943658985?text=${message}`, '_blank');
      
      // Clear form after redirection
      setFormData({ name: '', email: '', message: '' });
      showToast('Redirecionado com sucesso', 'success');
    }, 2000);
  };

  const isFormValid = formData.name && formData.email && formData.message;

  return (
    <section className="contact-us-section" id="contato">
      <div className="contact-us-container">
        <div className='contact-header'>
          <Title title="Contato" id="contato-titulo" />
          <h3 className="contact-subtitle-h3">
            Ficou alguma dúvida?
          </h3>
          <p className="contact-subtitle">
            Mande mensagem pelo nosso e-mail ou whatsapp!
          </p>
        </div>
      
        <div className="contact-form-wrapper">
          <div className="contact-form-content">            
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Digite seu nome"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Digite seu e-mail"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Mensagem</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Digite sua mensagem"
                  rows={5}
                  required
                />
              </div>
              
              <div className="form-buttons">
                <Button
                  variant="default"
                  className="btn-email"
                  onClick={handleEmailSubmit}
                  disabled={!isFormValid}
                >
                  <img src={iconEmail} alt="E-mail" className="btn-icon-img" />
                  Enviar E-mail
                </Button>
                
                <Button
                  variant="default"
                  className="btn-whatsapp"
                  onClick={handleWhatsAppSubmit}
                  disabled={!isFormValid}
                >
                  <img src={iconZap} alt="WhatsApp" className="btn-icon-img" />
                  Enviar Whatsapp
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        {toast.show && (
          <div className={`toast toast-${toast.type}`}>
            {toast.message}
          </div>
        )}
      </div>
    </section>
  );
};
