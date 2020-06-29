import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Card = styled.div`
  background: #E9EDF5;
  border-radius: 5px;
  padding: 10px 30px 10px 30px;
  margin-bottom: 5px;
  height: 64px;

  :hover {
    background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);

    h1, h2 {
      color: #FFF;
      text-decoration: none;
    }
  }

  .teamLogo {
    width: 37px;
    margin-top: 4px;
    margin-left: -10px;
    margin-right: 20px;
    float: left;
  }

  .teamName {
    color: #000;
    font-size: 15px;
    font-weight: bold;
  }

  .subtitleName {
    color: #393939;
    font-size: 13px;
  }
`

export default props =>
  <Link to={'/team/selected?'.concat(props.url)}>
    <Card>
      <img src={props.img} className="teamLogo" alt="logo" />
      <div>
        <h1 className="teamName">{props.name}</h1>
        <h2 className="subtitleName">{props.chapter} - {props.yourFunction}</h2>
      </div>
    </Card>
  </Link>

