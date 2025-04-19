import { useState } from 'react'
import { Header } from './components/organisms/Header/header';
import { TitleHome  } from './components/atoms/TitleHome/titlehome';
import { Home } from './components/templates/home/home';

function App() {

  return (
    <>
    <Header/>
    <Home/>
    </>
  )
}

export default App
