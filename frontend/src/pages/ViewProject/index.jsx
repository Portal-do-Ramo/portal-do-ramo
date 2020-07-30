import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';
import Loader from '../../components/LoaderSpinner';

import { Screen } from './styles';

export default function ViewProject() {
  document.title = "Ver projeto";
  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));
  const urlData = window.location.search.slice(1);

  const [project, setProject] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  if (urlData === '') {
    window.location.href = '/error';
  }

  useEffect(() => {
    api.get(`/api/projetos/${urlData}`, { headers: { Authorization: access_token } })
    .then(response => setProject(response.data))
    .catch(() => window.location.href = '/error')
  }, [])

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />

        {(project) ?
          <div>
            <Title title={project.nome} />

            <div className="row">
              <div className="col-md-6">
                <div className="left-box-gray">
                  <img src={project.foto_equipe} alt="logo" />
                  <h1>{project.nome_equipe}</h1>
                  <h2><strong>Líder: </strong>{project.lider.nome_completo.split(' ')[0].concat(' ' + project.lider.nome_completo.split(' ')[1])}</h2>
                  <h3><strong>Início: </strong>{project.data_inicio.split('-')[2].concat('/' + project.data_inicio.split('-')[1].concat('/' + project.data_inicio.split('-')[0]))}</h3>
                  <h3><strong>Estágio: </strong>{project.estagio}</h3>
                  <h1></h1>
                  <h1></h1>
                </div>
              </div>
              <div className="col-md-6">
                <div className="right-box-blue-gradient">
                  <h1 className="title-box-right">Membros</h1>
                  <div className="view-members">
                    {(project.membros) ?
                      (project.membros).map(member => (
                        <Link to={'/profile?'.concat(member.matricula)} key={member.matricula} >
                          <img src={member.foto_url} className='member-icon' title={member.nome_completo} alt={member.nome_completo}/>
                        </Link>
                      ))
                    : ''}
                  </div>
                  <h1 className="title-box-right">Áreas</h1>
                  <div className="view-members">
                    {(project.areas) ?
                      (project.areas).map(area => (
                        <div key={area}>
                          <h1 className="box-area">{area}</h1>
                        </div>
                      ))
                    : ''}
                  </div>
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
  )
}
