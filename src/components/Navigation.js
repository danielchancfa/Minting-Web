import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import Logo from './Logo'
import { useMoralis } from "react-moralis"

const Section = styled.section`
width: 100vw;
background-color: ${props => props.theme.body};
`

const Navbar = styled.nav`
display: flex;
justify-content: space-between;
align-items: center;

width: 85%;
height: ${props => props.theme.navHeight};
margin: 0 auto;
`

const Menu = styled.ul`
display: flex;
justify-content: space-between;
align-items: center;
list-style:none;
`

const MenuItem = styled.li`
margin: 0 1rem;
color: ${props => props.theme.text};
cursor: pointer;

&::after{
  content: ' ';
  display: block;
  width: 0%;
  height: 2px;
  background: ${props => props.theme.text};
  transition: width 0.3s ease;
}

&:hover::after{
  width: 100%;

}
`



const Navigation = () => {

  const scrollTo = (id) => {
    let element = document.getElementById(id);

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    })
  }

  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();
  
  return (
    
    <section>
      <Navbar>
        <Logo/>
        <Menu>
          <MenuItem onClick={() => scrollTo('home')}>Home</MenuItem>
          <MenuItem onClick={() => scrollTo('about')}>About</MenuItem>
          <MenuItem onClick={() => scrollTo('roadmap')}>Roadmap</MenuItem>
          <MenuItem onClick={() => scrollTo('showcase')}>Showcase</MenuItem>
          {/* <MenuItem onClick={() => scrollTo('')}>Team</MenuItem> */}
          {/* <MenuItem onClick={() => scrollTo('')}>Faq</MenuItem> */}
        </Menu>
        { isAuthenticated ?
          <Button text='Connected' styled={{hover:"none"}}/>
          :
          <Button text='Connect Wallet' onClick={authenticate} link="https://"/>
        }
        {/* <button onClick={authenticate}>collect wallet</button> */}
      </Navbar>
    </section>
  )
}

export default Navigation