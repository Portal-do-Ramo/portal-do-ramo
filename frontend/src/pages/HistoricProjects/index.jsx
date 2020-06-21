import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';

import { Screen, ViewProjects, Card } from './styles';

export default function HistoricProjects () {
  document.title = 'Histórico de projetos';
  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));
  var urlData = window.location.search.slice(1);

  const [projects, setProjects] = useState([]);
  const matricula = useSelector(state => state.data[0]);

  if (urlData === "") {
    urlData = matricula;
  }

  useEffect(() => {
    api.get(`/api/projetos/historico-projetos/${urlData}`, { headers: { Authorization: access_token } })
    .then(response => setProjects(response.data))
    .catch(error => console.log(error.response))
  },[])

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />

        <Title title="Histórico de Projetos" />
        <div className="row">
          <div className="col-md-6">
            <div className="left-box-blue-gradient">
              {(projects != '') ?
                <div className="center">
                  <div className="center-box">
                    <img src={projects.foto_url} className="user-image" />
                    <h1 className="username">{((projects.nome_completo).split(' ')[0]).concat(' ' + (projects.nome_completo).split(' ')[1])}</h1>
                    <h3 className="userinfo">{projects.hierarquia}</h3>
                    <br />
                    <br />
                    <h3 className="userinfo">{projects.matricula}</h3>
                  </div>
                </div>
              : ''}
            </div>
          </div>
          <div className="col-md-6">
            <div className="right-box-gray">
              <ViewProjects>
                {(projects != '') ? (projects.projetos).map(pjt => (
                  <Card id={pjt.uuid} key={pjt.uuid} onClick={() => window.location.href = '/projects/manage/control?' + pjt.nome_projeto_slug}>
                    <h1 className="project-name">{pjt.nome_projeto}</h1>
                    <h2 className="project-info">{pjt.nome_equipe} - {pjt.funcao}</h2>
                    <h3 className="project-subinfo"><strong>Data de entrada:</strong> {pjt.data_entrada}</h3>
                    <h3 className="project-subinfo"><strong>Data de saída:</strong> {pjt.data_saida}</h3>
                    <h3 className="project-subinfo"><strong>Área:</strong> {pjt.area}</h3>
                  </Card>
                )) : ''}
              </ViewProjects>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}
