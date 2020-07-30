import React from 'react';
import styled from 'styled-components';

export const Card = styled.div`
  background-color: #F5F5F5;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 5px;
  color: #1D5EA8;

  img {
    width: 50px;
    float: left;
    border-radius: 30px;
    margin-top: -2px;
  }
`

export default function Card_Search_Member({ member }) {
  return (
    <a href={'/managemembers?' + member.matricula}>
      <Card id={member.matricula}>
        <li className="member-item">
          <header>
            <img src={member.foto_url} alt="avatar" />
            <div className="user-info">
              <strong>{member.nome_completo}</strong><br />
              {/* {member.hierarquia.nome} */}
            </div>
          </header>
        </li>
      </Card>
    </a>
  )
}
