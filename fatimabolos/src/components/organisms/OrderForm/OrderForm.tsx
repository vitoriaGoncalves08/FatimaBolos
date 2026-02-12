import React, { useState } from 'react';
import { Title } from '../../atoms/Title/title';
import { Button } from '../../atoms/Buttons/button';
import './orderForm.css';

interface OrderData {
  date: string;
  time: string;
}

export const OrderForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const steps = [
    { id: 1, label: 'Data e Horário', completed: false },
    { id: 2, label: 'Produtos', completed: false },
    { id: 3, label: 'Confirmar', completed: false }
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00'
  ];

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
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
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
    <section className="order-form-section" id="encomenda">
      <div className="order-form-container">
        <div className="order-header">
          <Title title="Encomenda" id="encomenda-titulo" />
        </div>

        {/* Progress Menu */}
        <div className="progress-menu">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`progress-item ${currentStep === step.id ? 'active' : ''} ${step.completed ? 'completed' : ''}`}
              onClick={() => setCurrentStep(step.id)}
            >
              <div className="progress-number">{step.id}</div>
              <span className="progress-label">{step.label}</span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="order-content">
          {currentStep === 1 && (
            <div className="step-content">
              <h3>Selecione a data e horário</h3>
              
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

              {/* Time Selection */}
              <div className="time-selection">
                <h4>Selecione o horário</h4>
                <select 
                  className="time-select"
                  value={selectedTime}
                  onChange={(e) => handleTimeSelect(e.target.value)}
                >
                  <option value="">Escolha um horário</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              {selectedDate && (
                <div className="selected-info">
                  <p>Data selecionada: {formatDate(selectedDate)}</p>
                </div>
              )}

              {selectedTime && (
                <div className="selected-info">
                  <p>Horário selecionado: {selectedTime}</p>
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="step-content">
              <h3>Selecione os produtos</h3>
              <p>Em desenvolvimento...</p>
            </div>
          )}

          {currentStep === 3 && (
            <div className="step-content">
              <h3>Confirmar encomenda</h3>
              <p>Em desenvolvimento...</p>
            </div>
          )}

          {currentStep === 4 && (
            <div className="step-content">
              <h3>Confirmar encomenda</h3>
              <p>Em desenvolvimento...</p>
            </div>
          )}

          {currentStep === 5 && (
            <div className="step-content">
              <h3>Confirmar encomenda</h3>
              <p>Em desenvolvimento...</p>
            </div>
          )}
        </div>

        {/* Next Button */}
        <div className="order-actions">
          <Button
            variant="default"
            className="btn-next"
            onClick={handleNext}
            disabled={
              (currentStep === 1 && (!selectedDate || !selectedTime))
            }
          >
            Próximo
          </Button>
        </div>
      </div>
    </section>
  );
};
