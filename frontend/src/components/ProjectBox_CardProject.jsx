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

    h1, p {
      text-decoration: none;
      color: #FFF;
    }
  }

  .projectLogo {
    width: 37px;
    margin-top: 4px;
    margin-left: -10px;
    margin-right: 20px;
    float: left;
  }
`

export const ProjectName = styled.h1`
  color: #303030;
  font-size: 15px;
  font-weight: bold;
`

export const TeamProject = styled.p`
  color: #797B80;
  font-size: 12px;
`

export default props =>
  <Link to={`/projects/selected?${props.slug}`}>
    <Card>
      <img src={props.img} className="projectLogo" alt="logo" />
      <div>
        <ProjectName>{props.project}</ProjectName>
        <TeamProject>{props.team}</TeamProject>
      </div>
    </Card>
  </Link>
