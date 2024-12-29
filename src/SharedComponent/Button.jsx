import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Button = ({ name, onClick }) => {
  const navigate = useNavigate();
  return (
    <StyledWrapper>
      <button data-label="Register" className="rainbow-hover" 
      onClick={() => {
        if(onClick){
          onClick();
        }
      }}>
        <span className="sp">{name}</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .rainbow-hover {
    font-size: 16px;
    font-weight: 700;
    color: #ff7576;
    background-color:rgb(7, 15, 52);
    border: none;
    outline: none;
    cursor: pointer;
    padding: 12px 24px;
    position: relative;
    line-height: 24px;
    border-radius: 9px;
    box-shadow: 0px 1px 2px #2B3044,
      0px 4px 16px #2B3044;
    transform-style: preserve-3d;
    transform: scale(var(--s, 1)) perspective(600px)
      rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
    perspective: 600px;
    transition: transform 0.1s;
  }

  .sp {
    background: linear-gradient(
        90deg,
        #866ee7,
        #ea60da,
        #ed8f57,
        #fbd41d,
        #2cca91
      );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    display: block;
  }

  .rainbow-hover:active {
    transition: 0.3s;
    transform: scale(0.93);
  }`;

export default Button;
