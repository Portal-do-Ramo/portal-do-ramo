import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';

import { Screen, Content, Card, BTNNewInput, BTNDefault, BTNCircle } from './styles';

export default function ControlPSI() {
  document.title = 'Gerenciar PSI';
  const access_token = 'Bearer'.concat(sessionStorage.getItem('access_token'));

  const [listProjects, setListProjects] = useState([]);
  const [listTeams, setListTeams] = useState([]);
  const [listManagement, setListManagement] = useState([]);
  const [psiData, setPSIData] = useState();

  const [inputsProjects, setInputsProjects] = useState([]);
  const [inputsTeams, setInputsTeams] = useState([]);
  const [inputsManagement, setInputsManagement] = useState([]);

  const [idProjectCard, setIdProjectCard] = useState(0);
  const [idTeamCard, setIdTeamCard] = useState(0);
  const [idManagementCard, setIdManagementCard] = useState(0);

  const urlData = window.location.search.slice(1);

  useEffect(() => {
    api.get(`/api/psis/${urlData}`, { headers: { Authorization: access_token } })
    .then(response => {
        console.log(response.data)
        setPSIData(response.data)
    })
    .catch(error => console.log(error.response))
  }, []);


  useEffect(() => {
    api.get('/api/projetos/select-projetos', { headers: { Authorization: access_token } })
    .then(response => setListProjects(response.data))
    .catch(error => console.log(error.response.data))
  }, []);


  useEffect(() => {
    api.get('/api/equipes', { headers: { Authorization: access_token } })
    .then(response => setListTeams(response.data))
    .catch(error => console.log(error.response.data))
  }, []);

  useEffect(() => {
    api.get('/api/psis/tipos-area', { headers: { Authorization: access_token } })
    .then(response => console.log(response.data))
    .catch(error => console.log(error.response.data))
  }, []);


  function editGeneralDataPSI() {
    // api.put(`/api/psis/${id}`, {
    //   nome: document.getElementById('namePSI').value,
    //   data_inicial: document.getElementById('initialDate').value,
    //   data_final: document.getElementById('finalDate').value
    // },{ headers: { Authorization: access_token } })
    // .then(response => console.log(response))
    // .catch(error => console.log(error))
  }


  const newInputProject = (
    <Card id={'project-card-'.concat(idProjectCard)}>
      <BTNCircle color="#AF0000" hoverColor="#FF0000" onClick={e => console.log('action')}>x</BTNCircle>
      <BTNCircle color="#1D5EA8" hoverColor="#2B8DFC" onClick={e => console.log('action')}>+</BTNCircle>
      <select className="form-control">
        {listProjects.map(project => (
          <option key={project.nome_projeto_slug} value={project.nome_projeto_slug}>{project.nome_projeto}</option>
        ))}
      </select>
      <div className="row">

      </div>
    </Card>
  );

  const newInputTeam = (
    <Card id={'team-card-'.concat(idTeamCard)}>
      <BTNCircle color="#AF0000" hoverColor="#FF0000" onClick={e => console.log('action')}>x</BTNCircle>
      <BTNCircle color="#1D5EA8" hoverColor="#2B8DFC" onClick={e => console.log('action')}>+</BTNCircle>
      <select className="form-control">
        {listTeams.map(team => (
          <option key={team.nome_equipe_slug} value={team.nome_equipe_slug}>{team.nome_equipe}</option>
        ))}
      </select>
      <div className="row">

      </div>
    </Card>
  );

  const newInputManagement = (
    <Card id={'management-card-'.concat(idManagementCard)}>
      <div className="row">
        <div className="col-md-6">
          <select className="form-control management-select">
            <option value="Assessor de Presidente">Assessor de Presidente</option>
            <option value="Assessor de Vice-Presidente">Assessor de Vice-Presidente</option>
            <option value="Assessor de Gestão">Assessor de Gestão</option>
            {/* {listManagement.map(item => (
                <option key={item.nome_slug} value={item.nome}>{item.nome}</option>
            ))} */}
          </select>
        </div>

        <div className="col-md-5">
          <input type="text" className="form-control" name="qty_vacancies_of_management" placeholder="Quantidade de vagas" required />
        </div>

        <div className="col-md-1">
          <BTNCircle color="#AF0000" hoverColor="#FF0000">x</BTNCircle>
        </div>
      </div>
    </Card>
  );

  const newVacancy = (
    <div className="col-md-3">
      <h5 className="title-area">Área</h5>
      <input type="text" className="form-control" name="vacancies" placeholder="Nome da área" required />
      <input type="text" className="form-control input-down" name="qty_vacancies" placeholder="Quantidade de vagas" required />
    </div>
  );

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <Header />
        <Title title="Gerenciar PSI" />

        <Content>
          <h3>Dados gerais do PSI</h3>

          <form onSubmit={editGeneralDataPSI}>
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="namePSI">Nome do Processo Seletivo</label>
                <input
                  type="text"
                  className="form-control"
                  id="namePSI"
                  defaultValue={(psiData) ? psiData.nome_psi : ''}
                  required />
              </div>

              <div className="col-md-4">
                <label htmlFor="initialDate">Data de Abertura</label>
                <input
                  type="date"
                  className="form-control"
                  id="initialDate"
                  defaultValue={(psiData) ? psiData.data_inicio : ''}
                  required />
              </div>

              <div className="col-md-4">
                <label htmlFor="finalDate">Data de Fechamento</label>
                <input
                  type="date"
                  className="form-control"
                  id="finalDate"
                  defaultValue={(psiData) ? psiData.data_fim : ''}
                  required />
              </div>
            </div>

            <br />
            <span>Processo seletivo criado em {(psiData) ? psiData.data_criada : ''} por:</span>

            <Link to={'/profile?'.concat((psiData) ? psiData.membro_criou.matricula : '')}>
              <div className="card">
                <header>
                  <img src={(psiData) ? psiData.membro_criou.foto_url : ''}/>
                  <div>
                    <h1>{(psiData) ? psiData.membro_criou.nome_completo : ''}</h1>
                    <h2>{(psiData) ? psiData.membro_criou.hierarquia.nome : ''}</h2>
                  </div>
                </header>
              </div>
            </Link>

            <hr />
            <h4>
              <BTNNewInput
                onClick={e => {
                  e.preventDefault();
                  setIdProjectCard(idProjectCard + 1);
                  setInputsProjects(() => [...inputsProjects, newInputProject])
              }}>+</BTNNewInput>
              Projetos
            </h4>
            {(inputsProjects) ? inputsProjects.map(project => (
              <div>{project}</div>
            )) : ''}

            <hr />
            <h4>
              <BTNNewInput
                className="btn-newInput"
                onClick={e => {
                  e.preventDefault();
                  setIdTeamCard(idTeamCard + 1);
                  setInputsTeams(() => [...inputsTeams, newInputTeam])
              }}>+</BTNNewInput>
              Equipes
            </h4>
            {(inputsTeams) ? inputsTeams.map(team => (
              <div>{team}</div>
            )) : ''}

            <hr />
            <h4>
              <BTNNewInput
                className="btn-newInput"
                onClick={e => {
                    e.preventDefault();
                    setIdManagementCard(idManagementCard + 1);
                    setInputsManagement(() => [...inputsManagement, newInputManagement])
              }}>+</BTNNewInput>
              Gestão
            </h4>
            {(inputsManagement) ? inputsManagement.map(management => (
              <div>{management}</div>
            )) : ''}

            <hr />
            <div className="center">
              <BTNDefault onClick={ () => window.history.back() }>Cancelar</BTNDefault>
              <BTNDefault type="submit">Alterar</BTNDefault>
            </div>
          </form>
        </Content>
      </div>
    </Screen>
  )
}
