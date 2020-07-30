import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';
import Loader from '../../components/LoaderSpinner';

import { Screen } from './styles';

export default function MyProjects () {
  document.title = 'Meus projetos';
  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/api/projetos/meus-projetos', { headers: { Authorization: access_token } })
    .then(response => setProjects(response.data))
    .catch(() => window.location.href = "/error")
  }, [])

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />

        <Title title="Meus projetos" />

        {(projects) ?
          <div>
            <div className="active-projects">
              <h1 className="status">Ativos</h1>
              <div className="row">
                {(projects) ?
                  projects.map(project => (
                    (project.ativo) ?
                      <div className="col-md-3">
                        <Link to={'/projects/selected?' + project.nome_projeto_slug}>
                          <div className="card">
                            <h1 className="project-title">{project.nome_projeto}</h1>
                            <h2 className="project-subtitle">{project.nome_equipe}</h2>
                            <span>{project.funcao}</span>
                          </div>
                        </Link>
                      </div>
                    : ''
                  ))
                : ''}
              </div>
            </div>

            <div className="finalized-projects">
              <h1 className="status">Finalizados</h1>
              <div className="row">
                {(projects) ?
                  projects.map(project => (
                    (!project.ativo) ?
                      <div className="col-md-3">
                        <Link to={'/projects/selected?' + project.nome_projeto_slug}>
                          <div className="card">
                            <h1 className="project-title">{project.nome_projeto}</h1>
                            <h2 className="project-subtitle">{project.nome_equipe}</h2>
                            <span>{project.funcao}</span>
                          </div>
                        </Link>
                      </div>
                    : ''
                  ))
                : ''}
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
  )
}
