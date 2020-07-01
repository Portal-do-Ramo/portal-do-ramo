import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Profile_Header from '../../components/Profile_Header';
import Loader from '../../components/LoaderSpinner';

import active from './images/active.png';
import payingMember from './images/paying.png';

import { Screen, Content, Box, Title } from './styles';

export default function Profile(){
  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));
  const matricula = useSelector(store => store.data[0])
  const user = (window.location.search.slice(1) !== '') ? window.location.search.slice(1) : matricula;

  const [userData, setUserData] = useState([]);
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get(`/api/usuarios/perfil/${user}`, { headers: { Authorization: access_token }})
    .then(response => {
      setUserData(response.data)
      setTeams(response.data.equipes)
      setProjects(response.data.projetos)
    })
    .catch(() => window.location.href = '/error')
  }, [])

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      {(userData == '') ?
        <div className="container loader">
          <Loader />
        </div>
      :
        <div className="container">
          <Profile_Header name={userData.nome_completo} hierarchy={userData.hierarquia} url_picture={userData.foto_url} />
          <Content>
            <div className="row">
              <div className="col-md-4">
                <Box>
                  <div className="row">
                    <Title>
                      Informações Pessoais
                    </Title>
                  </div>

                  <div className="medal-box row">
                    {(userData) ?
                      (userData.ativo) ?
                        <img src={active} className="medal" title="Usuário ativo" alt="Usuário ativo"/>
                      : ''
                    : ''}
                    {(userData) ?
                      (userData.pagante) ?
                        <img src={payingMember} className="medal" title="Membro pagante" alt="Membro pagante"/>
                      : ''
                    : ''}
                  </div>

                  <ul>
                    <li className="user-info"><strong>Nome:</strong> {userData.nome_completo}</li>
                    <li className="user-info"><strong>Curso:</strong> {userData.curso}</li>
                    <li className="user-info"><strong>Data de Nascimento:</strong> {userData.data_nascimento}</li>
                    <li className="user-info"><strong>Idade:</strong> {userData.idade}</li>
                    <li className="user-info"><strong>Celular:</strong> {userData.celular}</li>
                    <li className="user-info"><strong>E-mail:</strong> {userData.email}</li>
                  </ul>
                </Box>
              </div>

              <div className="col-md-4">
                <Box>
                  <div className="row">
                    <Title>
                      Equipes
                    </Title>
                  </div>

                  <ul>
                    {(teams) ? teams.map(team => (
                      <li key={team.nome_equipe_slug}>
                        <button className="card" onClick={() => window.location.href=`/team/view?${team.nome_equipe_slug}`}>
                          <div>
                            <img src={team.foto_url} alt="logo" />
                            <div>
                              <strong className="text">{team.nome_equipe}</strong><br />
                              <span className="text">{team.capitulo} - {team.funcao}</span>
                            </div>
                          </div>
                        </button>
                      </li>
                    )) : ''}
                  </ul>
                </Box>
              </div>

              <div className="col-md-4">
                <Box>
                  <div className="row">
                    <Title>
                      Projetos
                    </Title>
                  </div>

                  <ul>
                    {projects.map(project => (
                      <li key={project.nome_projeto_slug}>
                        <button className="card" onClick={() => window.location.href=`/projects/view?${project.nome_equipe_slug}`}>
                          <div>
                            <img src={project.foto_url} alt="logo" />
                            <div>
                              <strong className="text">{project.nome_projeto}</strong><br />
                              <span className="text">{project.nome_equipe}</span>
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </Box>
              </div>
            </div>
          </Content>
        </div>
      }
    </Screen>
  )
}
