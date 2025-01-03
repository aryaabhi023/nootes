import React from 'react';
import styled from 'styled-components';

const ScreenLoader = () => {
  return (
    <StyledWrapper>
      <div className="loader" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader ,.loader::before,.loader::after {
    border-width: 2px;
    border-style: solid;
    border-radius: 10px;
    animation: rotate 5s linear infinite;
  }

  .loader {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 40px;
    height: 40px;
    border-color: #5a4ff3;
  }

  .loader::before,.loader::after {
    position: absolute;
    content: "";
  }

  .loader::before {
    border-color: #35a2d2;
    width: 110%;
    height: 110%;
    animation-delay: .5s
  }

  .loader::after {
    border-color: #9c40fc;
    width: 120%;
    height: 120%;
    animation-delay: .10s;
  }

  @keyframes rotate {
    to {
      transform: rotate(360deg)
    }
  }`;

export default ScreenLoader;
