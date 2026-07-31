import styled from "styled-components";
import Texture from "../../assets/texture.svg"
import Background from '../../assets/background-login.svg';

export const Container = styled.div`
    width: 100%;
    background-color: #f0f0f0;
    background: linear-gradient(
        rgba(255,255,255, 0.6),
        rgba(255,255,255, 0.6)
     ),
      url('${Background}');
      background-size: cover;
    min-height: 100vh;
`;

export const Banner = styled.div`
    background: url('${Texture}');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    height: 180px;

    img{
        height: 160px;
    }
`;

export const Title = styled.div`
    font-size: 32px;
    font-weight: 800;
    padding-top: 24px;
    padding-bottom: 12px;
    color: #61a120;
    text-align: center;
    position: relative;

    &::after{
        position: absolute;
        left: calc(50% + -28px);
        content: '';
        width: 56px;
        height: 4px;
        background-color: #61a120;
        bottom: 0;
    }
`;

export const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 30%;
    width: 100%;
    max-width: 1280px;
    padding: 40px;
    margin: 0 auto;
    gap: 40px;
`;