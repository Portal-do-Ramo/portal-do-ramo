import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';

import { Screen, CardInput, BTNCircle, BTNNewInput } from './styles';

export default function NewPSI() {
  const access_token = 'Bearer'.concat(sessionStorage.getItem('access_token'));

  const [listProjects, setListProjects] = useState([]);
  const [listTeams, setListTeams] = useState([]);

  const [viewProjects, setViewProjects] = useState([]);
  var projects = [{projeto: "loja-ramo", areas_vagas: {"Programação": 3,"Arte": 4}}, {projeto: "combate", areas_vagas: {"Programação": 1,"Mecânica": 2}}];
  var viewAreaProjects = [];

  const [viewTeams, setViewTeams] = useState([]);
  var teams = [];
  var viewAreaTeams = [];

  const [viewManagement, setViewManagement] = useState([]);
  var management = [];
  var viewAreaManagement = [];

  const [id_projects, setID_Projects] = useState(0);
  const [id_teams, setID_Teams] = useState(0);
  const [id_management, setID_Management] = useState(0);

  useEffect(() => {
    api.get('/api/projetos/select-projetos', { headers: { Authorization: access_token } })
    .then(response => setListProjects(response.data))
    .catch(() => window.location.href="/error")
  }, [])

  useEffect(() => {
    api.get('/api/equipes', { headers: { Authorization: access_token } })
    .then(response => setListTeams(response.data))
    .catch(() => window.location.href="/error")
  }, [])

  function removeInputTeam(input) {
    var aux = viewTeams;
    aux.splice((viewTeams).indexOf(input), 1);
    console.log(viewTeams)
    setViewTeams(aux);
  }

  const newInputProject = (
    <CardInput id={'cardInputProject_' + id_projects}>
      <BTNCircle
        color="#AF0000"
        hoverColor="#FF0000"
        id={'btnDeleteProject_' + id_projects}
        onClick={e => {
          document.getElementById((e.target.id).replace('btnDeleteProject_','cardInputProject_')).hidden = true
        }}>x
      </BTNCircle>

      <BTNCircle
        color="#1D5EA8"
        hoverColor="#2B8DFC"
        id={'btnAddProject' + id_projects}
        onClick={e => {
          console.log(e.target.id)
        }}>+
      </BTNCircle>{console.log(viewTeams)}

      <select className="form-control" id={'selectProject_'.concat(id_projects)}>
        {listProjects.map(project => (
          <option key={project.nome_projeto_slug} value={project.nome_projeto_slug}>{project.nome_projeto}</option>
        ))}
      </select>

      {/* {(viewAreaProjects) ? viewAreaProjects.map(area => (
        <div>{area}</div>
      )) : ''} */}
    </CardInput>
  );

  const newInputTeam = (
    <CardInput id={'cardInputTeam_' + id_teams}>
      <BTNCircle
        color="#AF0000"
        hoverColor="#FF0000"
        id={'btnDeleteTeam_' + id_teams}
        onClick={e => {
          removeInputTeam((e.target.id).replace('btnDeleteTeam_','cardInputTeam_'))
          document.getElementById((e.target.id).replace('btnDeleteTeam_','cardInputTeam_')).hidden = true
        }}>x
      </BTNCircle>

      <BTNCircle
        color="#1D5EA8"
        hoverColor="#2B8DFC"
        onClick={e => {
          console.log('action')
        }}>+
      </BTNCircle>

      <select className="form-control" id={'selectTeam_'.concat(id_teams)}>
        {listTeams.map(team => (
          <option key={team.nome_equipe_slug} value={team.nome_equipe_slug}>{team.nome_equipe}</option>
        ))}
      </select>

      {/* {(area) ? area.map(input => (
        <div>{area}</div>
      )) : ''} */}
    </CardInput>
  );

  const newInputManagement = (
    <CardInput id={'cardInputManagement' + id_management}>
      <div className="row">
        <div className="col-md-6">
          <select className="form-control management-select" id={'management_'.concat(id_management)}>
            <option value="Assessor de Presidente">Assessor de Presidente</option>
            <option value="Assessor de Vice-Presidente">Assessor de Vice-Presidente</option>
            <option value="Assessor de Gestão">Assessor de Gestão</option>
          </select>
        </div>

        <div className="col-md-5">
          <input type="text" className="form-control" id="vacancies" name="vacancies" placeholder="Quantidade de vagas" required />
        </div>

        <div className="col-md-1">
          <BTNCircle
            color="#AF0000"
            hoverColor="#FF0000"
            id={'btnDeleteManagement' + id_management}
            onClick={e => {
              document.getElementById((e.target.id).replace('btnDeleteManagement','cardInputManagement')).hidden = true
            }}>x
          </BTNCircle>
        </div>
      </div>

      {/* {(area) ? area.map(input => (
        <div>{area}</div>
      )) : ''} */}
    </CardInput>
  );

  function createNewPSI() {
    api.post('api/psis', {
      nome: document.getElementById('namePSI').value,
      data_inicio: document.getElementById('initialDate').value,
      data_fim: document.getElementById('finalDate').value,
      gestao_areas_vagas: management,
      projetos: projects,
      equipes: teams
    }, { headers: { Authorization: access_token } })
    .then(response => console.log(response))
    .catch(error => console.log(error))
  }

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />
        <Title title="Novo Processo Seletivo Interno" />

        <form onSubmit={createNewPSI}>
          <div className="content">
            <h3>Dados gerais do PSI</h3>
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="namePSI">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="namePSI"
                  name="namePSI"
                  placeholder="Ex.: 2020.1"
                  required />
              </div>

              <div className="col-md-4">
                <label htmlFor="initialDate">Data inicial</label>
                <input
                  type="date"
                  className="form-control"
                  id="initialDate"
                  name="initialDate"
                  required />
              </div>

              <div className="col-md-4">
                <label htmlFor="finalDate">Data final</label>
                <input
                  type="date"
                  className="form-control"
                  id="finalDate"
                  name="finalDate"
                  required />
              </div>
            </div>

            <div className="box-vacancy">
              <hr />
              <h4>
                <BTNNewInput
                  onClick={e => {
                  e.preventDefault();
                  setID_Projects(id_projects + 1);
                  setViewProjects(() => [...viewProjects, newInputProject]);
                }}>+</BTNNewInput>
                Projetos
              </h4>

              {(viewProjects) ? viewProjects.map(project => (
                <div>{project}</div>
              )) : ''}
            </div>

            <div className="box-vacancy">
              <hr />
              <h4>
                <BTNNewInput
                  onClick={e => {
                  e.preventDefault();
                  setID_Teams(id_teams + 1);
                  setViewTeams(() => [...viewTeams, newInputTeam]);
                }}>+</BTNNewInput>
                Equipes
              </h4>

              {(viewTeams) ? viewTeams.map(team => (
                <div>{team}</div>
              )) : ''}
            </div>

            <div className="box-vacancy">
              <hr />
              <h4>
                <BTNNewInput
                  onClick={e => {
                  e.preventDefault();
                  setID_Management(id_management + 1);
                  setViewManagement(() => [...viewManagement, newInputManagement]);
                }}>+</BTNNewInput>
                Gestão
              </h4>

              {(viewManagement) ? viewManagement.map(vacancy => (
                <div>{vacancy}</div>
              )) : ''}
            </div>

            <hr />
            <div className="row center">
              <br />
              <button type="submit" className="btn-send">Criar</button>
            </div>
          </div>
        </form>
      </div>
      {/* {console.log(JSON.stringify(projects))} */}
    </Screen>
  )
}
