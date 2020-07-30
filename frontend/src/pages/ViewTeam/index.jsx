import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from "../../services/api";

import Top_Left_Side_Menu from "../../components/Top_Left_Side_Menu";
import Bottom_Right_Side_Menu from "../../components/Bottom_Right_Side_Menu";
import Header from "../../components/Home_Header";
import Title from "../../components/Title";
import Loader from "../../components/LoaderSpinner";

import { Screen, Card, ViewProjects } from "./styles";

export default function TeamScreen() {
  document.title = "Ver equipe";
  const access_token = "Bearer".concat(sessionStorage.getItem("access_token"));
  const urlData = window.location.search.slice(1);

  const [teamData, setTeamData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  if (urlData === '') {
    window.location.href = '/error';
  }

  useEffect(() => {
    api.get(`/api/equipes/${urlData}`, { headers: { Authorization: access_token } })
    .then(response => setTeamData(response.data))
    .catch(() => (window.location.href = "/error"))
    .finally(() => setIsLoaded(true));
  }, []);

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />

        {(isLoaded) ?
          <div>
            <Title title={teamData.nome_equipe} />

            <div className="row">
              <div className="col-md-6">
                <div className="left-box-gray">
                  <div className="info">
                    {(teamData) ?
                      <div>
                        <img src={teamData.foto_url} />
                        <h1>{teamData.coordenador.nome_completo.split(' ')[0].concat(' ' + teamData.coordenador.nome_completo.split(' ')[1])}</h1>
                        <span><strong>Coordenador</strong></span>
                        <br />
                        <br />
                        <h3><strong>Membros:</strong> {teamData.membros.length}</h3>
                        <h3><strong>Projetos:</strong> {teamData.projetos.length}</h3>
                      </div>
                    : ''}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="right-box-blue-gradient">
                  <ViewProjects>
                    {(teamData != '') ?
                      (teamData.projetos) ?
                        (teamData.projetos).map(pjt => (
                          <Card onClick={() => window.location.href = '/projects/view?' + pjt.nome_projeto_slug}>
                            <h1 className="project-name">{pjt.nome_projeto}</h1>
                            <h2 className="project-info">{pjt.nome_equipe}</h2>
                            <h3 className="project-subinfo"><strong>Status:</strong> {pjt.situacao}</h3>
                            <h3 className="project-subinfo"><strong>Data de início:</strong> {pjt.data_inicio}</h3>
                          </Card>
                        ))
                      : ''
                    : ''}
                  </ViewProjects>
                </div>
              </div>
            </div>
          </div>
        :
          <div className="loader-area">
            <Loader />
          </div>
        }
      </div>
    </Screen>
  );
}
