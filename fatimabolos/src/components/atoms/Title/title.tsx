import './title.css';

interface TitleProps {
  title?: string;
  id?: string;
}

export const Title = ({ title = "Sobre nós", id }: TitleProps) => {
  return (
    <div id={id} className="about-us-title-container">
      <h2 className="about-us-title">{title}</h2>
      <div className="about-us-title-underline"></div>
    </div>
  );
};
