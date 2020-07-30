import React from 'react';
import styled from 'styled-components';

export const Card = styled.a`
  background: #E5E5E5;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  width: 100%;
  margin-bottom: 10px;

  h1 {
    font-size: 13pt;
    margin-top: 5px;
  }
`

export default function Card_Selective_Process (props) {
  return (
    <>
      <Card className="btn btn-default" id={props.id} href={'/selectiveprocess?' + props.id}>
        <h1>{props.type} - {props.period}</h1>
      </Card>
    </>
  )
}
