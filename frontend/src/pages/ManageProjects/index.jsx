import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';
import Loader from '../../components/LoaderSpinner';

import { Screen, TitleBox, ViewResults, CardTeam, Card } from './styles';

export default function ManageProjects () {
  document.title = 'Gerenciar projeto';
  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));
  const hierarquia = (useSelector(state => state.data[4]));

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState();

  useEffect(() => {
    api.get('api/projetos', { headers: { Authorization: access_token } })
    .then(response => setProjects(response.data))
    .catch(() => window.location.href = '/error')
  }, [])

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />

        <Title title="Gerenciar projeto" />

        <div className="row">
          <div className="col-md-6">
            <div className="left-box-gray">
              <div className="row">
                <TitleBox>
                  Projetos
                </TitleBox>
                <Link to='/projects/new-project' className="btn-add">
                  +
                </Link>
              </div>

              <ViewResults>
                <ul>
                  {(projects != '') ? projects.map(team => (
                    <CardTeam key={team.nome_equipe_slug}>
                      <h1 className="teamName">{team.nome_equipe}</h1>
                      {(team.projetos) ?
                        (team.projetos).map(project => (
                          <Card key={project.nome_projeto_slug} onClick={() => setSelectedProject(project)}>
                            <li>
                              <header>
                                <div>
                                  <strong>{project.nome_projeto}</strong><br />
                                  {project.estagio}
                                </div>
                              </header>
                            </li>
                          </Card>
                        ))
                      :  ''}
                    </CardTeam>
                  )) : <div className="flex-center"><Loader /></div>}
                </ul>
              </ViewResults>
            </div>
          </div>

          <div className="col-md-6">
            <div className="right-box-blue-gradient">
              <div className="viewMember">
                {(selectedProject) ? (
                  <div className="center">
                    <div className="center-box">
                      <h1 className="title-project">{selectedProject.nome_projeto}</h1>
                      <hr />
                      <h3>{selectedProject.nome_equipe}</h3>
                      <br />
                      <br />
                      <h3>{selectedProject.estagio}</h3>
                      <h3 className="qty-members">{selectedProject.contagem_membros} membros</h3>
                      <h3><strong>Data de início:</strong> {selectedProject.data_inicio}</h3>
                      <h3><strong>Data de término:</strong> {selectedProject.data_fim}</h3>
                      <br /><br />
                      <Link to={'/projects/manage/control?'.concat(selectedProject.nome_projeto_slug)}>Gerenciar</Link>
                    </div>
                  </div>
                ) : (
                  <div className="center-flex"><h1>Selecione um projeto</h1></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}
