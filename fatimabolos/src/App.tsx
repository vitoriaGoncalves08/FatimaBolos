
import { CardsBrown  } from './components/molecules/CardsBrown/cardsbrown';
import { Header } from './components/organisms/Header/header';
import { Home } from './components/templates/home/home';
import { AboutUs } from './components/templates/aboutUs/aboutUs';

function App() {

  return (
    <>
    <Header/>
    <Home/>
    <CardsBrown />
    <AboutUs/>
    </>
  )
}

export default App
