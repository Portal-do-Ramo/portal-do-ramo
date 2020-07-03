import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useSelector } from 'react-redux';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';

import { Screen, Content, Card, CardInputArea } from './styles';
import crown from './images/crown.png';
import avatar from './images/avatar.png';

export default function ManageProject () {
  document.title = 'Novo projeto';
  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));
  const hierarquia = (useSelector(state => state.data[4]));

  const [alert, setAlert] = useState('');
  const [members, setMembers] = useState([]);
  const [listTeams, setListTeams] = useState([]);
  const [slugname, setSlugname] = useState('');
  const [percent, setPercent] = useState(0);

  const [leader, setLeader] = useState('');
  const [advisor, setAdvisor] = useState('');

  const [count_id, setCount_ID] = useState(0);
  const [viewAreas, setViewAreas] = useState('');

  setTimeout(() => {
    if (alert !== '') {
      setAlert('')
    }
  }, 4000);

  useEffect(() => {
    api.get('api/usuarios', { headers: { Authorization: access_token } })
    .then(response => setMembers(response.data))
    .catch(error => console.log(error.response))
  }, [])


  useEffect(() => {
    api.get('/api/equipes', { headers: { Authorization: access_token } })
    .then(response => setListTeams(response.data))
    .catch(() => window.location.href)
  }, [])


  function sendData() {
    const initial_date = document.getElementById('initial_date').value.split('-');
    const initial_date_formatted = initial_date[2] + '/' + initial_date[1] + '/' + initial_date[0];

    const final_date = document.getElementById('final_date').value.split('-');
    const final_date_formatted = final_date[2] + '/' + final_date[1] + '/' + final_date[0];

    var areasFormatted = [];

    for(var i=0; i<count_id; i++) {
      areasFormatted.push(document.getElementById('area_name_'.concat(i)).value)
    }

    api.post(`/api/projetos`, {
      data_inicio: initial_date_formatted,
      data_fim: final_date_formatted,
      nome_projeto: document.getElementById('project_name').value,
      matricula_lider: (leader) ? leader.matricula : '',
      matricula_assessor: (advisor) ? advisor.matricula : '',
      nome_equipe: document.getElementById('team_name').value,
      porcentagem_orcamento: document.getElementById('percent').value,
      link_trello: document.getElementById('link_trello').value,
      areas: areasFormatted
    }, { headers: { Authorization: access_token } })
    .then(() => setAlert('<div class="alert alert-success" role="alert"><strong>Projeto criado com sucesso!</strong></div>'))
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível criar o projeto.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  const newInputArea = (
    <div className="outside-area col-md-6" key={'cardInputArea_' + count_id}>
      <CardInputArea id={'cardInputArea_' + count_id} >
        <label htmlFor={'area_name_'.concat(count_id)}>Nome da área *</label>
        <input type="text" className="form-control" id={'area_name_'.concat(count_id)} name={'area_name_'.concat(count_id)} required />
      </CardInputArea>
    </div>
  );


  useEffect(() => {
    document.getElementById('alert').innerHTML = alert;
  })


  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <div className="center-alert">
          <div className="area-alert" id="alert" />
        </div>
        <Header />

        <Title title="Novo projeto" />

        <Content>
          <h2>Dados gerais</h2>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="project_name">Nome do projeto *</label>
              <input
                type="text"
                className="form-control"
                id="project_name"
                placeholder="Nome do projeto"
                onChange={e => setSlugname(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="initial_date">Data de início *</label>
              <input type="date" id="initial_date" className="form-control" defaultValue="27/02/2000" required/>
            </div>
            <div className="col-md-3">
              <label htmlFor="final_date">Data de término *</label>
              <input type="date" id="final_date" className="form-control" required/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <label htmlFor="project_slug_name">Código do projeto *</label>
              <input
                type="text"
                className="form-control"
                id="project_slug_name"
                placeholder="Gerado automaticamente"
                readOnly
                value={(((slugname).toLowerCase()).split(' ')).join('-')}
                required
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="link_trello">Link do Trello *</label>
              <input
                type="url"
                className="form-control"
                id="link_trello"
                placeholder="Link do board do trello"
                required
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="final_date">Equipe *</label>
              <select className="form-control" id='team_name'>
                {listTeams.map(team => (
                  <option key={team.nome_equipe_slug} value={team.nome_equipe_slug}>{team.nome_equipe}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="percent" title="Em relação ao caixa da equipe selecionada">{percent}% no Orçamento *</label>
              <input
                type="range"
                id="percent"
                minLength={0}
                maxLength={100}
                className="form-control"
                value={percent}
                onChange={e => setPercent(e.target.value)}
              />
            </div>
          </div>

          <hr />
          <div className="row">
            <div className="col-md-6">
              <h2>Selecione o líder *</h2>
              <div className="viewMembers">
                <ul>
                  {(members != '') ? (members.Ativo).map(member => (
                    <Card key={member.matricula} id={member.matricula} onClick={() => setLeader(member)}>
                      <li className="member-item">
                        <header>
                          <img src={member.foto_url}/>
                          <div className="user-info">
                            <strong>{((member.nome_completo).split(' ')[0]).concat(' ' + (member.nome_completo).split(' ')[1])}</strong><br />
                            {member.hierarquia}
                          </div>
                        </header>
                      </li>
                    </Card>
                  )) : ''}
                </ul>
              </div>
              <div className="btn-card-blue">
                <div>
                  <label>Selecione acima o líder</label>
                  <img src={(leader) ? leader.foto_url : avatar} className="leader-image" alt="avatar" />
                  <h1 className="title-name" id="leader-name">{(leader) ? ((leader.nome_completo).split(' ')[0]).concat(' ' + (leader.nome_completo).split(' ')[1]) : 'Selecione'}</h1>
                  <h1 className="hierarchy"><img src={crown} className="icon" alt="icon" />Líder</h1>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h2>Selecione o assessor</h2>
              <div className="viewMembers">
                <ul>
                  {(members != '') ? (members.Ativo).map(member => (
                    <Card key={member.matricula} id={'advisor' + member.matricula} onClick={() => setAdvisor(member)}>
                      <li className="member-item">
                        <header>
                          <img src={member.foto_url}/>
                          <div className="user-info">
                            <strong>{((member.nome_completo).split(' ')[0]).concat(' ' + (member.nome_completo).split(' ')[1])}</strong><br />
                            {member.hierarquia}
                          </div>
                        </header>
                      </li>
                    </Card>
                  )) : ''}
                </ul>
              </div>
              <div className="btn-card-blue">
                <div>
                  <label>Selecione acima o assessor</label>
                  <img src={(advisor) ? advisor.foto_url : avatar} className="leader-image" alt="avatar" />
                  <h1 className="title-name" id="leader-name">{(advisor) ? ((advisor.nome_completo).split(' ')[0]).concat(' ' + (advisor.nome_completo).split(' ')[1]) : 'Selecione'}</h1>
                  <h1 className="hierarchy"><img src={crown} className="icon" alt="icon" />Assessoria</h1>
                </div>
              </div>
            </div>
          </div>

          <hr />
          <div className="row">
            <h2>
              <button
                className="btn-circle"
                onClick={e => {
                e.preventDefault();
                setCount_ID(count_id + 1);
                setViewAreas(() => [...viewAreas, newInputArea]);
              }}>+
              </button>
              Áreas do projeto *
            </h2>

          </div>
          <div className="row">
            {(viewAreas) ? viewAreas.map(area => (
              area
            )) : ''}
          </div>
          <hr />

          <div className="row center">
            <button className="btn-send" onClick={() => sendData()}>Enviar</button>
          </div>
        </Content>
      </div>
    </Screen>
  )
}
