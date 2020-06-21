import React from 'react';
import styled from 'styled-components';

export const PagesTitle = styled.h1`
  color: #1D5EA8;
  font-size: 25pt;
  text-align: left;
  padding-top: 35px;
  padding-bottom: 0px;
  padding-left: 20px;
`

export default props =>
  <PagesTitle>{props.title}</PagesTitle>
