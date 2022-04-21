import React, { useState } from 'react'
import { useMoralis } from 'react-moralis';
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components';
import {dark} from '../../styles/Themes';
import Button from '../Button';
import { ethers } from 'ethers';
import abi from "../../contract/contract.json"
import ReactLoading from 'react-loading';

const CONTRACT_ADDRESS = '0xf53e4fBDf61E1d2eD6e85dB53983E716282c82ea'

const Section = styled.section`
min-height: 100vh;
width: 100%;
background-color: ${props => props.theme.text};
display: flex;
justify-content: center;
align-items: center;
position: relative;
`

const Container = styled.div`
width: 75%;
margin: 0 auto;
margin-top: 10px;
background-color: lightblue;

display: flex;
justify-content: center;
align-items: center;
`

const Box = styled.div`
width: 50%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items:center;
`

const Title = styled.h2`
font-size: ${props => props.theme.fontxxl};
text-transform: capitalize;
color: ${props => props.theme.body};
align-self: flex-start;
width: 80%;
margin: 0 auto;
`

const SubText = styled.p`
font-size: ${props => props.theme.fontlg};
color: ${props => props.theme.body};
align-self: flex-start;
width: 80%;
margin: 1rem auto;
font-weight:400;
`

const SubTextLight = styled.p`
font-size: ${(props) => props.theme.fontmd};
color: ${(props) => `rgba(${props.theme.bodyRgba}, 0.6)`};
align-self: flex-start;
width: 80%;
margin: 1rem auto;
font-weight:400;
`

const ButtonContainer = styled.div`
width: 80%;
margin: 1rem auto;
align-self: flex-start;
`

const MintBox = styled.div`
width: 80vw;
height: 80vh;
border: 1px red;
border-style: dashed ;
margin: 1rem auto;
background-color: white;
justify-content: center;
`

const MintPortal = styled(Container)`
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;

`

const CheckScan = styled(Button)`

`

const Minting = ({totalSupply, maxSupply}) => {
    
    const [mintingNumber, setMintingNumber] = useState(1);
    const [inProgress, setInProgress] = useState(false);
    const [hash, setHash] = useState(null);
    const { authenticate, isAuthenticated, user, Moralis } = useMoralis();

    const checkScan = () => {
        let url = "https://polygonscan.com/tx/" + hash;
        window.open(url, '_blank');

    }

    const mint = async () => {
        const sendOptions = {
            contractAddress: CONTRACT_ADDRESS,
            functionName: "mint",
            abi: abi,
            msgValue: ethers.utils.parseEther((mintingNumber*0.0005).toString()).toString(),
            params: {
                _mintAmount: mintingNumber.toString()
            }
        }
        console.log(sendOptions);
        const transcation = await Moralis.executeFunction(sendOptions)
        setInProgress(true);
        setHash(transcation.hash);

        await transcation.wait(3).then((receipt) => {
            setInProgress(false);
        })


    }

    return (
    <Section>
        <MintBox>
            { isAuthenticated ?
                <Container>
                    <MintPortal>
                    <form class='col-lg-5'>
                        <h1 style={{margin: "5px", padding:'10px'}}>Mint Portal</h1>
                        <h2 style={{margin: "5px", padding:'10px', justifyContent:'center'}}>{totalSupply} / {maxSupply}</h2>
                        <h5 style={{margin: "5px", padding: '10px'}}>1 APC costs 0.0005 Matic</h5>
                        <div class="card" id="wallet-address" style={{margin: "5px", padding: '10px'}}>
                            <label for="floatingInput">#of APC to mint</label>
                            <input 
                            type="number" 
                            name="amount" 
                            onChange={(e)=>setMintingNumber(e.target.value)}
                            Value={mintingNumber} min='1' max='5'/>
                        </div>
                    </form>
                    {inProgress && <ReactLoading type="bubbles" color='#fff' height={64}/>}
                    {inProgress && <CheckScan onClick={checkScan}>
                        Check scan
                        </CheckScan>}
                    {!inProgress && <Button text='Mint' onClick={mint} link="https://"/>}
                    </MintPortal>
                </Container>
                :
                <Container>
                    <Button text='Connect Wallet' onClick={authenticate} link="https://"/>
                </Container>
            }
        </MintBox>
    </Section>
  )
}

export default Minting