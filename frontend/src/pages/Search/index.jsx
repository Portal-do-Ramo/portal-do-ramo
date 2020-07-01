import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Loader from '../../components/LoaderSpinner';

import { Screen, View, ViewResults } from './styles';

export default function Search () {
  const access_token = 'Bearer'.concat(sessionStorage.getItem('access_token'));
  const valueSearched = window.location.search.slice(1);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    api.get(`/api/usuarios/search?nome_completo=${valueSearched}`, {headers: { Authorization: access_token }})
    .then(response => setMembers(response.data))
    .catch(error => console.log(error.response))
  }, [])

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />
        {(members != '') ?
          <View>
            <h1>Resultados</h1>
            <ViewResults>
              <ul id="view">
                {members.map(member => (
                  <a href={'/profile?'.concat(member.matricula)}>
                    <div key={member.matricula} className="card">
                      <li className="member-item">
                        <img src={member.foto_url}/>
                        <div className="user-info">
                          <strong>{member.nome_completo}</strong><br />
                          <span>{member.hierarquia}</span>
                        </div>
                      </li>
                    </div>
                  </a>
                ))}
              </ul>
            </ViewResults>
          </View>
        :
          <div className="center">
            <Loader />
          </div>
        }
      </div>
    </Screen>
  )
}
