import React, { useEffect, useRef, useState } from 'react';
import { Title } from '../../atoms/Title/title';
import { Button } from '../../atoms/Buttons/button';
import './orderForm.css';
import CalendarIcon from '../../../assets/img/Calendar.svg';
import HardDrivesIcon from '../../../assets/img/HardDrives.svg';
import VectorIcon from '../../../assets/img/Vector.svg';
import BoloIcon from '../../../assets/img/Bolo.svg';
import IceCreamIcon from '../../../assets/img/IceCream.svg';
import PlusIcon from '../../../assets/img/Plus.svg';
import LogoFb from '../../../assets/img/logo-fb.svg';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  CAKE_MASSA_PRICE_PER_KG,
  DELICIAS_COLUMNS,
  FILLING_BUILD,
  FILLING_COMBOS,
  PASTEL_FLAVORS,
  PASTEL_OPTIONS,
  PRICES,
  SALGADOS_COLUMNS,
  TIME_SLOTS,
} from './orderFormData';

interface OrderData {
  date: Date | null;
  time: string;
  cakes: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  savories: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    unit?: string;
  }>;
  pastelFlavors: Record<string, Record<string, number>>;
  base: {
    massa: string;
    formato: string;
    tamanhoKg: string;
  };
  fillings: string[];
  adicionais: {
    theme: string;
    topper: string;
    delivery: {
      address: string;
      number: string;
      complement: string;
    };
    customerName: string;
  };
  observations: string;
}

export const OrderForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const orderSectionRef = useRef<HTMLElement | null>(null);
  const [isOrderSectionInView, setIsOrderSectionInView] = useState(true);
  const [isCartSummaryOpen, setIsCartSummaryOpen] = useState(false);
  const cartSummaryRef = useRef<HTMLDivElement | null>(null);

  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'error' }>(
    {
      show: false,
      message: '',
      type: 'error',
    }
  );
  
  const [orderData, setOrderData] = useState<OrderData>({
    date: null,
    time: '',
    cakes: [],
    savories: [],
    pastelFlavors: {},
    base: {
      massa: '',
      formato: '',
      tamanhoKg: '',
    },
    fillings: [],
    adicionais: {
      theme: '',
      topper: '',
      delivery: {
        address: '',
        number: '',
        complement: '',
      },
      customerName: '',
    },
    observations: ''
  });

  const steps = [
    { id: 0, icon: CalendarIcon, label: 'Data e Hora' },
    { id: 1, icon: HardDrivesIcon, label: 'Delícias' },
    { id: 2, icon: VectorIcon, label: 'Salgados' },
    { id: 3, icon: BoloIcon, label: 'Base do bolo' },
    { id: 4, icon: IceCreamIcon, label: 'Recheio' },
    { id: 5, icon: PlusIcon, label: 'Adicionais' },
  ];

  const setItemQuantity = (
    field: 'cakes' | 'savories',
    item: { id: string; name: string; price: number; unit?: string },
    nextQuantity: number
  ) => {
    const cleanQuantity = Math.max(0, nextQuantity);
    setOrderData(prev => {
      const list = prev[field] as Array<any>;
      const filtered = list.filter((x: any) => x.id !== item.id);
      const updated = cleanQuantity > 0 ? [...filtered, { ...item, quantity: cleanQuantity }] : filtered;
      return { ...prev, [field]: updated } as OrderData;
    });
  };

  const setPastelFlavorQuantity = (pastelId: string, flavor: string, nextQuantity: number) => {
    const cleanQuantity = Math.max(0, nextQuantity);
    setOrderData(prev => {
      const prevPastel = prev.pastelFlavors[pastelId] ?? {};
      const nextPastel = { ...prevPastel, [flavor]: cleanQuantity };
      return {
        ...prev,
        pastelFlavors: {
          ...prev.pastelFlavors,
          [pastelId]: nextPastel,
        },
      };
    });
  };

  const timeSlots = TIME_SLOTS;

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleDateSelect = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Only allow future dates
    if (date >= today) {
      setSelectedDate(date);
      updateOrderData('date', date);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    updateOrderData('time', time);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateOrderData = (field: keyof OrderData, value: any) => {
    setOrderData(prev => ({ ...prev, [field]: value }));
  };

  const calculateTotal = () => {
    const cakesTotal = orderData.cakes.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const savoriesTotal = orderData.savories.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const sizeKg = Number(orderData.base.tamanhoKg || 0);
    const hasCakeBaseStarted = Boolean(orderData.base.massa || orderData.base.formato || orderData.base.tamanhoKg);
    const massaPricePerKg = orderData.base.massa ? CAKE_MASSA_PRICE_PER_KG[orderData.base.massa] : undefined;
    const massaTotal = hasCakeBaseStarted && sizeKg > 0 && massaPricePerKg ? sizeKg * massaPricePerKg : 0;
    // Removido: fillingsTotal - recheios não têm custo adicional
    const topperTotal = orderData.adicionais.topper?.trim() ? PRICES.topper : 0;

    return cakesTotal + savoriesTotal + massaTotal + topperTotal;
  };

  const hasCakeBaseStarted = Boolean(orderData.base.massa || orderData.base.formato || orderData.base.tamanhoKg);
  const isCakeBaseComplete = !hasCakeBaseStarted
    ? true
    : Boolean(orderData.base.massa && orderData.base.formato && orderData.base.tamanhoKg);

  const deliveryStarted = Boolean(
    orderData.adicionais.delivery.address?.trim() ||
      orderData.adicionais.delivery.number?.trim() ||
      orderData.adicionais.delivery.complement?.trim()
  );
  const isDeliveryComplete = !deliveryStarted
    ? true
    : Boolean(
        orderData.adicionais.delivery.address?.trim() &&
          orderData.adicionais.delivery.number?.trim() &&
          orderData.adicionais.delivery.complement?.trim()
      );

  const nextDisabledReason = (() => {
    if (currentStep === 0 && (!selectedDate || !selectedTime)) {
      if (!selectedDate && !selectedTime) return 'Selecione a data e o horário.';
      if (!selectedDate) return 'Selecione a data.';
      return 'Selecione o horário.';
    }

    if (currentStep === 3) {
      if (!isCakeBaseComplete) return 'Complete a base do bolo (massa, formato e tamanho).';
      if (hasCakeBaseStarted && !orderData.adicionais.theme.trim()) return 'Informe o tema do bolo.';
    }

    if (currentStep === 4 && hasCakeBaseStarted && orderData.fillings.length === 0) {
      return 'Selecione o recheio do bolo.';
    }

    if (currentStep === 5) {
      if (deliveryStarted && !isDeliveryComplete) return 'Complete todos os campos de entrega ou deixe todos vazios.';
      if (!orderData.adicionais.customerName.trim()) return 'Informe seu nome.';
    }

    return '';
  })();

  const isNextDisabled = Boolean(nextDisabledReason);

  const whatsappDisabledReason = (() => {
    if (!selectedDate || !selectedTime) return 'Selecione data e horário.';
    if (deliveryStarted && !isDeliveryComplete) return 'Complete todos os campos de entrega ou deixe todos vazios.';
    if (!orderData.adicionais.customerName.trim()) return 'Informe seu nome.';
    if (orderData.cakes.length === 0 && orderData.savories.length === 0) return 'Adicione pelo menos 1 item (delícias ou salgados).';
    if (hasCakeBaseStarted && !isCakeBaseComplete) return 'Complete a base do bolo (massa, formato e tamanho).';
    if (hasCakeBaseStarted && orderData.fillings.length === 0) return 'Selecione o recheio do bolo.';
    if (hasCakeBaseStarted && !orderData.adicionais.theme.trim()) return 'Informe o tema do bolo.';
    return '';
  })();

  const isWhatsAppDisabled = Boolean(whatsappDisabledReason);

  const showToast = (message: string) => {
    setToast({ show: true, message, type: 'error' });
    window.setTimeout(() => {
      setToast({ show: false, message: '', type: 'error' });
    }, 2800);
  };

  const getTotalItems = () => {
    const cakesCount = orderData.cakes.reduce((sum, item) => sum + item.quantity, 0);
    const savoriesCount = orderData.savories.reduce((sum, item) => sum + item.quantity, 0);
    return cakesCount + savoriesCount;
  };

  useEffect(() => {
    if (!isCartSummaryOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartSummaryOpen(false);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (cartSummaryRef.current && !cartSummaryRef.current.contains(target)) {
        setIsCartSummaryOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isCartSummaryOpen]);

  useEffect(() => {
    const section = orderSectionRef.current ?? document.getElementById('encomenda');
    if (!section) return;

    orderSectionRef.current = section as HTMLElement;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOrderSectionInView(Boolean(entry?.isIntersecting));
      },
      {
        root: null,
        threshold: 0.25,
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // const scrollToOrderSection = () => {
  //   const section = orderSectionRef.current ?? document.getElementById('encomenda');
  //   if (!section) return;

  //   const headerHeight = 80;
  //   const top = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
  //   window.scrollTo({ top, behavior: 'smooth' });
  // };

  const generateWhatsAppMessage = () => {
    const pastelLines = (() => {
      const pastels = [
        { id: 'sal-mini-pas', label: 'Pastel (Cento)' },
        { id: 'sal-pad-pas', label: 'Pastel (Uni.)' },
      ];

      const blocks = pastels
        .map((p) => {
          const item = orderData.savories.find((x) => x.id === p.id);
          if (!item || item.quantity <= 0) return '';

          const flavors = orderData.pastelFlavors[p.id] ?? {};
          const selected = Object.entries(flavors)
            .filter(([, qty]) => (qty ?? 0) > 0)
            .map(([name, qty]) => `  - ${name}: ${qty}`);

          if (selected.length === 0) return `- ${p.label}: ${item.quantity} (sabores não informados)`;

          return `- ${p.label}: ${item.quantity}\n${selected.join('\n')}`;
        })
        .filter(Boolean);

      return blocks.length ? `\n🥟 *Sabores do pastel:*\n${blocks.join('\n')}` : '';
    })();

    const message = `
*NOVA ENCOMENDA - FÁTIMA BOLOS*

📅 *Data e Horário:*
${orderData.date ? orderData.date.toLocaleDateString('pt-BR') : 'Não selecionado'} às ${orderData.time || 'Não selecionado'}

👤 *Cliente:*
Nome: ${orderData.adicionais.customerName || 'Não informado'}

🚚 *Entrega (opcional):*
${orderData.adicionais.delivery.address ? `Endereço: ${orderData.adicionais.delivery.address}, ${orderData.adicionais.delivery.number || 's/n'}${orderData.adicionais.delivery.complement ? ` - ${orderData.adicionais.delivery.complement}` : ''}` : 'Retirada / não informado'}

*Delícias (tortas, pudim, bolo de pote):*
${orderData.cakes.length > 0 ? orderData.cakes.map(cake => `- ${cake.name} (${cake.quantity}x) - R$ ${cake.price.toFixed(2)}`).join('\n') : 'Nenhum'}

🥟 *Salgados:*
${orderData.savories.length > 0 ? orderData.savories.map(item => `- ${item.name} (${item.quantity}x) - R$ ${item.price.toFixed(2)}`).join('\n') : 'Nenhum'}
${pastelLines}

*Bolo (base):*
Massa: ${orderData.base.massa || 'Não selecionado'}
Formato: ${orderData.base.formato || 'Não selecionado'}
Tamanho: ${orderData.base.tamanhoKg ? `${orderData.base.tamanhoKg} kg` : 'Não selecionado'}

🍫 *Recheio:*
${orderData.fillings.length ? orderData.fillings.join(', ') : 'Não selecionado'}

🎨 *Tema do bolo:*
${orderData.adicionais.theme || 'Não informado'}

🎂 *Topo do bolo (opcional):*
${orderData.adicionais.topper || 'Não informado'}

📝 *Observações:*
${orderData.observations || 'Nenhuma'}

💰 *Total: R$ ${calculateTotal().toFixed(2)}*
    `.trim();
    
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/5511941117140?text=${encodedMessage}`;
  };

  
  const renderCalendarDays = () => {
    const totalDays = daysInMonth(currentMonth);
    const firstDay = firstDayOfMonth(currentMonth);
    const days = [];

    // Adjust for Sunday as first day (0 = Sunday)
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

    // Fill leading empty days
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Fill actual days
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
      const isToday = date.toDateString() === new Date().toDateString();
      const isPast = date.getTime() < new Date().setHours(0, 0, 0, 0);

      days.push(
        <div
          key={i}
          className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''} ${isPast ? 'disabled' : ''}`}
          onClick={() => !isPast && handleDateSelect(i)}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const currentMonthName = monthNames[currentMonth.getMonth()];
  const currentYear = currentMonth.getFullYear();

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <section className="order-form-section" id="encomenda" ref={orderSectionRef}
    >
      <div className="order-form-container">
        <div className="order-header">
          <Title title="Encomenda" id="encomenda-titulo" />
        </div>

        {/* Progress Menu with Icons */}
        <div className="progress-menu">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`progress-item ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'done' : ''}`}
            >
              <div className="progress-icon">
                <img src={step.icon} alt={step.label} />
              </div>
              {index < steps.length - 1 && <div className="progress-line"></div>}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="order-content">
          {currentStep === 0 && (
            <div className="step-content">
              <h3>Selecione a data e horário</h3>
              
              <div className="datetime-layout">
                {/* Calendar */}
                <div className="calendar-container">
                  <div className="calendar-header">
                    <button className="calendar-nav" onClick={handlePrevMonth}>
                      ‹
                    </button>
                    <h4>{currentMonthName} {currentYear}</h4>
                    <button className="calendar-nav" onClick={handleNextMonth}>
                      ›
                    </button>
                  </div>
                  
                  <div className="calendar-weekdays">
                    {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(day => (
                      <div key={day} className="calendar-weekday">{day}</div>
                    ))}
                  </div>
                  
                  <div className="calendar-days">
                    {renderCalendarDays()}
                  </div>
                </div>

                {/* Time Selection and Selected Items */}
                <div className="time-and-selection">
                  <div className="time-selection">
                    <h4>Selecione o horário</h4>
                    <select 
                      className="time-select"
                      value={selectedTime}
                      onChange={(e) => handleTimeSelect(e.target.value)}
                    >
                      <option value="">Selecione um horário</option>
                      {timeSlots.map((time) => {
                        const isPastTime = selectedDate ? 
                          selectedDate.toDateString() === new Date().toDateString() && 
                          time < new Date().toTimeString().slice(0, 5) : false;
                        
                        return (
                          <option 
                            key={time} 
                            value={time}
                            disabled={isPastTime}
                          >
                            {time}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* Selected Items Display */}
                  <div className="selected-items">
                    <h4>Selecionados:</h4>
                    <div className="selected-info">
                      {selectedDate && (
                        <div className="selected-item">
                          <span className="label">Data:</span>
                          <span className="value">{formatDate(selectedDate)}</span>
                        </div>
                      )}
                      {selectedTime && (
                        <div className="selected-item">
                          <span className="label">Horário:</span>
                          <span className="value">{selectedTime}</span>
                        </div>
                      )}
                      {!selectedDate && !selectedTime && (
                        <p className="no-selection">Nenhuma seleção ainda</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="step-content">
              <h3>Você deseja qual das nossas delícias</h3>

              <div className="order-selection-box">
                <div className="selection-grid selection-grid--delicias">
                  <div className="selection-column">
                    <div className="selection-card">
                      <div className="selection-card-header">
                        <h4 className="selection-card-title">Tortas doces</h4>
                      </div>
                      <div className="selection-card-body">
                        {DELICIAS_COLUMNS[0].items.map((item) => {
                          const existing = orderData.cakes.find(x => x.id === item.id);
                          const quantity = existing ? existing.quantity : 0;
                          return (
                            <div key={item.id} className="selection-row">
                              <div className="selection-row-title">{item.name}</div>
                              <div className="selection-pill">
                                <span className="selection-pill-price">{item.unit}</span>
                                <div className="selection-pill-controls">
                                  <button
                                    type="button"
                                    className="pill-btn"
                                    onClick={() => setItemQuantity('cakes', item, quantity - 1)}
                                    disabled={quantity === 0}
                                    aria-label="Diminuir"
                                  >
                                    -
                                  </button>
                                  <span className="pill-qty">{quantity}</span>
                                  <button
                                    type="button"
                                    className="pill-btn"
                                    onClick={() => setItemQuantity('cakes', item, quantity + 1)}
                                    aria-label="Aumentar"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="selection-card">
                      <div className="selection-card-header">
                        <h4 className="selection-card-title">Pudim</h4>
                        <p className="selection-card-desc">Pudim cremoso de leite condensado com calda</p>
                      </div>
                      <div className="selection-card-body">
                        {DELICIAS_COLUMNS[2].items.map((item) => {
                          const existing = orderData.cakes.find(x => x.id === item.id);
                          const quantity = existing ? existing.quantity : 0;
                          return (
                            <div key={item.id} className="selection-row">
                              <div className="selection-row-title selection-row-title--tag">{item.name}</div>
                              <div className="selection-pill">
                                <span className="selection-pill-price">{item.unit}</span>
                                <div className="selection-pill-controls">
                                  <button
                                    type="button"
                                    className="pill-btn"
                                    onClick={() => setItemQuantity('cakes', item, quantity - 1)}
                                    disabled={quantity === 0}
                                    aria-label="Diminuir"
                                  >
                                    -
                                  </button>
                                  <span className="pill-qty">{quantity}</span>
                                  <button
                                    type="button"
                                    className="pill-btn"
                                    onClick={() => setItemQuantity('cakes', item, quantity + 1)}
                                    aria-label="Aumentar"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="selection-column">
                    <div className="selection-card">
                      <div className="selection-card-header">
                        <h4 className="selection-card-title">Torta de Frango</h4>
                        <p className="selection-card-desc">Torta de frango com milho, ervilha, azeitona, tomate</p>
                        <span className="selection-card-highlight">1Kg</span>
                      </div>
                      <div className="selection-card-body">
                        {DELICIAS_COLUMNS[1].items.map((item) => {
                          const existing = orderData.cakes.find(x => x.id === item.id);
                          const quantity = existing ? existing.quantity : 0;
                          return (
                            <div key={item.id} className="selection-row">
                              <div className="selection-row-title"></div>
                              <div className="selection-pill">
                                <span className="selection-pill-price">{item.unit}</span>
                                <div className="selection-pill-controls">
                                  <button
                                    type="button"
                                    className="pill-btn"
                                    onClick={() => setItemQuantity('cakes', item, quantity - 1)}
                                    disabled={quantity === 0}
                                    aria-label="Diminuir"
                                  >
                                    -
                                  </button>
                                  <span className="pill-qty">{quantity}</span>
                                  <button
                                    type="button"
                                    className="pill-btn"
                                    onClick={() => setItemQuantity('cakes', item, quantity + 1)}
                                    aria-label="Aumentar"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="selection-card">
                      <div className="selection-card-header">
                        <h4 className="selection-card-title">Bolo de Pote</h4>
                        <p className="selection-card-desc">Bolo de pote de chocolate com cobertura de chocolate e granulado</p>
                        <span className="selection-card-highlight">500g</span>
                      </div>
                      <div className="selection-card-body">
                        {DELICIAS_COLUMNS[3].items.map((item) => {
                          const existing = orderData.cakes.find(x => x.id === item.id);
                          const quantity = existing ? existing.quantity : 0;
                          return (
                            <div key={item.id} className="selection-row">
                              <div className="selection-row-title"></div>
                              <div className="selection-pill">
                                <span className="selection-pill-price">{item.unit}</span>
                                <div className="selection-pill-controls">
                                  <button
                                    type="button"
                                    className="pill-btn"
                                    onClick={() => setItemQuantity('cakes', item, quantity - 1)}
                                    disabled={quantity === 0}
                                    aria-label="Diminuir"
                                  >
                                    -
                                  </button>
                                  <span className="pill-qty">{quantity}</span>
                                  <button
                                    type="button"
                                    className="pill-btn"
                                    onClick={() => setItemQuantity('cakes', item, quantity + 1)}
                                    aria-label="Aumentar"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
         </div>
          )}

          {currentStep === 2 && (
            <div className="step-content">
              <h3>Deseja algum dos nosso salgados?</h3>

              <div className="order-selection-box">
                <div className="selection-grid selection-grid--salgados">
                  {SALGADOS_COLUMNS.map((col) => (
                    <div key={col.title} className="selection-column">
                      <div className="selection-card">
                        <div className="selection-card-header">
                          <h4 className="selection-card-title">{col.title}</h4>
                        </div>
                        <div className="selection-card-body">
                          {col.items.map((item) => {
                            const existing = orderData.savories.find(x => x.id === item.id);
                            const quantity = existing ? existing.quantity : 0;
                            return (
                              <div key={item.id} className="selection-row">
                                <div className="selection-row-title">{item.name}</div>
                                <div className="selection-pill">
                                  <span className="selection-pill-price">{item.unit}</span>
                                  <div className="selection-pill-controls">
                                    <button
                                      type="button"
                                      className="pill-btn"
                                      onClick={() => setItemQuantity('savories', item, quantity - 1)}
                                      disabled={quantity === 0}
                                      aria-label="Diminuir"
                                    >
                                      -
                                    </button>
                                    <span className="pill-qty">{quantity}</span>
                                    <button
                                      type="button"
                                      className="pill-btn"
                                      onClick={() => setItemQuantity('savories', item, quantity + 1)}
                                      aria-label="Aumentar"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {(() => {
                const selectedPastels = PASTEL_OPTIONS
                  .map((p) => {
                    const item = orderData.savories.find((x) => x.id === p.id);
                    return { ...p, quantity: item?.quantity ?? 0 };
                  })
                  .filter((p) => p.quantity > 0);

                if (selectedPastels.length === 0) return null;

                return (
                  <div className="order-selection-box pastel-box">
                    <div className="recheio-header">
                      <div className="recheio-title">Sabores do pastel</div>
                      <div className="recheio-subtitle">Selecione os sabores e as quantidades. A soma não pode ultrapassar o total de pastéis escolhidos acima.</div>
                    </div>

                    <div className="selection-grid">
                      {selectedPastels.map((pastel) => {
                        const isCento = pastel.id === 'sal-mini-pas';
                        const maxPieces = pastel.quantity * (isCento ? 100 : 1);
                        const stepSize = isCento ? 25 : 1;
                        const current = orderData.pastelFlavors[pastel.id] ?? {};
                        const totalSelected = Object.values(current).reduce((sum, v) => sum + (Number(v) || 0), 0);

                        return (
                          <div key={pastel.id} className="selection-card">
                            <div className="selection-card-header">
                              <h4 className="selection-card-title">{pastel.label}</h4>
                              <p className="selection-card-desc">Total selecionado: {totalSelected}/{maxPieces}</p>
                            </div>

                            <div className="selection-card-body">
                              {PASTEL_FLAVORS.map((flavor) => {
                                const qty = current[flavor] ?? 0;
                                const canInc = totalSelected + stepSize <= maxPieces;

                                return (
                                  <div key={flavor} className="selection-row">
                                    <div className="selection-row-title">{flavor}</div>
                                    <div className="selection-pill">
                                      <span className="selection-pill-price">Qtd</span>
                                      <div className="selection-pill-controls">
                                        <button
                                          type="button"
                                          className="pill-btn"
                                          onClick={() => setPastelFlavorQuantity(pastel.id, flavor, qty - stepSize)}
                                          disabled={qty === 0}
                                          aria-label="Diminuir"
                                        >
                                          -
                                        </button>
                                        <span className="pill-qty">{qty}</span>
                                        <button
                                          type="button"
                                          className="pill-btn"
                                          onClick={() => setPastelFlavorQuantity(pastel.id, flavor, qty + stepSize)}
                                          disabled={!canInc}
                                          aria-label="Aumentar"
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {currentStep === 3 && (
            <div className="step-content">
              <h3>Qual a base do bolo?</h3>

              <div className="order-selection-box">
                <div className="form-group">
                  <label htmlFor="massa">
                    Massa
                    {hasCakeBaseStarted ? <span className="required"> *</span> : null}
                    {orderData.base.massa && CAKE_MASSA_PRICE_PER_KG[orderData.base.massa] ? (
                      <span className="label-tag">R$: {CAKE_MASSA_PRICE_PER_KG[orderData.base.massa]}/kg</span>
                    ) : null}
                  </label>
                  <div className="field-description">
                    {(() => {
                      const price = CAKE_MASSA_PRICE_PER_KG[orderData.base.massa];
                      if (!orderData.base.massa || !price) return 'Selecione a massa para ver o valor por kg.';
                      return `Valor da massa: R$ ${price.toFixed(2)}/kg`;
                    })()}
                  </div>
                  <select
                    id="massa"
                    className="time-select"
                    value={orderData.base.massa}
                    onChange={(e) => updateOrderData('base', { ...orderData.base, massa: e.target.value })}
                  >
                    <option value="">Selecione</option>
                    <option value="Chocolate">Chocolate (R$ 80/kg)</option>
                    <option value="Baunilha">Baunilha (R$ 70/kg)</option>
                    <option value="Mesclada">Mesclada</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="formato">
                    Formato
                    {hasCakeBaseStarted ? <span className="required"> *</span> : null}
                  </label>
                  <select
                    id="formato"
                    className="time-select"
                    value={orderData.base.formato}
                    onChange={(e) => updateOrderData('base', { ...orderData.base, formato: e.target.value })}
                  >
                    <option value="">Selecione</option>
                    <option value="Redondo">Redondo</option>
                    <option value="Quadrado">Quadrado</option>
                    <option value="Retangular">Retangular</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="tamanhoKg">
                    Tamanho (kg)
                    {hasCakeBaseStarted ? <span className="required"> *</span> : null}
                  </label>
                  <select
                    id="tamanhoKg"
                    className="time-select"
                    value={orderData.base.tamanhoKg}
                    onChange={(e) => updateOrderData('base', { ...orderData.base, tamanhoKg: e.target.value })}
                  >
                    <option value="">Selecione</option>
                    <option value="1">1</option>
                    <option value="1.5">1,5</option>
                    <option value="2">2</option>
                    <option value="2.5">2,5</option>
                    <option value="3">3</option>
                    <option value="3.5">3,5</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="theme">
                    Tema do bolo
                    {hasCakeBaseStarted ? <span className="required"> *</span> : null}
                  </label>
                  <p className="field-description">Escolha o tema do seu bolo, exemplo: um desenho, time, casamento</p>
                  <input
                    id="theme"
                    type="text"
                    value={orderData.adicionais.theme}
                    onChange={(e) => updateOrderData('adicionais', { ...orderData.adicionais, theme: e.target.value })}
                    placeholder="Tema"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="step-content">
              <h3>Qual será o recheio do bolo?</h3>

              {(() => {
                const combos = [...FILLING_COMBOS] as string[];
                const monte = [...FILLING_BUILD] as string[];

                const selectedCombo = orderData.fillings.find((x) => combos.includes(x));
                const selectedNonCombo = orderData.fillings.filter((x) => monte.includes(x));
                const nonComboAtLimit = selectedNonCombo.length >= 2;

                const toggle = (name: string) => {
                  const isChecked = orderData.fillings.includes(name);

                  if (combos.includes(name)) {
                    const next = isChecked ? [] : [name];
                    updateOrderData('fillings', next);
                    return;
                  }

                  // monte seu recheio
                  if (selectedCombo) {
                    // cannot add non-combo if a combo is selected
                    return;
                  }

                  const next = isChecked
                    ? orderData.fillings.filter(x => x !== name)
                    : [...orderData.fillings, name];
                  updateOrderData('fillings', next);
                };

                const isDisabled = (name: string) => {
                  const checked = orderData.fillings.includes(name);

                  if (combos.includes(name)) {
                    return Boolean(selectedCombo && !checked) || selectedNonCombo.length > 0;
                  }

                  // non-combo
                  if (selectedCombo) return !checked;
                  if (!checked && nonComboAtLimit) return true;
                  return false;
                };

                return (
                  <div className="order-selection-box recheio-box">
                    <div className="recheio-header">
                      <div className="recheio-title">Recheio <span className="required">*</span></div>
                      <div className="recheio-subtitle">Você pode escolher até dois sabores (somente em “Monte seu recheio”). As combinações prontas permitem apenas 1 seleção.</div>
                    </div>

                    <div className="recheio-grid recheio-grid--two-sections">
                      <div className="recheio-section">
                        <div className="recheio-section-title">Nossas combinações mais pedidas</div>
                        {combos.map((name) => {
                          const checked = orderData.fillings.includes(name);
                          const disabled = isDisabled(name);
                          return (
                            <label
                              key={name}
                              className={`recheio-row ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}
                            >
                              <span className="recheio-row-title">{name}</span>
                              <span className="recheio-row-right">
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  disabled={disabled && !checked}
                                  onChange={() => toggle(name)}
                                />
                              </span>
                            </label>
                          );
                        })}
                      </div>

                      <div className="recheio-section">
                        <div className="recheio-section-title">Monte seu recheio</div>
                        {monte.map((name) => {
                          const checked = orderData.fillings.includes(name);
                          const disabled = isDisabled(name);
                          return (
                            <label
                              key={name}
                              className={`recheio-row ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}
                            >
                              <span className="recheio-row-title">{name}</span>
                              <span className="recheio-row-right">
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  disabled={disabled && !checked}
                                  onChange={() => toggle(name)}
                                />
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {currentStep === 5 && (
            <div className="step-content">
              <h3>Adicionais +</h3>

              <div className="order-selection-box">
                <div className="form-group">
                  <label htmlFor="observations">Observação</label>
                  <p className="field-description">Tem alguma observação? exemplo: alergias, cores do bolo, remover ou adicionar ingrediente</p>
                  <input
                    id="observations"
                    type="text"
                    value={orderData.observations}
                    onChange={(e) => updateOrderData('observations', e.target.value)}
                    placeholder="Observação"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="topper" className="label-with-tag">
                    Topo do bolo 
                    <span className="label-tag">R$: 20,00</span>
                  </label>
                  <p className="field-description">Deseja um topo para seu bolo? exemplo: Diga um nome, tema, personagem</p>
                  <input
                    id="topper"
                    type="text"
                    value={orderData.adicionais.topper}
                    onChange={(e) => updateOrderData('adicionais', { ...orderData.adicionais, topper: e.target.value })}
                    placeholder="Topo do bolo"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="deliveryAddress">
                    Entrega
                    {deliveryStarted ? <span className="required"> *</span> : null}
                  </label>
                  <p className="field-description">Caso deseje que seja feita a verificação de possibilidade de entrega</p>

                  <div className="delivery-row">
                    <input
                      id="deliveryAddress"
                      type="text"
                      value={orderData.adicionais.delivery.address}
                      onChange={(e) => updateOrderData('adicionais', { ...orderData.adicionais, delivery: { ...orderData.adicionais.delivery, address: e.target.value } })}
                      placeholder={deliveryStarted ? 'Cep *' : 'Cep'}
                    />

                    <input
                      type="text"
                      value={orderData.adicionais.delivery.number}
                      onChange={(e) => updateOrderData('adicionais', { ...orderData.adicionais, delivery: { ...orderData.adicionais.delivery, number: e.target.value } })}
                      placeholder={deliveryStarted ? 'Número *' : 'Número'}
                    />

                    <input
                      type="text"
                      value={orderData.adicionais.delivery.complement}
                      onChange={(e) => updateOrderData('adicionais', { ...orderData.adicionais, delivery: { ...orderData.adicionais.delivery, complement: e.target.value } })}
                      placeholder={deliveryStarted ? 'Complemento *' : 'Complemento'}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="customerName">Nome <span className="required">*</span></label>
                  <input
                    id="customerName"
                    type="text"
                    value={orderData.adicionais.customerName}
                    onChange={(e) => updateOrderData('adicionais', { ...orderData.adicionais, customerName: e.target.value })}
                    placeholder="Seu nome"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Action Buttons */}
        <div className="order-actions">
          {currentStep > 0 && (
            <Button
              variant="outlined"
              className="btn-previous"
              onClick={handlePrevious}
            >
              Anterior
            </Button>
          )}
          
          {currentStep < steps.length - 1 ? (
            <span
              className="btn-tooltip-wrapper"
            >
              <Button
                variant="default"
                className="btn-next"
                onClick={handleNext}
                disabled={isNextDisabled}
              >
                Próximo
                <ArrowForwardIcon className="btn-next-icon" />
              </Button>
              {isNextDisabled && nextDisabledReason && (
                <span
                  className="btn-disabled-overlay"
                  role="button"
                  tabIndex={0}
                  aria-label={nextDisabledReason}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    showToast(nextDisabledReason);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      e.stopPropagation();
                      showToast(nextDisabledReason);
                    }
                  }}
                />
              )}
            </span>
          ) : (
            <span
              className="btn-tooltip-wrapper"
            >
              <Button
                variant="default"
                className="btn-next"
                onClick={() => window.open(generateWhatsAppMessage(), '_blank')}
                disabled={isWhatsAppDisabled}
              >
                Encomendar via WhatsApp
              </Button>
              {isWhatsAppDisabled && whatsappDisabledReason && (
                <span
                  className="btn-disabled-overlay"
                  role="button"
                  tabIndex={0}
                  aria-label={whatsappDisabledReason}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    showToast(whatsappDisabledReason);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      e.stopPropagation();
                      showToast(whatsappDisabledReason);
                    }
                  }}
                />
              )}
            </span>
          )}
        </div>
      </div>

      {toast.show && (
        <div className={`toast toast-${toast.type}`}>{toast.message}</div>
      )}

      {/* Floating Cart */}
      <div
        className={`floating-cart ${isOrderSectionInView ? 'floating-cart--detailed' : 'floating-cart--compact'}`}
        role="button"
        tabIndex={0}
        onClick={() => setIsCartSummaryOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setIsCartSummaryOpen((prev) => !prev);
        }}
      >
        <div className="cart-icon">
          🛒
          {getTotalItems() > 0 && (
            <span className="cart-badge">{getTotalItems()}</span>
          )}
        </div>

        {isOrderSectionInView ? (
          <div className="cart-info">
            <div className="cart-total">
              <span className="total-label">Total:</span>
              <span className="total-value">R$ {calculateTotal().toFixed(2)}</span>
            </div>
            {getTotalItems() > 0 && (
              <div className="cart-items-count">
                {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'}
              </div>
            )}
          </div>
        ) : (
          <div className="cart-compact">
            <img className="cart-compact-logo" src={LogoFb} alt="Fátima Bolos" />
          </div>
        )}
      </div>

      {isCartSummaryOpen && (
        <div className="cart-summary-overlay" aria-hidden={!isCartSummaryOpen}>
          <div className="cart-summary cart-summary--open" ref={cartSummaryRef} role="dialog" aria-modal="true" aria-label="Resumo do pedido">
            <div className="cart-summary-header">
              <h4>Resumo do pedido!</h4>
              <p>Revise e obtenha seu orçamento</p>
            </div>

            <div className="cart-summary-body">
              <div className="cart-summary-row">
                <span>Data</span>
                <span>{orderData.date ? orderData.date.toLocaleDateString('pt-BR') : '-'}</span>
              </div>

              <div className="cart-summary-row">
                <span>Peso</span>
                <span>{orderData.base.tamanhoKg ? `${orderData.base.tamanhoKg}kg` : '-'}</span>
              </div>

              <div className="cart-summary-row">
                <span>Formato</span>
                <span>{orderData.base.formato || '-'}</span>
              </div>

              <div className="cart-summary-row">
                <span>Massa</span>
                <span>{orderData.base.massa || '-'}</span>
              </div>

              <div className="cart-summary-row">
                <span>Recheio 1</span>
                <span>{orderData.fillings[0] || '-'}</span>
              </div>

              <div className="cart-summary-row">
                <span>Recheio 2</span>
                <span>{orderData.fillings[1] || '-'}</span>
              </div>

              <div className="cart-summary-row">
                <span>Tema</span>
                <span>{orderData.adicionais.theme || '-'}</span>
              </div>

              <div className="cart-summary-row">
                <span>Topper</span>
                <span>{orderData.adicionais.topper?.trim() ? 'Sim' : '-'}</span>
              </div>

              {hasCakeBaseStarted && (
                <div className="cart-summary-row">
                  <span><strong>TOTAL DO BOLO</strong></span>
                  <span><strong>R$ {(() => {
                    const sizeKg = Number(orderData.base.tamanhoKg || 0);
                    const massaPricePerKg = orderData.base.massa ? CAKE_MASSA_PRICE_PER_KG[orderData.base.massa] : undefined;
                    const massaTotal = sizeKg > 0 && massaPricePerKg ? sizeKg * massaPricePerKg : 0;
                    const topperTotal = orderData.adicionais.topper?.trim() ? PRICES.topper : 0;
                    return (massaTotal + topperTotal).toFixed(2);
                  })()}</strong></span>
                </div>
              )}

              {(orderData.cakes.length > 0 || orderData.savories.length > 0 || hasCakeBaseStarted) && (
                <div className="cart-summary-items">
                  {(() => {
                    const sizeKg = Number(orderData.base.tamanhoKg || 0);
                    const massaPricePerKg = orderData.base.massa ? CAKE_MASSA_PRICE_PER_KG[orderData.base.massa] : undefined;
                    const massaTotal = hasCakeBaseStarted && sizeKg > 0 && massaPricePerKg ? sizeKg * massaPricePerKg : 0;
                    
                    // Debug: mostrar sempre que houver base do bolo iniciada
                    if (hasCakeBaseStarted) {
                      return (
                        <div className="cart-summary-item">
                          <span>Bolo {orderData.base.massa || 'Massa não selecionada'} ({orderData.base.tamanhoKg || 0}kg)</span>
                          <span>R$ {massaTotal > 0 ? massaTotal.toFixed(2) : '0.00'}</span>
                        </div>
                      );
                    }
                    return null;
                  })()}
                  
                  {orderData.cakes.map((item) => (
                    <div key={item.id} className="cart-summary-item">
                      <span>{item.name || 'Item'} ({item.quantity}x)</span>
                      <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}

                  {orderData.savories.map((item) => (
                    <div key={item.id} className="cart-summary-item">
                      <span>{item.name || 'Item'} ({item.quantity}x)</span>
                      <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}

                  {(() => {
                    const topperTotal = orderData.adicionais.topper?.trim() ? PRICES.topper : 0;
                    if (topperTotal > 0) {
                      return (
                        <div className="cart-summary-item">
                          <span>Topper do bolo</span>
                          <span>R$ {topperTotal.toFixed(2)}</span>
                        </div>
                      );
                    }
                    return null;
                  })()}

                  {(() => {
                    const pastels = [
                      { id: 'sal-mini-pas', label: 'Pastel (Cento)' },
                      { id: 'sal-pad-pas', label: 'Pastel (Uni.)' },
                    ];

                    const blocks = pastels
                      .map((p) => {
                        const item = orderData.savories.find((x) => x.id === p.id);
                        if (!item || item.quantity <= 0) return null;

                        const flavors = orderData.pastelFlavors[p.id] ?? {};
                        const selected = Object.entries(flavors).filter(([, qty]) => (qty ?? 0) > 0);
                        if (selected.length === 0) {
                          return (
                            <div key={p.id} className="cart-summary-item cart-summary-item--sub">
                              <span>{p.label}: sabores não informados</span>
                              <span></span>
                            </div>
                          );
                        }

                        return (
                          <div key={p.id} className="cart-summary-item cart-summary-item--sub">
                            <span>{p.label}</span>
                            <span></span>
                            <div className="cart-summary-subitems">
                              {selected.map(([name, qty]) => (
                                <div key={`${p.id}-${name}`} className="cart-summary-subitem">
                                  <span>{name}</span>
                                  <span>{qty}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })
                      .filter(Boolean);

                    if (!blocks.length) return null;
                    return (
                      <div className="cart-summary-pastel">
                        <div className="cart-summary-section-title">Sabores do pastel</div>
                        {blocks}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            <div className="cart-summary-footer">
              <span>Total</span>
              <span className="cart-summary-total">R$: {calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
