import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';

import { Screen, CardInput } from './styles';

export default function NewPSI() {
  document.title = 'Novo PSI';
  const access_token = 'Bearer'.concat(sessionStorage.getItem('access_token'));

  const [listProjects, setListProjects] = useState([]);
  const [listTeams, setListTeams] = useState([]);
  const [listManagement, setListManagement] = useState([]);

  var projects = [{projeto: "loja-ramo", areas_vagas: {"Programação": 3,"Arte": 4}}, {projeto: "combate", areas_vagas: {"Programação": 1,"Mecânica": 2}}];
  var teams = [];
  var management = [];

  var id_cards_projects = 0;
  var id_projects = 0;
  var last_project = '';

  const [id_teams, setID_Teams] = useState(0);
  const [id_management, setID_Management] = useState(0);
  const [enabledFirstPart, setIsEnabledFirstPart] = useState(true);
  const [enabledSecondPart, setIsEnabledSecondPart] = useState(false);
  const [enabledThirdPart, setIsEnabledThirdPart] = useState(false);
  const [enabledFourthPart, setIsEnabledFourthPart] = useState(false);
  const [uuid, setUUID] = useState('');
  const [alert, setAlert] = useState('');


  useEffect(() => {
    api.get('/api/projetos/select-projetos-psi', { headers: { Authorization: access_token } })
    .then(response => setListProjects(response.data))
    .catch(() => window.location.href="/error")
  }, [])


  useEffect(() => {
    api.get('/api/psis-tipos-areas', { headers: { Authorization: access_token } })
    .then(response => {
      setListManagement(response.data.gestão)
      setListTeams(response.data.equipe)
    })
    .catch(() => window.location.href="/error")
  }, [])


  setTimeout(() => {
    if (alert !== '') {
      setAlert('')
    }
  }, 4000);


  function initializePSI() {
    const name = document.getElementById('namePSI').value;
    const initial_date = document.getElementById('initialDate').value.split('-');
    const initial_date_formatted = initial_date[2] + '/' + initial_date[1] + '/' + initial_date[0];

    const final_date = document.getElementById('finalDate').value.split('-');
    const final_date_formatted = final_date[2] + '/' + final_date[1] + '/' + final_date[0];

    api.post('/api/psis', {
      nome_psi: name,
      data_inicio: initial_date_formatted,
      data_fim: final_date_formatted,
      gestao: [],
      projetos: [],
      equipes: []
    }, { headers: { Authorization: access_token } })
    .then(response => {
      setIsEnabledFirstPart(false)
      setIsEnabledSecondPart(true)
      setUUID(response.data)
      setAlert('<div class="alert alert-success" role="alert">PSI inicializado com sucesso! Complete o cadastro agora!</div>')
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert">Não foi possível inicializar o PSI! Se o problema persistir, contate a diretoria!</div>'))
  }


  function sendSecondPart() {
    let projects_formatted = [];
    let obj_aux = {projeto: '', areas_vagas: {}};

    for(let i = 0; i < listProjects.length; i++) {
      let areas = listProjects[i].areas;
      let areas_vagas = [];
      for (let j = 0; j < areas.length; j++) {
        if (document.getElementById('card-project-'+areas[j]).value === 'yes') {
          areas_vagas.push(areas[j])
        }
      }
      if(areas_vagas.length > 0) {
        obj_aux = {projeto: document.getElementById('card-project-nome-' + i).value, areas_vagas: areas_vagas}
        projects_formatted.push(obj_aux);
      }
    }

    api.post(`/psis/${uuid}/projetos`, {
      projetos: projects_formatted
    }, { headers: { Authorization: access_token } })
    .then(() => {
      setIsEnabledSecondPart(false)
      setIsEnabledThirdPart(true)
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert">Não foi possível adicionar áreas a PSI! Se o problema persistir, contate a diretoria!</div>'))
  }


  function sendThirdPart() {
    let teams_formatted = [];

    for (let i = 0; i < listTeams.length; i++) {
      if (document.getElementById('card-team-'+listTeams[i].nome_equipe_slug).value === 'yes') {
        let obj_aux = {equipe: listTeams[i].nome_equipe_slug, areas_vagas: ['Assessor de coordenador']};
        teams_formatted.push(obj_aux);
      }
    }

    api.post(`psis/${uuid}/equipes`, {
      equipes: teams_formatted
    }, { headers: { Authorization: access_token } })
    .then(() => {
      setIsEnabledSecondPart(false)
      setIsEnabledThirdPart(true)
    })
    .catch(() => setAlert('<div class="alert alert-danger" role="alert">Não foi possível adicionar assessorias a PSI! Se o problema persistir, contate a diretoria!</div>'))
  }


  function sendFourthPart() {
    let management_formatted = [];

    for (let i = 0; i < listManagement.length; i++) {
      if (document.getElementById('card-management-'+listManagement[i].nome_slug).value === 'yes') {
        let obj_aux = {nome_area_slug: listManagement[i].nome_slug, areas_vagas: [listManagement[i].nome]};
        management_formatted.push(obj_aux);
      }
    }

    api.post(`psis/${uuid}/gestao`, {
      gestao: management_formatted
    }, { headers: { Authorization: access_token } })
    .then(() => setAlert('<div class="alert alert-success" role="alert">Criação do PSI finalizada com sucesso!</div>'))
    .catch(() => setAlert('<div class="alert alert-danger" role="alert">Não foi possível adicionar áreas de gestão a PSI! Se o problema persistir, contate a diretoria!</div>'))
  }


  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <div className="center-alert">
          <div className="area-alert" id="alert" />
        </div>
        <Header />
        <Title title="Novo PSI" />

        {(enabledFirstPart) ?
          <div className="content">
            <h1 className="general-data-title">Dados gerais</h1>
            <div className="row">
              <div className="col-md-3">
                <label htmlFor="namePSI">Nome *</label>
                <input
                  type="text"
                  className="form-control"
                  id="namePSI"
                  name="namePSI"
                  placeholder="Ex.: 2020.1"
                />
              </div>

              <div className="col-md-3">
                <label htmlFor="initialDate">Data inicial *</label>
                <input
                  type="date"
                  className="form-control"
                  id="initialDate"
                  name="initialDate"
                />
              </div>

              <div className="col-md-3">
                <label htmlFor="finalDate">Data final *</label>
                <input
                  type="date"
                  className="form-control"
                  id="finalDate"
                  name="finalDate"
                />
              </div>

              <div className="col-md-3">
                <br />
                <button className="btn-send" onClick={ () => initializePSI() }>
                  Enviar
                </button>
              </div>
            </div>
          </div>
        :
          <div className="area-vagas">
            <h1 className="title-area">Dados gerais</h1>
          </div>
        }

        {(enabledSecondPart) ?
          (listProjects) ?
            <div className="area-vagas">
              <h1 className="title-area">Projetos</h1>
              <p>Marque as áreas dos projetos que você deseja abrir vagas. <strong>Preste atenção, após clicar em "Salvar" não é possível mais fazer alterações.</strong> Lembrando, para o projeto ser listado, o mesmo precisa ter áreas cadastradas!</p>
              {(listProjects).map(project => (
                (project.areas.length > 0) ?
                  <CardInput id={'card-project-' + (id_cards_projects)}>
                    {(last_project !== project.nome_projeto_slug) ? <div hidden={true}>{(id_projects = 0)}</div> : ''}
                    <h1>{project.nome_projeto}</h1>
                    <h2>{project.nome_equipe}</h2>
                    {(project.areas) ? (project.areas).map(area => (
                      <div className="row">
                        <div className="col-sm-3 down">
                          <label>{area}</label>
                        </div>
                        <div className="col-sm-2">
                          <select className="form-control" id={'card-project-'+ area}>
                            <option value="no">Não</option>
                            <option value="yes">Sim</option>
                          </select>
                        </div>
                      </div>
                    )) : ''}
                    <input type="hidden" id={'card-project-nome-' + (id_cards_projects)} value={project.nome_projeto_slug} />
                    <div hidden={true}>{ last_project = project.nome_projeto_slug }</div>
                    <div hidden={true}>{ id_cards_projects++ }</div>
                  </CardInput>
                : ''
              ))}
              <div className="button-area">
                <button className="btn-send" onClick={ () => sendSecondPart() }>
                  Salvar
                </button>
              </div>
            </div>
          : ''
        :
          <div className="area-vagas">
            <h1 className="title-area">Projetos</h1>
          </div>
        }

        {(enabledThirdPart) ?
          (listTeams) ?
            <div className="area-vagas">
              <h1 className="title-area">Assessoria</h1>
              <p>Marque as equipes que você deseja abrir vagas para assessoria de coordenador. <strong>Preste atenção, após clicar em "Salvar" não é possível mais fazer alterações.</strong></p>
              {(listTeams).map(team => (
                <CardInput>
                  <div className="row">
                    <div className="col-sm-3 down">
                      <label>{team.nome_equipe}</label>
                    </div>
                    <div className="col-sm-2">
                      <select className="form-control" id={'card-team-'+ team.nome_equipe_slug}>
                        <option value="no">Não</option>
                        <option value="yes">Sim</option>
                      </select>
                    </div>
                  </div>
                </CardInput>
              ))}
              <div className="button-area">
                <button className="btn-send" onClick={ () => sendThirdPart() }>
                  Salvar
                </button>
              </div>
            </div>
          : ''
        :
          <div className="area-vagas">
            <h1 className="title-area">Assessoria</h1>
          </div>
        }
        {(enabledFourthPart) ?
          (listManagement) ?
            <div className="area-vagas">
              <h1 className="title-area">Gestão</h1>
              <p>Marque as áreas de gestão que você deseja abrir vagas. <strong>Preste atenção, após clicar em "Salvar" não é possível mais fazer alterações.</strong></p>
              {(listManagement).map(management => (
                <CardInput>
                  <div className="row">
                    <div className="col-sm-3 down">
                      <label>{management.nome}</label>
                    </div>
                    <div className="col-sm-2">
                      <select className="form-control" id={'card-management-'+ management.nome_slug}>
                        <option value="no">Não</option>
                        <option value="yes">Sim</option>
                      </select>
                    </div>
                  </div>
                </CardInput>
              ))}
              <div className="button-area">
                <button className="btn-send" onClick={ () => sendFourthPart() }>Salvar</button>
              </div>
            </div>
          : ''
        :
          <div className="area-vagas">
            <h1 className="title-area">Gestão</h1>
          </div>
        }
      </div>
    </Screen>
  )
}
