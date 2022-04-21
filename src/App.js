import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles'
import {light} from './styles/Themes'
import Navigation from './components/Navigation';
import Home from './components/sections/Home';
import About from './components/sections/About';
import Roadmap from './components/sections/Roadmap';
import Showcase from './components/sections/Showcase';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Minting from './components/sections/Minting';
import { useMoralis } from "react-moralis"
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from "./contract/contract.json"

const CONTRACT_ADDRESS = '0xf53e4fBDf61E1d2eD6e85dB53983E716282c82ea'  

function App() {

  const { authenticate, isAuthenticated, user, enableWeb3 } = useMoralis();
  const [totalSupply, setTotalSupply] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);


  useEffect( async () => {
    if(isAuthenticated) {
      const web3Provider = await enableWeb3();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, web3Provider)
      const maxSupply = await contract.maxSupply();
      const totalSupply = await contract.totalSupply();
      setMaxSupply(parseInt(maxSupply,10));
      setTotalSupply(parseInt(totalSupply,10));
      console.log(maxSupply.toString())
      console.log(totalSupply.toString())
    }
  }, [isAuthenticated])

  return (
    <>
    <GlobalStyles/>
      <ThemeProvider theme={light}> 
      <Navigation />
      <Home/>
      <About/>
      <Roadmap/>
      <Showcase/>
      <Minting totalSupply={totalSupply} maxSupply={maxSupply}/>
      <Footer/>
      <ScrollToTop/>
      </ThemeProvider>
    </>
  );
}

export default App;
