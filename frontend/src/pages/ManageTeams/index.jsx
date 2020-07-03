import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from "../../services/api";

import Top_Left_Side_Menu from "../../components/Top_Left_Side_Menu";
import Bottom_Right_Side_Menu from "../../components/Bottom_Right_Side_Menu";
import Header from "../../components/Home_Header";
import Title from "../../components/Title";
import Loader from "../../components/LoaderSpinner";

import { Screen, Card } from "./styles";
import team_undefined from './images/team_undefined.png';

export default function ManageTeams() {
  document.title = "Gerenciar equipe";
  const access_token = "Bearer".concat(sessionStorage.getItem("access_token"));
  const hierarquia = (useSelector(state => state.data[4]));

  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  if (
    hierarquia !== 'Presidente' &&
    hierarquia !== 'Vice-Presidente' &&
    hierarquia !== 'Diretor de Gestão de Pessoas' &&
    hierarquia !== 'Diretor de Projetos'
  ) {
    window.location.href = '/noaccess'
  }

  useEffect(() => {
    api.get('/api/equipes', { headers: { Authorization: access_token } })
    .then(response => setTeams(response.data))
    .catch(() => window.location.href = '/error')
    .catch(error => console.log(error.response))
    .finally(() => setIsLoaded(true))
  }, [])

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />
      <div className="container">
        <Header />
        <Title title="Gerenciar Equipes" />

        {(isLoaded) ?
          <div className="row area-card">
            {(teams) ?
              teams.map(team => (
                <div className="col-md-4" key={team.nome_equipe_slug}>
                  <Link to={`/team/manageteams/manage?${team.nome_equipe_slug}`}>
                    <Card key={team.nome_equipe_slug}>
                      <div className="logo-area">
                        <img src={team.foto_url} />
                      </div>
                      <h1 className="team-name">{team.nome_equipe}</h1>
                      <div className="area-info">
                        <h2 className="team-info">{team.nome_coordenador.split(' ')[0].concat(' ' + team.nome_coordenador.split(' ')[1])}</h2>
                        <h2 className="team-info"><strong>Membros:</strong> {team.contagem_membros}</h2>
                        <h2 className="team-info"><strong>Projetos:</strong> {team.contagem_projetos}</h2>
                      </div>
                    </Card>
                  </Link>
                </div>
              ))
            : ''}

            <div className="col-md-4">
              <Link to={`/team/manageteams/newteam`}>
                <Card>
                  <div className="logo-area">
                    <img src={team_undefined} />
                  </div>
                  <div className="center">
                    <h1>Criar nova equipe</h1>
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        :
          <div className="area-loader">
            <Loader />
          </div>
        }
      </div>
    </Screen>
  );
}
