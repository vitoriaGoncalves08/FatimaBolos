
import { CardsBrown } from './components/molecules/CardsBrown/cardsbrown';
import { Header } from './components/organisms/Header/header';
import { Home } from './components/templates/home/home';
import { AboutUs } from './components/templates/aboutUs/aboutUs';
import ProductsSection from './components/templates/productsSection/productsSection';

function App() {

  return (
    <>
    <Header/>
    <Home/>
    <CardsBrown />
    <AboutUs/>
    <ProductsSection/>
    </>
  )
}

export default App
