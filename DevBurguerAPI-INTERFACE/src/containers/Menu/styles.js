import styled from "styled-components";
import BannerHamburger from '../../assets/banner-hamburger.svg';
import Background from '../../assets/background-login.svg';
import { Link } from "react-router-dom";

export const Container = styled.div`
width: 100%;
min-height: 100vh;
background-color: #f0f0f0;

background: linear-gradient(
    rgba(255,255,255, 0.6),
    rgba(255,255,255, 0.6)
 ),
  url('${Background}');
  background-position: center;
  background-size: calc(50vw);
`;

export const Banner = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 480px;

background: url('${BannerHamburger}');
background-position: center;
background-color: #1f1f1f;
background-size: cover;
width: 100%;
position: relative;

h1{
    font-family: 'Road Rage', sans-serif;
    font-size: 80px;
    line-height: 65px;
    color: #fff;
    position: absolute;
    
    right: 20%;
    top: 30%;

    span{
        display: block;
        color:  #fff;
        font-size: 20px;
    }
}
`

export const CategoryMenu = styled.div`
display: flex;
justify-content: center;
gap: 50px;
margin: 30px;
`;

export const CategoryButton = styled(Link)`
text-decoration: none;
cursor: pointer;
background: none;
color: ${props => props.$isActiveCategory ? ' #9758a6' : '#696969'};
font-size: 24px;
font-weight: 500;
padding-bottom: 5px;
line-height: 20px;
border: none;
border-bottom: ${(props) => props.$isActiveCategory && '3px solid #9758a6'};
`;

export const ProductsContainer = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 60px;
padding: 40px;
justify-content: center;
max-width: 1280px;
margin: 50px auto;

`;

export const ExitButton = styled.button`
display: block;
margin: 0 auto 40px;
font-size: 32px;
font-weight: bold;
line-height: 40px;
color:rgb(255, 255, 255);
background-color: #9758a6;
border-radius: 16px;
border: 2px solid rgb(81, 27, 95);
padding: 18px;
cursor: pointer;
text-decoration: none;

&:hover {
    background-color: #7c448a;
}
`;
