import React from 'react';
import styled from 'styled-components';

export const BoxTitle = styled.h1`
  background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
  padding: 5px 15px 5px 15px;
  margin-top: -30px;
  margin-left: 30px;
  margin-bottom: 20px;
  border-radius: 5px;
  text-align: center;

  font-size: 20px;
  color: #FFF;
`

export default props =>
  <BoxTitle>{props.title}</BoxTitle>
